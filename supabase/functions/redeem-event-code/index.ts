import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    // Authenticate user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ success: false, error: "Not authenticated" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !user) {
      return new Response(
        JSON.stringify({ success: false, error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse and validate input
    const { code } = await req.json();
    if (!code || typeof code !== "string" || code.trim().length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Access code is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const normalizedCode = code.trim().toUpperCase();

    // Look up the event code
    const { data: eventCode, error: codeError } = await supabaseAdmin
      .from("event_codes")
      .select("*")
      .eq("code", normalizedCode)
      .eq("is_active", true)
      .single();

    if (codeError || !eventCode) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid or expired access code" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if code has expired
    if (new Date(eventCode.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ success: false, error: "This access code has expired" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check max uses
    if (eventCode.max_uses !== null && eventCode.current_uses >= eventCode.max_uses) {
      return new Response(
        JSON.stringify({ success: false, error: "This access code has reached its maximum uses" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if user already has access to this product
    const { data: existingPurchase } = await supabaseAdmin
      .from("purchases")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_type", eventCode.product_type)
      .gt("expires_at", new Date().toISOString())
      .limit(1);

    if (existingPurchase && existingPurchase.length > 0) {
      return new Response(
        JSON.stringify({ success: true, message: "You already have access to this workbook!" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Grant access: create purchase record
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + eventCode.access_duration_days);

    const { error: purchaseError } = await supabaseAdmin
      .from("purchases")
      .insert({
        user_id: user.id,
        product_type: eventCode.product_type,
        amount: 0,
        expires_at: expiresAt.toISOString(),
        stripe_session_id: `event_code_${normalizedCode}`,
      });

    if (purchaseError) {
      console.error("Error creating purchase:", purchaseError);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to grant access" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Increment usage count
    await supabaseAdmin
      .from("event_codes")
      .update({ current_uses: eventCode.current_uses + 1 })
      .eq("id", eventCode.id);

    console.log(`Event code ${normalizedCode} redeemed by user ${user.id} for ${eventCode.product_type}`);

    return new Response(
      JSON.stringify({ success: true, message: "Access granted! Refreshing..." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error in redeem-event-code:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
