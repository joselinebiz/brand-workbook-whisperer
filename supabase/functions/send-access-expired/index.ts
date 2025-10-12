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
    // Fetch purchases that expired in the last 24 hours
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const { data: expiredPurchases, error: fetchError } = await supabaseClient
      .from('purchases')
      .select('*, profiles(email)')
      .lt('expires_at', new Date().toISOString())
      .gte('expires_at', yesterday.toISOString());

    if (fetchError) throw fetchError;

    console.log(`Found ${expiredPurchases?.length || 0} recently expired purchases`);

    const emailPromises = (expiredPurchases || []).map(async (purchase) => {
      const email = purchase.profiles?.email;
      if (!email) return null;

      const expirationDate = new Date(purchase.expires_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const productName = purchase.product_type === 'full_bundle' ? 'Brand Blueprint Bundle' : 'Brand Blueprint Workbook';

      return resend.emails.send({
        from: "Joseline, MBA <noreply@blkbld.co>",
        to: [email],
        subject: "Your access expired—what's next? 🔄",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Access Expired</title>
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
                            Your access to <strong style="color: #ffffff;">${productName}</strong> expired on <strong style="color: #ffffff;">${expirationDate}</strong>.
                          </p>
                          
                          <p style="margin: 20px 0 10px; font-size: 16px; font-weight: bold; color: #ffffff;">If you finished:</p>
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            Congratulations! You built your foundation! Now go implement and scale. If you saw results, I'd love to hear about them—reply or tag me <a href="https://instagram.com/JoselineBiz" style="color: #ffffff; text-decoration: underline;">@JoselineBiz</a>.
                          </p>
                          
                          <p style="margin: 20px 0 10px; font-size: 16px; font-weight: bold; color: #ffffff;">If you're not done yet:</p>
                          <p style="margin: 0 0 15px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            No guilt. Here's what you can do:
                          </p>
                          
                          <div style="background-color: #1a1a1a; border-left: 4px solid #ffffff; padding: 20px; margin: 20px 0; border-radius: 4px;">
                            <p style="margin: 0 0 10px; font-size: 16px; font-weight: bold; color: #ffffff;">Option 1: Renew your access</p>
                            <p style="margin: 0 0 15px; font-size: 14px; line-height: 1.6; color: #cccccc;">
                              Get another 6 months to finish what you started—50% off with code <strong style="color: #ffffff;">COMEBACK</strong>.
                            </p>
                            <p style="margin: 0 0 20px; text-align: center;">
                              <a href="https://blkbld.co" style="color: #ffffff; text-decoration: underline; font-size: 14px;">Renew Access (50% Off) →</a>
                            </p>
                            
                            <p style="margin: 20px 0 10px; font-size: 16px; font-weight: bold; color: #ffffff;">Option 2: Take what you learned and run with it</p>
                            <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #cccccc;">
                              If now's not the right time to finish, that's okay. Use what you did complete and keep building.
                            </p>
                          </div>
                          
                          <p style="margin: 20px 0; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            Honestly, I created these materials because I've seen too many brilliant founders stuck in scattered marketing and inconsistent branding. The system works—but only if you work it.
                          </p>
                          
                          <p style="margin: 20px 0; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            Whether you finished, renewed, or moved on—I'm rooting for you.
                          </p>
                          
                          <p style="margin: 20px 0 0; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            Let's build,<br>
                            <strong style="color: #ffffff;">Joseline, MBA</strong>
                          </p>
                          
                          <p style="margin: 20px 0 0; font-size: 14px; line-height: 1.6; color: #999999;">
                            <strong>P.S.</strong> If you completed the workbooks and saw results, share your story! Reply to this email or tag <a href="https://instagram.com/JoselineBiz" style="color: #ffffff; text-decoration: underline;">@JoselineBiz</a> on Instagram. I love celebrating wins!
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

    console.log(`Sent ${successful} expiration emails, ${failed} failed`);

    return new Response(JSON.stringify({ 
      success: true, 
      sent: successful,
      failed: failed 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending access expired emails:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
