import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: userData } = await supabaseClient.auth.getUser(token);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");

    const { sessionId, productType } = await req.json();

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid" && session.metadata?.user_id === user.id) {
      // Calculate expiration date (6 months from now)
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 6);

      // Check if user has any existing purchases
      const { data: existingPurchases } = await supabaseClient
        .from('purchases')
        .select('expires_at')
        .eq('user_id', user.id)
        .gt('expires_at', new Date().toISOString())
        .order('expires_at', { ascending: false })
        .limit(1);

      // If they have an existing purchase with a later expiration, use that date instead
      // This ensures they don't lose access to earlier purchases when buying new ones
      let finalExpiresAt = expiresAt;
      if (existingPurchases && existingPurchases.length > 0) {
        const existingExpiration = new Date(existingPurchases[0].expires_at);
        if (existingExpiration > expiresAt) {
          finalExpiresAt = existingExpiration;
        }
      }

      // Store purchase in database
      const { error } = await supabaseClient
        .from('purchases')
        .upsert({
          user_id: user.id,
          product_type: productType,
          stripe_session_id: sessionId,
          stripe_payment_intent_id: session.payment_intent as string,
          amount: session.amount_total || 0,
          expires_at: finalExpiresAt.toISOString(),
        }, {
          onConflict: 'user_id,product_type'
        });

      if (error) throw error;

      // If the new expiration is later, update all existing purchases to match
      if (finalExpiresAt.getTime() === expiresAt.getTime() && existingPurchases && existingPurchases.length > 0) {
        await supabaseClient
          .from('purchases')
          .update({ expires_at: expiresAt.toISOString() })
          .eq('user_id', user.id)
          .lt('expires_at', expiresAt.toISOString());
      }

      // Send welcome email
      try {
        await supabaseClient.functions.invoke('send-welcome-email', {
          body: { 
            productType, 
            expiresAt: finalExpiresAt.toISOString(),
            email: user.email 
          }
        });
      } catch (emailError) {
        console.error("Error sending welcome email:", emailError);
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ success: false, message: "Payment not completed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
