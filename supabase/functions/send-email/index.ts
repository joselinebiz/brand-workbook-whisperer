import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Template registry - map template names to HTML generators
const templates: Record<string, (data: any) => string> = {
  "welcome-workbook-0": (data) => `
    <h1>Welcome! Your Workbook is Ready</h1>
    <p>Hi ${data.name || "there"},</p>
    <p>Thank you for downloading "Find Your White Space" - The 45 Minute Market Opportunity Sprint.</p>
    
    <p><strong>Next Steps:</strong></p>
    <ol>
      <li>Create your free account to access the workbook</li>
      <li>Complete the 45-minute sprint</li>
      <li>Discover your unique market position</li>
    </ol>
    
    <p><a href="${data.accessLink || "#"}" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">Access Your Workbook →</a></p>
    
    <p>Questions? Just reply to this email.</p>
    
    <p>Best,<br>Joseline<br>BLKBLD</p>
  `,
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, template, subject, data = {} } = await req.json();

    // Validate required fields
    if (!to || !template || !subject) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields: to, template, and subject are required" 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Validate email format
    if (!emailRegex.test(to)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Check if template exists
    const templateFn = templates[template];
    if (!templateFn) {
      return new Response(
        JSON.stringify({ 
          error: `Template '${template}' not found`,
          availableTemplates: Object.keys(templates)
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Generate email HTML from template
    const html = templateFn(data);

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: "Joseline <hello@blkbld.co>",
      to: [to],
      subject,
      html,
    });

    console.log("Email sent successfully:", {
      to,
      template,
      subject,
      emailId: emailResponse.data?.id,
    });

    return new Response(
      JSON.stringify({
        sent: true,
        emailId: emailResponse.data?.id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in send-email function:", error);
    
    // Check if it's a rate limit error
    if (error.message?.includes("rate limit")) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
