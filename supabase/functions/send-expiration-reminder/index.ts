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
    // Calculate date 7 days from now
    const reminderDate = new Date();
    reminderDate.setDate(reminderDate.getDate() + 7);

    // Fetch purchases expiring in 7 days
    const { data: expiringPurchases, error: fetchError } = await supabaseClient
      .from('purchases')
      .select('*, profiles(email)')
      .gte('expires_at', new Date().toISOString())
      .lte('expires_at', reminderDate.toISOString());

    if (fetchError) throw fetchError;

    console.log(`Found ${expiringPurchases?.length || 0} purchases expiring soon`);

    const emailPromises = (expiringPurchases || []).map(async (purchase) => {
      const email = purchase.profiles?.email;
      if (!email) return null;

      const expirationDate = new Date(purchase.expires_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const productName = purchase.product_type === 'full_bundle' ? 'Brand Blueprint Bundle' : 'Brand Blueprint Workbook';

      await resend.emails.send({
        from: "Joseline, MBA <noreply@blkbld.co>",
        to: [purchase.profiles.email],
        subject: "7 days left—finish strong 🎯",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>7 Days Left</title>
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
                            Your access to <strong style="color: #ffffff;">${productName}</strong> expires in <strong style="color: #ffffff;">7 days</strong> (${expirationDate}).
                          </p>
                          
                          <p style="margin: 20px 0 10px; font-size: 16px; font-weight: bold; color: #ffffff;">If you've been working through the materials:</p>
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            You're in the home stretch. Block a few hours this week to complete what you started. The clarity on the other side is worth it. Make sure to download what you've created.
                          </p>
                          
                          <p style="margin: 20px 0 10px; font-size: 16px; font-weight: bold; color: #ffffff;">If you paused midway:</p>
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            Pick it back up. Even finishing one more section this week moves your business forward.
                          </p>
                          
                          <p style="margin: 20px 0 10px; font-size: 16px; font-weight: bold; color: #ffffff;">If you haven't started yet:</p>
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            You've still got time to extract value. Open your materials today and tackle the section that solves your biggest pain point right now.
                          </p>
                          
                          <table role="presentation" style="width: 100%; margin: 30px 0;">
                            <tr>
                              <td align="center">
                                <a href="https://blkbld.co" style="display: inline-block; padding: 16px 40px; background-color: #ffffff; color: #000000; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">
                                  Access Your Materials →
                                </a>
                              </td>
                            </tr>
                          </table>
                          
                          <div style="background-color: #1a1a1a; border-left: 4px solid #ffffff; padding: 20px; margin: 20px 0; border-radius: 4px;">
                            <p style="margin: 0 0 10px; font-size: 16px; font-weight: bold; color: #ffffff;">Need more time?</p>
                            <p style="margin: 0 0 15px; font-size: 14px; line-height: 1.6; color: #cccccc;">
                              Life happens. Business gets busy. If you need another 6 months, grab it at 50% off with code <strong style="color: #ffffff;">KEEPBUILDING</strong>.
                            </p>
                            <p style="margin: 0; text-align: center;">
                              <a href="https://blkbld.co" style="color: #ffffff; text-decoration: underline; font-size: 14px;">Extend Access (50% Off) →</a>
                            </p>
                          </div>
                          
                          <p style="margin: 20px 0; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            Already seeing wins? Share them! Tag me <a href="https://instagram.com/JoselineBiz" style="color: #ffffff; text-decoration: underline;">@JoselineBiz</a>. I celebrate every founder who goes from scattered to strategic.
                          </p>
                          
                          <p style="margin: 20px 0 0; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            Let's build,<br>
                            <strong style="color: #ffffff;">Joseline, MBA</strong>
                          </p>
                          
                          <p style="margin: 20px 0 0; font-size: 14px; line-height: 1.6; color: #999999;">
                            <strong>P.S.</strong> Don't let a deadline steal your progress. Finish what you started or extend your access—either way, keep building.
                          </p>
                          
                          <p style="margin: 10px 0 0; font-size: 14px; line-height: 1.6; color: #999999;">
                            <strong>P.S.S.</strong> Don't forget to download what you have already built and save it. When you work with designers, web developers, AI, etc., use your downloads as your foundation to build a solid business.
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

    console.log(`Sent ${successful} reminder emails, ${failed} failed`);

    return new Response(JSON.stringify({ 
      success: true, 
      sent: successful,
      failed: failed 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending expiration reminders:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
