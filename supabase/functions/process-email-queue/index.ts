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
    console.log("Processing email queue...");

    const now = new Date();

    // Get pending emails that should be sent (scheduled_for <= now)
    const { data: pendingEmails, error: fetchError } = await supabaseClient
      .from('email_schedules')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_for', now.toISOString())
      .order('scheduled_for', { ascending: true })
      .limit(50); // Process up to 50 emails per run

    if (fetchError) {
      console.error("Error fetching pending emails:", fetchError);
      throw fetchError;
    }

    if (!pendingEmails || pendingEmails.length === 0) {
      console.log("No pending emails to process");
      return new Response(
        JSON.stringify({ message: "No pending emails", processed: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    console.log(`Found ${pendingEmails.length} emails to process`);

    let sentCount = 0;
    let errorCount = 0;

    for (const email of pendingEmails) {
      try {
        // Check if this email was already sent (duplicate prevention)
        const { data: existingLog } = await supabaseClient
          .from('email_logs')
          .select('id')
          .eq('user_id', email.user_id)
          .eq('email_type', email.email_type)
          .maybeSingle();

        if (existingLog) {
          console.log(`Email already sent: ${email.email_type} to ${email.email}`);
          // Mark as sent to avoid retrying
          await supabaseClient
            .from('email_schedules')
            .update({ status: 'sent', sent_at: now.toISOString() })
            .eq('id', email.id);
          continue;
        }

        // Get user's first name from profiles
        const { data: profile } = await supabaseClient
          .from('profiles')
          .select('email')
          .eq('id', email.user_id)
          .maybeSingle();

        const firstName = email.email.split('@')[0] || 'there';

        // Send the email via send-email function
        const { data: sendResult, error: sendError } = await supabaseClient.functions.invoke(
          'send-email',
          {
            body: {
              to: email.email,
              template: email.template_name,
              subject: getEmailSubject(email.email_type),
              data: {
                ...email.metadata,
                firstName,
              }
            }
          }
        );

        if (sendError) {
          throw sendError;
        }

        // Mark as sent and log it
        await supabaseClient
          .from('email_schedules')
          .update({ status: 'sent', sent_at: now.toISOString() })
          .eq('id', email.id);

        await supabaseClient
          .from('email_logs')
          .insert({
            user_id: email.user_id,
            email: email.email,
            email_type: email.email_type,
            metadata: email.metadata,
          });

        sentCount++;
        console.log(`Sent: ${email.email_type} to ${email.email}`);
      } catch (error) {
        console.error(`Error sending email ${email.id}:`, error);
        
        // Mark as error
        await supabaseClient
          .from('email_schedules')
          .update({ 
            status: 'error', 
            error_message: error instanceof Error ? error.message : 'Unknown error'
          })
          .eq('id', email.id);

        errorCount++;
      }
    }

    console.log(`Processed ${sentCount} emails successfully, ${errorCount} errors`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: sentCount + errorCount,
        sent: sentCount,
        errors: errorCount 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Error in process-email-queue:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

function getEmailSubject(emailType: string): string {
  const subjects: Record<string, string> = {
    'webinar_confirmation': "You're registered! Join us Tuesday, Nov 18th at 7 PM CST 🎉",
    'webinar_24hr_reminder': "Tomorrow: We're building a business together (live) 🚀",
    'webinar_2hr_reminder': "Starting in 2 hours ☕",
    'webinar_15min_reminder': "We're live in 15 minutes! 🎯",
    'post_webinar_immediate': "Thank you for showing up tonight 🙏",
    'post_webinar_12hr': "Ready to turn last night's insights into your system?",
    'post_webinar_36hr': "Halfway through your exclusive pricing window ⏰",
    'post_webinar_60hr': "12 hours left: Your exclusive pricing expires tonight",
    'post_webinar_71hr': "Final call: 1 hour until your pricing expires",
    'bundle_buyer_welcome': "Welcome to your complete strategic system! 🎉",
    'single_workbook_upgrade': "Complete the system? Exclusive upgrade pricing inside",
  };

  return subjects[emailType] || "Update from BLKBLD";
}
