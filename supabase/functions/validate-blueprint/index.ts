import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { blueprintData, validationType } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const validationPrompts: Record<string, string> = {
      alignment: `You are a senior brand strategist and marketing consultant. Audit this complete brand and marketing foundation for strategic alignment and market viability.

${blueprintData}

AUDIT FROM THESE PERSPECTIVES:
- TARGET CUSTOMER: Does everything connect to solve their real problem?
- COMPETITIVE POSITION: Is differentiation clear and defensible?
- BUSINESS MODEL: Do all pieces support profitable growth?
- IMPLEMENTATION: Can this actually be executed by a solo founder/small team?

PROVIDE:
- ALIGNMENT SCORE (1-10) + What's misaligned
- BIGGEST RISK – What could fail + How to mitigate
- MISSING ELEMENT – What's not addressed + Why it matters
- STRENGTH TO LEVERAGE – Best advantage + How to amplify
- 3 QUICK FIXES – Immediate improvements + Expected impact
- GO/NO GO – Ready to launch? + What to fix first

Cite your sources for each claim in your response. Flag any assumptions, inferences, or gaps you filled in without direct evidence.`,

      audience: `You are the ideal customer described in this blueprint. Review this brand and marketing strategy from your perspective as someone who has the problem described and needs the desired outcome.

${blueprintData}

RESPOND AS THE CUSTOMER:
- FIRST IMPRESSION – What do you think they do? Is it clear?
- CREDIBILITY CHECK – Do you believe they can deliver? Why/why not?
- OBJECTIONS – What makes you hesitate to buy?
- EMOTIONAL RESPONSE – How does this make you feel?
- COMPETITORS – How are they different from alternatives?
- DECISION FACTORS – What would make you choose them?
- MISSING PIECES – What questions aren't answered?

Rate your likelihood to buy: 1-10 + What would increase it

Cite your sources for each claim in your response. Flag any assumptions, inferences, or gaps you filled in without direct evidence.`,

      journey: `You are a customer experience specialist. Review this customer journey and systems setup for gaps and optimization opportunities.

${blueprintData}

ANALYZE:
- JOURNEY GAPS – Where do customers get confused or frustrated?
- TOUCHPOINT QUALITY – Which interactions need improvement?
- AUTOMATION OPPORTUNITIES – What should be automated next?
- RETENTION RISKS – Where might we lose customers?
- LOYALTY ENHANCEMENT – How to increase repeat business and referrals?

RECOMMEND:
- TOP 3 IMPROVEMENTS – Priority fixes + Expected impact
- AUTOMATION SEQUENCE – Next systems to implement + Time savings
- RETENTION BOOSTERS – Ways to increase loyalty + Implementation steps

Cite your sources for each claim in your response. Flag any assumptions, inferences, or gaps you filled in without direct evidence.`,

      launch: `You are a business launch consultant. Assess if this brand and marketing foundation is ready for market launch.

${blueprintData}

VALIDATE:
- BRAND CLARITY – Can customers immediately understand the value?
- MARKET FIT – Does this solve a real problem people will pay for?
- EXECUTION READY – Are all systems in place to deliver consistently?
- COMPETITIVE STRENGTH – Is differentiation sustainable?
- RESOURCE ALIGNMENT – Can this be realistically executed?

DELIVER VERDICT:
- LAUNCH READINESS SCORE (1-10) + Reasoning
- CRITICAL GAPS – Must fix before launch + How to fix
- LAUNCH SEQUENCE – Order of implementation + Timeline
- SUCCESS PREDICTORS – What indicates this will work + What to watch
- RISK MITIGATION – Biggest threats + Prevention strategies

Cite your sources for each claim in your response. Flag any assumptions, inferences, or gaps you filled in without direct evidence.`
    };

    const systemPrompt = validationPrompts[validationType] || validationPrompts.alignment;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "user", content: systemPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits to your workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const validation = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ validation }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Validation error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
