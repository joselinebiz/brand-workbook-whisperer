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
    const { webinarEventId } = await req.json();

    console.log("Triggering post-webinar sequence for event:", webinarEventId);

    // Get webinar event details
    const { data: webinarEvent, error: webinarError } = await supabaseClient
      .from('webinar_events')
      .select('*')
      .eq('id', webinarEventId)
      .single();

    if (webinarError || !webinarEvent) {
      console.error("Webinar event not found:", webinarError);
      return new Response(
        JSON.stringify({ error: "Webinar event not found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404 }
      );
    }

    // Get all registered users for this webinar
    const { data: registrations, error: regError } = await supabaseClient
      .from('webinar_registrations')
      .select('user_id, email')
      .eq('webinar_event_id', webinarEventId);

    if (regError) {
      console.error("Error fetching registrations:", regError);
      throw regError;
    }

    if (!registrations || registrations.length === 0) {
      console.log("No registrations found for this webinar");
      return new Response(
        JSON.stringify({ message: "No registrations found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    console.log(`Found ${registrations.length} registrations`);

    const postWebinarStart = new Date(
      new Date(webinarEvent.webinar_date).getTime() + 
      webinarEvent.post_webinar_trigger_offset_minutes * 60 * 1000
    );

    const discountEndTime = new Date(
      postWebinarStart.getTime() + webinarEvent.discount_window_hours * 60 * 60 * 1000
    );

    // Post-webinar email schedule (72-hour window)
    const postWebinarSchedule = [
      {
        email_type: 'post_webinar_immediate',
        template_name: 'post-webinar-immediate',
        offset_hours: 0, // Immediate
      },
      {
        email_type: 'post_webinar_12hr',
        template_name: 'post-webinar-12hr',
        offset_hours: 12,
      },
      {
        email_type: 'post_webinar_36hr',
        template_name: 'post-webinar-36hr',
        offset_hours: 36,
      },
      {
        email_type: 'post_webinar_60hr',
        template_name: 'post-webinar-60hr',
        offset_hours: 60,
      },
      {
        email_type: 'post_webinar_71hr',
        template_name: 'post-webinar-71hr',
        offset_hours: 71,
      },
    ];

    const emailSchedules = [];

    for (const registration of registrations) {
      // Check if user bought bundle or single workbook
      const { data: purchases } = await supabaseClient
        .from('purchases')
        .select('product_type, amount')
        .eq('user_id', registration.user_id)
        .gte('purchased_at', postWebinarStart.toISOString())
        .lt('purchased_at', discountEndTime.toISOString());

      const hasBundlePurchase = purchases?.some(p => p.product_type === 'full_bundle');
      const singleWorkbookPurchase = purchases?.find(p => p.product_type.startsWith('workbook_') && p.product_type !== 'workbook_0');

      if (hasBundlePurchase) {
        // Schedule bundle buyer welcome email
        emailSchedules.push({
          user_id: registration.user_id,
          email: registration.email,
          email_type: 'bundle_buyer_welcome',
          template_name: 'bundle-buyer-welcome',
          scheduled_for: new Date(),
          webinar_event_id: webinarEventId,
          metadata: {
            discount_end: discountEndTime.toISOString(),
          }
        });
      } else if (singleWorkbookPurchase) {
        // Schedule single workbook upgrade email
        const amountPaid = singleWorkbookPurchase.amount;
        const upgradePrice = ((webinarEvent.bundle_price_cents - amountPaid) / 100).toFixed(2);
        
        emailSchedules.push({
          user_id: registration.user_id,
          email: registration.email,
          email_type: 'single_workbook_upgrade',
          template_name: 'single-workbook-upgrade',
          scheduled_for: new Date(),
          webinar_event_id: webinarEventId,
          metadata: {
            workbook_number: singleWorkbookPurchase.product_type.replace('workbook_', ''),
            amount_paid: (amountPaid / 100).toFixed(2),
            upgrade_price: upgradePrice,
            discount_end: discountEndTime.toISOString(),
          }
        });
      } else {
        // Schedule post-webinar sequence for non-buyers
        for (const schedule of postWebinarSchedule) {
          const scheduledTime = new Date(
            postWebinarStart.getTime() + schedule.offset_hours * 60 * 60 * 1000
          );

          const hoursLeft = Math.round((discountEndTime.getTime() - scheduledTime.getTime()) / (60 * 60 * 1000));

          emailSchedules.push({
            user_id: registration.user_id,
            email: registration.email,
            email_type: schedule.email_type,
            template_name: schedule.template_name,
            scheduled_for: scheduledTime,
            webinar_event_id: webinarEventId,
            metadata: {
              bundle_price: (webinarEvent.bundle_price_cents / 100).toFixed(2),
              single_price: (webinarEvent.single_workbook_price_cents / 100).toFixed(2),
              discount_end: discountEndTime.toISOString(),
              hours_left: hoursLeft,
            }
          });
        }
      }
    }

    // Check for existing schedules to avoid duplicates
    const emailTypes = emailSchedules.map(e => e.email_type);
    const userIds = [...new Set(emailSchedules.map(e => e.user_id))];

    const { data: existingSchedules } = await supabaseClient
      .from('email_schedules')
      .select('user_id, email_type')
      .eq('webinar_event_id', webinarEventId)
      .in('user_id', userIds)
      .in('email_type', emailTypes);

    const existingKeys = new Set(
      existingSchedules?.map(s => `${s.user_id}-${s.email_type}`) || []
    );

    const newSchedules = emailSchedules.filter(
      schedule => !existingKeys.has(`${schedule.user_id}-${schedule.email_type}`)
    );

    if (newSchedules.length > 0) {
      const { error: scheduleError } = await supabaseClient
        .from('email_schedules')
        .insert(newSchedules);

      if (scheduleError) {
        console.error("Error scheduling post-webinar emails:", scheduleError);
        throw scheduleError;
      }
      console.log(`Scheduled ${newSchedules.length} post-webinar emails`);
    } else {
      console.log("No new post-webinar emails to schedule");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        scheduled_count: newSchedules.length,
        registrations_processed: registrations.length 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error in trigger-post-webinar-sequence:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
