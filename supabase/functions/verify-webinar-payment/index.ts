import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const requestSchema = z.object({
  sessionId: z.string().min(1).max(500),
});

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
    const body = await req.json();
    const { sessionId } = requestSchema.parse(body);

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Retrieve the Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return new Response(
        JSON.stringify({ success: false, error: "Payment not completed" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Get customer email from session
    const customerEmail = session.customer_details?.email || session.customer_email;
    
    if (!customerEmail) {
      throw new Error("No customer email found in session");
    }

    // Check if user exists with this email
    const { data: authUser, error: authError } = await supabaseClient.auth.admin.listUsers();
    
    if (authError) {
      console.error("Error listing users:", authError);
    }

    const existingUser = authUser?.users?.find(u => u.email === customerEmail);

    // If no user exists, they need to create an account
    if (!existingUser) {
      return new Response(
        JSON.stringify({ 
          needsAccount: true, 
          email: customerEmail,
          sessionId: sessionId
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // User exists - grant access to webinar
    const { error: webinarError } = await supabaseClient
      .from('webinar_access')
      .upsert({
        user_id: existingUser.id,
        stripe_session_id: sessionId,
        purchased_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id'
      });

    if (webinarError) {
      console.error("Error granting webinar access:", webinarError);
      throw webinarError;
    }

    // Send welcome email
    try {
      await supabaseClient.functions.invoke('send-welcome-email', {
        body: { 
          productType: 'webinar',
          email: customerEmail 
        }
      });
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError);
    }

    // Schedule webinar reminder emails
    try {
      const internalSecret = Deno.env.get('INTERNAL_FUNCTION_SECRET');
      await supabaseClient.functions.invoke('schedule-webinar-emails', {
        body: { 
          userId: existingUser.id,
          email: customerEmail,
          productType: 'workbook_0' // Webinar purchase acts like workbook_0
        },
        headers: {
          'X-Internal-Secret': internalSecret || ''
        }
      });
      console.log("Webinar reminder emails scheduled for user:", existingUser.id);
    } catch (webinarEmailError) {
      console.error("Error scheduling webinar emails:", webinarEmailError);
      // Don't fail the verification if email scheduling fails
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        verified: true 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error verifying webinar payment:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
