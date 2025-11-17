import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-internal-secret",
};

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
    Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? ""
  );

  try {
    // Get active webinar
    const { data: webinarEvent } = await supabaseClient
      .from('webinar_events')
      .select('*')
      .eq('is_active', true)
      .order('webinar_date', { ascending: true })
      .limit(1)
      .single();

    if (!webinarEvent) {
      return new Response("No active webinar", { status: 404 });
    }

    const start = new Date(webinarEvent.webinar_date);
    const end = new Date(start.getTime() + 90 * 60 * 1000);
    
    const formatICSDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//BLKBLD//Webinar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${webinarEvent.id}@blkbld.co
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${webinarEvent.title}
DESCRIPTION:${webinarEvent.title}\\n\\nZoom Link: ${webinarEvent.zoom_link}\\nMeeting ID: ${webinarEvent.meeting_id}\\nPasscode: ${webinarEvent.passcode}
LOCATION:${webinarEvent.zoom_link}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT15M
ACTION:DISPLAY
DESCRIPTION:Webinar starts in 15 minutes
END:VALARM
END:VEVENT
END:VCALENDAR`;

    return new Response(icsContent, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/calendar",
        "Content-Disposition": 'attachment; filename="webinar.ics"',
      },
    });
  } catch (error) {
    console.error("Error generating calendar:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
