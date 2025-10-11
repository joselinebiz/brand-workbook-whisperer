import { useState } from "react";
import { useWorkbook } from "@/contexts/WorkbookContext";
import { WorkbookHeader } from "@/components/WorkbookHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Download, Sparkles, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Blueprint = () => {
  const { data } = useWorkbook();
  const [validationType, setValidationType] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<string>("");
  const [isValidating, setIsValidating] = useState(false);

  const handleValidation = async (type: string) => {
    setValidationType(type);
    setIsValidating(true);
    setValidationResult("");

    try {
      const blueprintText = generateBlueprintText();
      
      const { data: result, error } = await supabase.functions.invoke('validate-blueprint', {
        body: { blueprintData: blueprintText, validationType: type }
      });

      if (error) throw error;
      
      setValidationResult(result.validation);
      toast.success("Validation complete!");
    } catch (error: any) {
      console.error('Validation error:', error);
      toast.error(error.message || "Failed to validate blueprint");
    } finally {
      setIsValidating(false);
    }
  };

  const generateBlueprintText = () => {
    return `
BLKBLD BRAND & MARKETING MASTER BLUEPRINT

MARKET OPPORTUNITY (Workbook 0)
White Space Declaration: ${data.whiteSpaceDeclaration || 'Not yet defined'}
Target Customer: ${data.targetCustomer || 'Not yet defined'}
Their #1 Problem: ${data.customerProblem || 'Not yet defined'}
Your Solution: ${data.solution || 'Not yet defined'}

BRAND IDENTITY (Workbook 1)
Mission: ${data.mission || 'Not yet defined'}
Vision (5-year): ${data.vision5Year || 'Not yet defined'}
BHAG (10-year): ${data.bhag10Year || 'Not yet defined'}
Core Values: ${data.coreValues.map(v => `${v.value} → Shows up as: ${v.showsUpAs}`).join(', ') || 'Not yet defined'}
Brand Promise: ${data.brandPromise || 'Not yet defined'}
Brand Pillars: ${data.brandPillars.map(p => `${p.pillar}: ${p.showsUp} | Proof: ${p.proof}`).join(', ') || 'Not yet defined'}

VISUAL & VERBAL IDENTITY
Brand Voice (ARE): ${data.brandVoiceAre || 'Not yet defined'}
Brand Voice (NOT): ${data.brandVoiceNot || 'Not yet defined'}
Tagline: ${data.tagline || 'Not yet defined'}
One-Liner: ${data.oneLiner || 'Not yet defined'}
Primary Color: ${data.primaryColor || 'Not yet defined'}
Secondary Color: ${data.secondaryColor || 'Not yet defined'}
Accent Color: ${data.accentColor || 'Not yet defined'}
Heading Font: ${data.headingFont || 'Not yet defined'}
Sub Head Font: ${data.subHeadFont || 'Not yet defined'}
Body Font: ${data.bodyFont || 'Not yet defined'}
Brand Story: ${data.brandStory || 'Not yet defined'}

POSITIONING
Positioning Statement: ${data.positioningStatement || 'Not yet defined'}
Target Audience Demographics: ${data.targetAudience.demographics || 'Not yet defined'}
Target Audience Pain Points: ${data.targetAudience.painPoints || 'Not yet defined'}
Where to Find Them: ${data.targetAudience.whereToFind || 'Not yet defined'}

MARKETING STRATEGY (Workbook 2)
Value Proposition: ${data.valueProposition || 'Not yet defined'}
Revenue Streams: ${data.revenueStreams || 'Not yet defined'}
Key Activities: ${data.keyActivities || 'Not yet defined'}
Customer Segments: ${data.customerSegments || 'Not yet defined'}

5C MARKET ANALYSIS
Company Strengths: ${data.companyStrengths || 'Not yet defined'}
Category Opportunity: ${data.categoryOpportunity || 'Not yet defined'}
Customer Insights: ${data.customerInsights || 'Not yet defined'}
Competition Gap: ${data.competitionGap || 'Not yet defined'}
Context/Trend: ${data.contextTrend || 'Not yet defined'}

4P MARKETING MIX
Product Value Ladder: Free: ${data.valueLadder.free || 'Not yet defined'} | Core: ${data.valueLadder.core || 'Not yet defined'}
Pricing Model: ${data.pricingModel || 'Not yet defined'}
Break-even: ${data.breakEven || 'Not yet defined'}
Pricing Tiers: ${data.pricingTiers || 'Not yet defined'}
Primary Channel: ${data.primaryChannel || 'Not yet defined'}
Secondary Channel: ${data.secondaryChannel || 'Not yet defined'}
Content Pillars: ${data.contentPillars || 'Not yet defined'}
Primary Platform: ${data.primaryPlatform || 'Not yet defined'}
Content Mix: ${data.contentMix || 'Not yet defined'}

CUSTOMER JOURNEY & SYSTEMS (Workbook 3)
Journey Stages: ${data.journeyStages.map(s => `${s.stage}: ${s.action} | Metric: ${s.metric}`).join(' | ') || 'Not yet defined'}
2-2-2 Follow-Up System: Day 2: ${data.followUpSystem.day2 ? '✓' : '✗'} | Week 2: ${data.followUpSystem.week2 ? '✓' : '✗'} | Month 2: ${data.followUpSystem.month2 ? '✓' : '✗'}
Email Automation: ${data.emailAutomation || 'Not yet defined'}
Key SOP: ${data.keySOP || 'Not yet defined'}
Customer Health Score: ${data.customerHealthScore ? 'Implemented' : 'Not implemented'}
Loyalty Program Tiers: ${data.loyaltyTiers || 'Not yet defined'}
Referral System: ${data.referralSystem || 'Not yet defined'}
Satisfaction Tracking: ${data.satisfactionTracking ? 'Active' : 'Not active'}
    `.trim();
  };

  const handleDownload = () => {
    const blueprintText = generateBlueprintText();
    const blob = new Blob([blueprintText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'BLKBLD-Master-Blueprint.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Blueprint downloaded!");
  };

  const validationPrompts = [
    {
      id: 'alignment',
      title: 'Strategic Alignment Audit',
      description: 'Audit your complete brand and marketing foundation for strategic alignment and market viability.',
      icon: <CheckCircle2 className="w-5 h-5" />
    },
    {
      id: 'audience',
      title: 'Target Audience Stress Test',
      description: 'Review your strategy from your ideal customer\'s perspective.',
      icon: <CheckCircle2 className="w-5 h-5" />
    },
    {
      id: 'journey',
      title: 'Customer Journey Optimizer',
      description: 'Analyze your customer journey for gaps and optimization opportunities.',
      icon: <CheckCircle2 className="w-5 h-5" />
    },
    {
      id: 'launch',
      title: 'Launch Readiness Validator',
      description: 'Assess if your brand and marketing foundation is ready for market launch.',
      icon: <CheckCircle2 className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <WorkbookHeader
        number="📋"
        title="Your Foundational Blueprint"
        subtitle="Complete Strategic Foundation - Unlocked after Workbook 2"
      />

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Blueprint Summary */}
        <Card className="p-8 mb-8">
          <div className="prose prose-sm max-w-none">
            <div className="mb-8">
              <Badge className="mb-4">Market Opportunity - Workbook 0</Badge>
              <div className="space-y-4">
                <div>
                  <strong>White Space Declaration:</strong>
                  <p className="text-muted-foreground mt-1">{data.whiteSpaceDeclaration || 'Not yet defined'}</p>
                </div>
                <div>
                  <strong>Target Customer:</strong>
                  <p className="text-muted-foreground mt-1">{data.targetCustomer || 'Not yet defined'}</p>
                </div>
                <div>
                  <strong>Their #1 Problem:</strong>
                  <p className="text-muted-foreground mt-1">{data.customerProblem || 'Not yet defined'}</p>
                </div>
                <div>
                  <strong>Your Solution:</strong>
                  <p className="text-muted-foreground mt-1">{data.solution || 'Not yet defined'}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <Badge className="mb-4">Brand Identity - Workbook 1</Badge>
              <div className="space-y-4">
                <div>
                  <strong>Mission:</strong>
                  <p className="text-muted-foreground mt-1">{data.mission || 'Not yet defined'}</p>
                </div>
                <div>
                  <strong>Vision (5-year):</strong>
                  <p className="text-muted-foreground mt-1">{data.vision5Year || 'Not yet defined'}</p>
                </div>
                <div>
                  <strong>BHAG (10-year):</strong>
                  <p className="text-muted-foreground mt-1">{data.bhag10Year || 'Not yet defined'}</p>
                </div>
                <div>
                  <strong>Core Values:</strong>
                  {data.coreValues.length > 0 ? (
                    <ul className="mt-1 space-y-1">
                      {data.coreValues.map((v, i) => (
                        <li key={i} className="text-muted-foreground">
                          {v.value} → Shows up as: {v.showsUpAs}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground mt-1">Not yet defined</p>
                  )}
                </div>
                <div>
                  <strong>Brand Promise:</strong>
                  <p className="text-muted-foreground mt-1">{data.brandPromise || 'Not yet defined'}</p>
                </div>
                <div>
                  <strong>Brand Voice (ARE):</strong>
                  <p className="text-muted-foreground mt-1">{data.brandVoiceAre || 'Not yet defined'}</p>
                </div>
                <div>
                  <strong>Brand Voice (NOT):</strong>
                  <p className="text-muted-foreground mt-1">{data.brandVoiceNot || 'Not yet defined'}</p>
                </div>
                <div>
                  <strong>Tagline:</strong>
                  <p className="text-muted-foreground mt-1">{data.tagline || 'Not yet defined'}</p>
                </div>
                <div>
                  <strong>One-Liner:</strong>
                  <p className="text-muted-foreground mt-1">{data.oneLiner || 'Not yet defined'}</p>
                </div>
                <div>
                  <strong>Colors:</strong>
                  <div className="flex gap-4 mt-2">
                    <div>
                      <p className="text-sm">Primary: {data.primaryColor || 'Not set'}</p>
                      {data.primaryColor && (
                        <div className="w-12 h-12 rounded border mt-1" style={{ backgroundColor: data.primaryColor }} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm">Secondary: {data.secondaryColor || 'Not set'}</p>
                      {data.secondaryColor && (
                        <div className="w-12 h-12 rounded border mt-1" style={{ backgroundColor: data.secondaryColor }} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm">Accent: {data.accentColor || 'Not set'}</p>
                      {data.accentColor && (
                        <div className="w-12 h-12 rounded border mt-1" style={{ backgroundColor: data.accentColor }} />
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <strong>Typography:</strong>
                  <p className="text-muted-foreground mt-1">
                    Heading: {data.headingFont || 'Not set'} | 
                    Sub Head: {data.subHeadFont || 'Not set'} | 
                    Body: {data.bodyFont || 'Not set'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <Badge className="mb-4">Marketing Strategy - Workbook 2</Badge>
              <div className="space-y-4">
                <div>
                  <strong>Value Proposition:</strong>
                  <p className="text-muted-foreground mt-1">{data.valueProposition || 'Not yet defined'}</p>
                </div>
                <div>
                  <strong>Revenue Streams:</strong>
                  <p className="text-muted-foreground mt-1">{data.revenueStreams || 'Not yet defined'}</p>
                </div>
                <div>
                  <strong>Primary Channel:</strong>
                  <p className="text-muted-foreground mt-1">{data.primaryChannel || 'Not yet defined'}</p>
                </div>
                <div>
                  <strong>Content Pillars:</strong>
                  <p className="text-muted-foreground mt-1">{data.contentPillars || 'Not yet defined'}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <Badge className="mb-4">Customer Journey - Workbook 3</Badge>
              <div className="space-y-4">
                <div>
                  <strong>Journey Stages:</strong>
                  {data.journeyStages.length > 0 ? (
                    <ul className="mt-1 space-y-1">
                      {data.journeyStages.map((s, i) => (
                        <li key={i} className="text-muted-foreground">
                          {s.stage}: {s.action} | Metric: {s.metric}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground mt-1">Not yet defined</p>
                  )}
                </div>
                <div>
                  <strong>2-2-2 Follow-Up System:</strong>
                  <p className="text-muted-foreground mt-1">
                    Day 2: {data.followUpSystem.day2 ? '✓ Complete' : '✗ Not complete'} | 
                    Week 2: {data.followUpSystem.week2 ? '✓ Complete' : '✗ Not complete'} | 
                    Month 2: {data.followUpSystem.month2 ? '✓ Complete' : '✗ Not complete'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <Button onClick={handleDownload} size="lg" className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Download Blueprint
            </Button>
          </div>
        </Card>

        {/* AI Validation Section */}
        <Card className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-accent" />
              AI VALIDATION PROMPTS
            </h2>
            <p className="text-muted-foreground">
              Validate your strategic foundation with AI-powered audits from multiple perspectives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {validationPrompts.map((prompt) => (
              <Card key={prompt.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleValidation(prompt.id)}>
                <div className="flex items-start gap-4">
                  <div className="text-accent">{prompt.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-2">{prompt.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{prompt.description}</p>
                    <Button variant="outline" size="sm" disabled={isValidating && validationType === prompt.id}>
                      {isValidating && validationType === prompt.id ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Validating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Run Validation
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {validationResult && (
            <Card className="p-6 bg-muted/50">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                Validation Results
              </h3>
              <Textarea
                value={validationResult}
                readOnly
                className="min-h-[400px] font-mono text-sm"
              />
            </Card>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Blueprint;
