import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";
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

      const daysLeft = Math.ceil((new Date(purchase.expires_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

      return resend.emails.send({
        from: "BLK BLD <noreply@blkbld.co>",
        to: [email],
        subject: `Your Access Expires in ${daysLeft} Days ⏰`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Access Expiration Reminder</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif; background-color: #000000; color: #ffffff;">
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td align="center" style="padding: 40px 20px;">
                    <table role="presentation" style="max-width: 600px; width: 100%; background-color: #111111; border-radius: 8px; overflow: hidden;">
                      <!-- Header -->
                      <tr>
                        <td style="padding: 40px 40px 20px; text-align: center;">
                          <h1 style="margin: 0; font-size: 32px; font-weight: bold; color: #ffffff;">Access Expiring Soon ⏰</h1>
                        </td>
                      </tr>
                      
                      <!-- Main Content -->
                      <tr>
                        <td style="padding: 20px 40px;">
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            This is a friendly reminder that your access to <strong style="color: #ffffff;">${purchase.product_type === 'full_bundle' ? 'the Full Brand Blueprint Bundle' : 'your Brand Blueprint Workbook'}</strong> will expire soon.
                          </p>
                          
                          <div style="background-color: #1a1a1a; border-left: 4px solid #ff6b6b; padding: 20px; margin: 20px 0; border-radius: 4px;">
                            <p style="margin: 0 0 10px; font-size: 14px; color: #999999;">Expiration Details:</p>
                            <p style="margin: 0; font-size: 16px; color: #ffffff;">
                              <strong>Days Remaining:</strong> ${daysLeft} days<br>
                              <strong>Expires On:</strong> ${expirationDate}
                            </p>
                          </div>
                          
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            Make the most of your remaining time! Log in now to complete your brand blueprint and download any resources you need.
                          </p>
                          
                          <!-- CTA Button -->
                          <table role="presentation" style="width: 100%; margin: 30px 0;">
                            <tr>
                              <td align="center">
                                <a href="https://blkbld.co" style="display: inline-block; padding: 16px 40px; background-color: #ffffff; color: #000000; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">
                                  Access Your Blueprint
                                </a>
                              </td>
                            </tr>
                          </table>
                          
                          <p style="margin: 20px 0 0; font-size: 14px; line-height: 1.6; color: #999999;">
                            Want to extend your access? Contact us and we'll be happy to help.
                          </p>
                        </td>
                      </tr>
                      
                      <!-- Footer -->
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
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
