import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
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
    // Get all users with purchases
    const { data: purchases, error: purchasesError } = await supabaseClient
      .from('purchases')
      .select('user_id, product_type, expires_at')
      .order('purchased_at', { ascending: false });

    if (purchasesError) throw purchasesError;

    // Get unique users
    const uniqueUsers = new Map();
    for (const purchase of purchases || []) {
      if (!uniqueUsers.has(purchase.user_id)) {
        uniqueUsers.set(purchase.user_id, purchase);
      }
    }

    // Get user emails
    const results = [];
    for (const [userId, purchase] of uniqueUsers) {
      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('email')
        .eq('id', userId)
        .single();

      if (profile?.email) {
        try {
          await supabaseClient.functions.invoke('send-welcome-email', {
            body: {
              productType: purchase.product_type,
              expiresAt: purchase.expires_at,
              email: profile.email
            }
          });
          results.push({ email: profile.email, status: 'sent' });
        } catch (emailError) {
          const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown error';
          console.error(`Failed to send email to ${profile.email}:`, emailError);
          results.push({ email: profile.email, status: 'failed', error: errorMessage });
        }
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      totalSent: results.filter(r => r.status === 'sent').length,
      totalFailed: results.filter(r => r.status === 'failed').length,
      results 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending bulk emails:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
