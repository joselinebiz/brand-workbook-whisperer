import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-internal-secret",
};

const requestSchema = z.object({
  userId: z.string().uuid(),
  email: z.string().email().max(255),
  productType: z.enum(['webinar', 'workbook_0', 'workbook_1', 'workbook_2', 'workbook_3', 'workbook_4', 'bundle']),
});

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Verify internal secret for authentication
  const authSecret = Deno.env.get('INTERNAL_FUNCTION_SECRET');
  const providedSecret = req.headers.get('X-Internal-Secret');
  
  if (!authSecret || providedSecret !== authSecret) {
    return new Response(
      JSON.stringify({ error: "Unauthorized" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401 
      }
    );
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const body = await req.json();
    const { userId, email, productType } = requestSchema.parse(body);

    console.log("Scheduling webinar emails for:", { userId, email, productType });

    // Only schedule webinar emails for Workbook 0 purchases
    if (productType !== 'workbook_0') {
      console.log("Not a Workbook 0 purchase, skipping webinar email scheduling");
      return new Response(
        JSON.stringify({ message: "Only Workbook 0 triggers webinar emails" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    // Get the active webinar event
    const { data: webinarEvent, error: webinarError } = await supabaseClient
      .from('webinar_events')
      .select('*')
      .eq('is_active', true)
      .order('webinar_date', { ascending: true })
      .limit(1)
      .single();

    if (webinarError || !webinarEvent) {
      console.error("No active webinar found:", webinarError);
      return new Response(
        JSON.stringify({ error: "No active webinar found" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 404 }
      );
    }

    console.log("Active webinar found:", webinarEvent);

    // Check if already registered
    const { data: existingRegistration } = await supabaseClient
      .from('webinar_registrations')
      .select('id')
      .eq('user_id', userId)
      .eq('webinar_event_id', webinarEvent.id)
      .maybeSingle();

    // Register user for webinar if not already registered
    if (!existingRegistration) {
      const { error: regError } = await supabaseClient
        .from('webinar_registrations')
        .insert({
          user_id: userId,
          email: email,
          webinar_event_id: webinarEvent.id,
        });

      if (regError) {
        console.error("Error registering user:", regError);
        throw regError;
      }
      console.log("User registered for webinar");
    } else {
      console.log("User already registered for webinar");
    }

    const webinarDate = new Date(webinarEvent.webinar_date);
    const now = new Date();

    // Calculate email schedule times
    const emailSchedules = [
      {
        email_type: 'webinar_confirmation',
        template_name: 'webinar-confirmation',
        scheduled_for: now, // Immediate
        metadata: {
          webinar_title: webinarEvent.title,
          webinar_date: webinarEvent.webinar_date,
          zoom_link: webinarEvent.zoom_link,
          meeting_id: webinarEvent.meeting_id,
          passcode: webinarEvent.passcode,
          bundle_price: (webinarEvent.bundle_price_cents / 100).toFixed(2),
          single_price: (webinarEvent.single_workbook_price_cents / 100).toFixed(2),
        }
      },
      {
        email_type: 'webinar_24hr_reminder',
        template_name: 'webinar-24hr-reminder',
        scheduled_for: new Date(webinarDate.getTime() - 24 * 60 * 60 * 1000),
        metadata: {
          webinar_title: webinarEvent.title,
          webinar_date: webinarEvent.webinar_date,
          zoom_link: webinarEvent.zoom_link,
          meeting_id: webinarEvent.meeting_id,
          passcode: webinarEvent.passcode,
          bundle_price: (webinarEvent.bundle_price_cents / 100).toFixed(2),
          single_price: (webinarEvent.single_workbook_price_cents / 100).toFixed(2),
        }
      },
      {
        email_type: 'webinar_2hr_reminder',
        template_name: 'webinar-2hr-reminder',
        scheduled_for: new Date(webinarDate.getTime() - 2 * 60 * 60 * 1000),
        metadata: {
          webinar_date: webinarEvent.webinar_date,
          zoom_link: webinarEvent.zoom_link,
          meeting_id: webinarEvent.meeting_id,
          passcode: webinarEvent.passcode,
        }
      },
      {
        email_type: 'webinar_15min_reminder',
        template_name: 'webinar-15min-reminder',
        scheduled_for: new Date(webinarDate.getTime() - 15 * 60 * 1000),
        metadata: {
          zoom_link: webinarEvent.zoom_link,
          meeting_id: webinarEvent.meeting_id,
          passcode: webinarEvent.passcode,
        }
      }
    ];

    // Filter out emails that are scheduled in the past (except immediate)
    const validSchedules = emailSchedules.filter(schedule => 
      schedule.email_type === 'webinar_confirmation' || schedule.scheduled_for > now
    );

    // Check for existing scheduled emails to avoid duplicates
    const { data: existingSchedules } = await supabaseClient
      .from('email_schedules')
      .select('email_type')
      .eq('user_id', userId)
      .eq('webinar_event_id', webinarEvent.id)
      .in('email_type', validSchedules.map(s => s.email_type));

    const existingTypes = new Set(existingSchedules?.map(s => s.email_type) || []);
    
    // Only schedule emails that don't already exist
    const newSchedules = validSchedules
      .filter(schedule => !existingTypes.has(schedule.email_type))
      .map(schedule => ({
        user_id: userId,
        email: email,
        webinar_event_id: webinarEvent.id,
        ...schedule,
      }));

    if (newSchedules.length > 0) {
      const { error: scheduleError } = await supabaseClient
        .from('email_schedules')
        .insert(newSchedules);

      if (scheduleError) {
        console.error("Error scheduling emails:", scheduleError);
        throw scheduleError;
      }
      console.log(`Scheduled ${newSchedules.length} emails`);
    } else {
      console.log("No new emails to schedule (all already exist)");
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        scheduled_count: newSchedules.length,
        webinar_event_id: webinarEvent.id 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error in schedule-webinar-emails:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
