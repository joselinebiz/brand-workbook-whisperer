import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Verify cron secret for additional security
  const cronSecret = req.headers.get('X-Cron-Secret');
  const expectedSecret = Deno.env.get('CRON_SECRET');
  
  if (expectedSecret && cronSecret !== expectedSecret) {
    console.error('Unauthorized: Invalid cron secret');
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }), 
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
  );

  try {
    // Calculate 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const twentyNineDaysAgo = new Date();
    twentyNineDaysAgo.setDate(twentyNineDaysAgo.getDate() - 29);

    // Fetch purchases that were made 30 days ago
    const { data: purchases, error: fetchError } = await supabaseClient
      .from('purchases')
      .select('*, profiles(email)')
      .gte('purchased_at', thirtyDaysAgo.toISOString())
      .lt('purchased_at', twentyNineDaysAgo.toISOString())
      .gt('expires_at', new Date().toISOString()); // Still active

    if (fetchError) throw fetchError;

    console.log(`Found ${purchases?.length || 0} purchases at 30-day mark`);

    const emailPromises = (purchases || []).map(async (purchase) => {
      const email = purchase.profiles?.email;
      if (!email) return null;

      const productName = purchase.product_type === 'full_bundle' ? 'Brand Blueprint Bundle' : 'Brand Blueprint Workbook';

      return resend.emails.send({
        from: "Joseline, MBA <onboarding@resend.dev>",
        to: [email],
        subject: "One month in—how's it going? ✨",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>30-Day Check-In</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif; background-color: #000000; color: #ffffff;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 40px 20px;">
                    <table role="presentation" style="max-width: 600px; width: 100%; background-color: #111111; border-radius: 8px; overflow: hidden;">
                      <tr>
                        <td style="padding: 40px 40px 20px;">
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">Hey there,</p>
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            You're 1 month into your <strong style="color: #ffffff;">${productName}</strong>.
                          </p>
                          
                          <p style="margin: 20px 0 10px; font-size: 16px; font-weight: bold; color: #ffffff;">If you've started:</p>
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            Keep going. You're building something real. Block time this week to finish your current section—momentum compounds.
                          </p>
                          
                          <p style="margin: 20px 0 10px; font-size: 16px; font-weight: bold; color: #ffffff;">If you haven't started yet:</p>
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            No shame, just opportunity. Log in today. Even 10 minutes breaks the seal.
                          </p>
                          
                          <table role="presentation" style="width: 100%; margin: 30px 0;">
                            <tr>
                              <td align="center">
                                <a href="https://workbooks.blkbld.co" style="display: inline-block; padding: 16px 40px; background-color: #ffffff; color: #000000; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">
                                  Access Your Materials →
                                </a>
                              </td>
                            </tr>
                          </table>
                          
                          <p style="margin: 20px 0; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            Making progress? I'd love to see it! Tag me <a href="https://instagram.com/JoselineBiz" style="color: #ffffff; text-decoration: underline;">@JoselineBiz</a> with your wins, templates, or aha moments.
                          </p>
                          
                          <p style="margin: 20px 0; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            You've got 5 months left. Let's make them count.
                          </p>
                          
                          <p style="margin: 20px 0 0; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            Let's build,<br>
                            <strong style="color: #ffffff;">Joseline, MBA</strong>
                          </p>
                        </td>
                      </tr>
                      
                      <tr>
                        <td style="padding: 20px 40px 40px; text-align: center; border-top: 1px solid #222222;">
                          <p style="margin: 0; font-size: 12px; color: #666666;">
                            © ${new Date().getFullYear()} BLK BLD. All rights reserved.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      });
    });

    const results = await Promise.allSettled(emailPromises);
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    console.log(`Sent ${successful} 30-day check-in emails, ${failed} failed`);

    return new Response(JSON.stringify({ 
      success: true, 
      sent: successful,
      failed: failed 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending 30-day check-in emails:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
