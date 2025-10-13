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
    // Calculate 2 days from now
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
    twoDaysFromNow.setHours(0, 0, 0, 0);
    const threeDaysFromNow = new Date(twoDaysFromNow);
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 1);

    // Fetch purchases expiring in 2 days
    const { data: purchases, error: fetchError } = await supabaseClient
      .from('purchases')
      .select('*, profiles(email)')
      .gte('expires_at', twoDaysFromNow.toISOString())
      .lt('expires_at', threeDaysFromNow.toISOString());

    if (fetchError) throw fetchError;

    console.log(`Found ${purchases?.length || 0} purchases with 2 days left`);

    const emailPromises = (purchases || []).map(async (purchase) => {
      const email = purchase.profiles?.email;
      if (!email) return null;

      const expirationDate = new Date(purchase.expires_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const productName = purchase.product_type === 'full_bundle' ? 'Brand Blueprint Bundle' : 'Brand Blueprint Workbook';

      return resend.emails.send({
        from: "Joseline, MBA <onboarding@resend.dev>",
        to: [email],
        subject: "48 hours left—your move 🚨",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>2 Days Left</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif; background-color: #000000; color: #ffffff;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 40px 20px;">
                    <table role="presentation" style="max-width: 600px; width: 100%; background-color: #111111; border-radius: 8px; overflow: hidden;">
                      <tr>
                        <td style="padding: 40px 40px 20px;">
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">Hey there,</p>
                          <p style="margin: 0 0 20px; font-size: 24px; font-weight: bold; color: #ffffff;">
                            2 days left.
                          </p>
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            Your access to <strong style="color: #ffffff;">${productName}</strong> expires on <strong style="color: #ffffff;">${expirationDate}</strong>.
                          </p>
                          
                          <p style="margin: 20px 0 10px; font-size: 16px; font-weight: bold; color: #ffffff;">If you've been working through this:</p>
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            Finish your current section, download anything you want to reference later, and celebrate what you've built.
                          </p>
                          
                          <p style="margin: 20px 0 10px; font-size: 16px; font-weight: bold; color: #ffffff;">If you're not done yet:</p>
                          <p style="margin: 0 0 15px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            That's okay. Here are your options:
                          </p>
                          
                          <div style="background-color: #1a1a1a; border-left: 4px solid #ffffff; padding: 20px; margin: 20px 0; border-radius: 4px;">
                            <p style="margin: 0 0 10px; font-size: 16px; font-weight: bold; color: #ffffff;">Option 1: Finish what you can</p>
                            <ul style="margin: 10px 0 0 20px; padding: 0; font-size: 14px; line-height: 1.8; color: #cccccc;">
                              <li>Download key materials</li>
                              <li>Complete at least one section</li>
                              <li>Implement one framework this week</li>
                            </ul>
                          </div>
                          
                          <table role="presentation" style="width: 100%; margin: 20px 0;">
                            <tr>
                              <td align="center">
                                <a href="https://workbooks.blkbld.co" style="display: inline-block; padding: 16px 40px; background-color: #ffffff; color: #000000; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">
                                  Access Now →
                                </a>
                              </td>
                            </tr>
                          </table>
                          
                          <div style="background-color: #1a1a1a; border-left: 4px solid #ffffff; padding: 20px; margin: 20px 0; border-radius: 4px;">
                            <p style="margin: 0 0 10px; font-size: 16px; font-weight: bold; color: #ffffff;">Option 2: Extend your access</p>
                            <p style="margin: 0 0 15px; font-size: 14px; line-height: 1.6; color: #cccccc;">
                              Need more time? Grab 6 extra months for 50% off with code <strong style="color: #ffffff;">KEEPBUILDING</strong>.
                            </p>
                            <p style="margin: 0; text-align: center;">
                              <a href="https://workbooks.blkbld.co" style="color: #ffffff; text-decoration: underline; font-size: 14px;">Extend Access (50% Off) →</a>
                            </p>
                          </div>
                          
                          <p style="margin: 20px 0; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            You invested in this for a reason. Ensure you receive what you paid for.
                          </p>
                          
                          <p style="margin: 20px 0; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            Have you implemented something already? I'd love to see it. Tag <a href="https://instagram.com/JoselineBiz" style="color: #ffffff; text-decoration: underline;">@JoselineBiz</a>.
                          </p>
                          
                          <p style="margin: 20px 0 0; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            Let's build,<br>
                            <strong style="color: #ffffff;">Joseline, MBA</strong>
                          </p>
                          
                          <p style="margin: 20px 0 0; font-size: 14px; line-height: 1.6; color: #999999;">
                            <strong>P.S.</strong> If you haven't started, open your materials and set a 15-minute timer. Start is the hardest part. Momentum beats perfection.
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

    console.log(`Sent ${successful} 2-days-left emails, ${failed} failed`);

    return new Response(JSON.stringify({ 
      success: true, 
      sent: successful,
      failed: failed 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending 2-days-left emails:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
