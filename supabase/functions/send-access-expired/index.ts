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

      return resend.emails.send({
        from: "BLK BLD <noreply@blkbld.co>",
        to: [email],
        subject: "Your Access Has Expired 📅",
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
                      <!-- Header -->
                      <tr>
                        <td style="padding: 40px 40px 20px; text-align: center;">
                          <h1 style="margin: 0; font-size: 32px; font-weight: bold; color: #ffffff;">Access Has Expired 📅</h1>
                        </td>
                      </tr>
                      
                      <!-- Main Content -->
                      <tr>
                        <td style="padding: 20px 40px;">
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            Your access to <strong style="color: #ffffff;">${purchase.product_type === 'full_bundle' ? 'the Full Brand Blueprint Bundle' : 'your Brand Blueprint Workbook'}</strong> has expired.
                          </p>
                          
                          <div style="background-color: #1a1a1a; border-left: 4px solid #888888; padding: 20px; margin: 20px 0; border-radius: 4px;">
                            <p style="margin: 0 0 10px; font-size: 14px; color: #999999;">Access Details:</p>
                            <p style="margin: 0; font-size: 16px; color: #ffffff;">
                              <strong>Expired On:</strong> ${expirationDate}
                            </p>
                          </div>
                          
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            Thank you for using BLK BLD to build your brand. We hope the tools and frameworks we provided helped you create something amazing.
                          </p>
                          
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                            Want to continue your brand journey? Renew your access or explore our other offerings.
                          </p>
                          
                          <!-- CTA Button -->
                          <table role="presentation" style="width: 100%; margin: 30px 0;">
                            <tr>
                              <td align="center">
                                <a href="https://blkbld.co" style="display: inline-block; padding: 16px 40px; background-color: #ffffff; color: #000000; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">
                                  Renew Your Access
                                </a>
                              </td>
                            </tr>
                          </table>
                          
                          <p style="margin: 20px 0 0; font-size: 14px; line-height: 1.6; color: #999999;">
                            Questions? Reply to this email and we'll be happy to assist you.
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
