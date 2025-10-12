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
    { auth: { persistSession: false } }
  );

  try {
    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: userData } = await supabaseClient.auth.getUser(token);
    const user = userData.user;
    if (!user) throw new Error("User not authenticated");

    const { productType, expiresAt } = await req.json();

    const expirationDate = new Date(expiresAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const emailResponse = await resend.emails.send({
      from: "BLK BLD <noreply@blkbld.co>",
      to: [user.email!],
      subject: "Welcome to Your Brand Blueprint Journey! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to BLK BLD</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif; background-color: #000000; color: #ffffff;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table role="presentation" style="max-width: 600px; width: 100%; background-color: #111111; border-radius: 8px; overflow: hidden;">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 20px; text-align: center;">
                        <h1 style="margin: 0; font-size: 32px; font-weight: bold; color: #ffffff;">Welcome to BLK BLD! 🎉</h1>
                      </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                      <td style="padding: 20px 40px;">
                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                          Thank you for purchasing <strong style="color: #ffffff;">${productType === 'full_bundle' ? 'the Full Brand Blueprint Bundle' : 'a Brand Blueprint Workbook'}</strong>!
                        </p>
                        
                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                          You now have access to powerful tools and frameworks designed to help you build, refine, and elevate your brand.
                        </p>
                        
                        <div style="background-color: #1a1a1a; border-left: 4px solid #ffffff; padding: 20px; margin: 20px 0; border-radius: 4px;">
                          <p style="margin: 0 0 10px; font-size: 14px; color: #999999;">Your Access Details:</p>
                          <p style="margin: 0; font-size: 16px; color: #ffffff;">
                            <strong>Product:</strong> ${productType === 'full_bundle' ? 'Full Brand Blueprint Bundle' : 'Brand Blueprint Workbook'}<br>
                            <strong>Access Expires:</strong> ${expirationDate}
                          </p>
                        </div>
                        
                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                          Ready to get started? Log in to your account and begin building your brand blueprint today.
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
                          Need help? Reply to this email and we'll be happy to assist you.
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

    console.log("Welcome email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
