import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const requestSchema = z.object({
  email: z.string().email().max(255),
  source: z.string().max(100).default("landing_page"),
  metadata: z.record(z.any()).optional().default({}),
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { email, source, metadata } = requestSchema.parse(body);

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if lead already exists
    const { data: existingLead } = await supabase
      .from("leads")
      .select("id, email")
      .eq("email", email)
      .maybeSingle();

    const isNew = !existingLead;

    // Upsert lead into database
    const { data: leadData, error: dbError } = await supabase
      .from("leads")
      .upsert(
        {
          email,
          source,
          metadata,
        },
        {
          onConflict: "email",
        }
      )
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save lead" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Send welcome email if this is a new lead
    if (isNew) {
      try {
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
            
            <p><a href="${req.headers.get("origin") || "https://yourapp.com"}/auth" style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">Access Your Workbook →</a></p>
            
            <p>Questions? Just reply to this email.</p>
            
            <p>Best,<br>The BLKBLD Team</p>
          `,
        });

        console.log("Welcome email sent successfully:", emailResponse);
      } catch (emailError) {
        console.error("Email error (non-blocking):", emailError);
        // Don't fail the request if email fails
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        leadId: leadData.id,
        isNew,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("Error in capture-lead function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
