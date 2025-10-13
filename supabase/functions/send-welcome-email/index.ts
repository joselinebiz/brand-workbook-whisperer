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
    const { productType, expiresAt, email } = await req.json();
    
    if (!email) throw new Error("Email is required");

    const expirationDate = new Date(expiresAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const productName = productType === 'full_bundle' ? 'Brand Blueprint Bundle' : 'Brand Blueprint Workbook';

    const emailResponse = await resend.emails.send({
      from: "Joseline, MBA <noreply@blkbld.co>",
      to: [email],
      subject: `Your ${productName} is ready. Let's build. 🚀`,
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
                      <td style="padding: 40px 40px 20px;">
                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                          Hey there,
                        </p>
                        <h1 style="margin: 0 0 20px; font-size: 28px; font-weight: bold; color: #ffffff;">Welcome to Your Brand Blueprint Journey!</h1>
                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                          Your <strong style="color: #ffffff;">${productName}</strong> is ready.
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                      <td style="padding: 0 40px 20px;">
                        <p style="margin: 0 0 15px; font-size: 16px; font-weight: bold; color: #ffffff;">
                          Here's what happens next:
                        </p>
                        <ul style="margin: 0 0 20px; padding-left: 20px; font-size: 16px; line-height: 1.8; color: #cccccc;">
                          <li>You have 6 months of access (expires <strong style="color: #ffffff;">${expirationDate}</strong>)</li>
                          <li>Start wherever you are—whether validating your idea or scaling what works</li>
                          <li>Work at your pace—15 minutes or 2 hours, you decide</li>
                        </ul>
                        
                        <!-- CTA Button -->
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
                          <p style="margin: 0 0 10px; font-size: 16px; font-weight: bold; color: #ffffff;">Why 6 months?</p>
                          <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #cccccc;">
                            Because transformation takes time, but deadlines create focus. This gives you runway to work through the materials at your own pace while keeping momentum.
                          </p>
                        </div>
                        
                        <p style="margin: 20px 0 10px; font-size: 16px; font-weight: bold; color: #ffffff;">
                          Your first move:
                        </p>
                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #cccccc;">
                          Log in, open your materials, set a timer for 15 minutes and start. If you can spend more time, that's amazing.
                        </p>
                        <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; font-style: italic; color: #ffffff;">
                          Progress beats perfection.
                        </p>
                        
                        <p style="margin: 20px 0; font-size: 16px; line-height: 1.6; color: #cccccc;">
                          Already making moves? Tag me on Instagram <a href="https://instagram.com/JoselineBiz" style="color: #ffffff; text-decoration: underline;">@JoselineBiz</a> with your progress. I share wins, breakthroughs, and aha moments in my stories.
                        </p>
                        
                        <p style="margin: 20px 0 0; font-size: 16px; line-height: 1.6; color: #cccccc;">
                          Let's build,<br>
                          <strong style="color: #ffffff;">Joseline, MBA</strong><br>
                          Founder, BlkBld & Co.
                        </p>
                        
                        <p style="margin: 20px 0 0; font-size: 14px; line-height: 1.6; color: #999999;">
                          <strong>P.S.</strong> Save workbooks.blkbld.co to your bookmarks. You'll be coming back here over the next 6 months.
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
