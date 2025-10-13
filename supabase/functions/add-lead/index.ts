import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();

    if (!email) {
      throw new Error("Email is required");
    }

    console.log("Adding lead to Resend:", email);

    // Add contact to Resend audience
    // You'll need to create an audience in Resend first
    // For now, we'll just send a welcome email
    const emailResponse = await resend.emails.send({
      from: "BLKBLD Workbooks <onboarding@resend.dev>",
      to: [email],
      subject: "Your Free Workbook: Find Your White Space",
      html: `
        <h1>Welcome! Your Workbook is Ready</h1>
        <p>Thank you for downloading "Find Your White Space" - The 45 Minute Market Opportunity Sprint.</p>
        
        <p><strong>Next Steps:</strong></p>
        <ol>
          <li>Create your free account to access the workbook</li>
          <li>Complete the 45-minute sprint</li>
          <li>Discover your unique market position</li>
        </ol>
        
        <p><a href="${req.headers.get("origin")}/auth" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">Access Your Workbook →</a></p>
        
        <p>Questions? Just reply to this email.</p>
        
        <p>Best,<br>The BLKBLD Team</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in add-lead function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
