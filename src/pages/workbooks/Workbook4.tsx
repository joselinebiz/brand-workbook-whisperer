import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { WorkbookHeader } from "@/components/WorkbookHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { AIPromptCard } from "@/components/AIPromptCard";
import { BlueprintSection } from "@/components/BlueprintSection";
import { ProtectedWorkbook } from "@/components/ProtectedWorkbook";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LineChart, Target, Rocket, Users, ChevronDown, PartyPopper, Save, Download } from "lucide-react";
import { useWorkbook } from "@/contexts/WorkbookContext";
import { generateWorkbook4Content, downloadWorkbook } from "@/utils/workbookDownload";
import { useAuth } from "@/contexts/AuthContext";

export default function Workbook4() {
  const { data, updateData, getBlueprintData } = useWorkbook();
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => setIsSaving(false), 1000);
    return () => clearTimeout(timer);
  }, [data]);

  const handleManualSave = () => {
    localStorage.setItem('workbookData', JSON.stringify(data));
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  const handleDownload = () => {
    const content = generateWorkbook4Content(data);
    downloadWorkbook(content, 4);
  };

  const handleDownloadMasterBlueprint = () => {
    const blueprintData = getBlueprintData();
    const blueprintText = `
===========================================
BLKBLD MASTER BLUEPRINT
Complete Strategic Foundation (Workbooks 0-4)
===========================================

WORKBOOK 0: MARKET OPPORTUNITY & WHITE SPACE
-------------------------------------------
White Space Declaration: ${blueprintData.whiteSpaceDeclaration || 'Not specified'}
Target Customer: ${blueprintData.targetCustomer || 'Not specified'}
Customer Problem: ${blueprintData.customerProblem || 'Not specified'}
Solution: ${blueprintData.solution || 'Not specified'}

WORKBOOK 1: BRAND FOUNDATION
-------------------------------------------
Mission Statement: ${blueprintData.mission || 'Not specified'}
5-Year Vision: ${blueprintData.vision5Year || 'Not specified'}
10-Year BHAG: ${blueprintData.bhag10Year || 'Not specified'}
Core Values: ${blueprintData.coreValues.map(v => v.value).join(', ') || 'Not specified'}
Brand Promise: ${blueprintData.brandPromise || 'Not specified'}
Brand Voice (We Are): ${blueprintData.brandVoiceAre || 'Not specified'}
Brand Voice (We're Not): ${blueprintData.brandVoiceNot || 'Not specified'}
Tagline: ${blueprintData.tagline || 'Not specified'}
One-Liner: ${blueprintData.oneLiner || 'Not specified'}
Primary Color: ${blueprintData.primaryColor || 'Not specified'}
Secondary Color: ${blueprintData.secondaryColor || 'Not specified'}
Accent Color: ${blueprintData.accentColor || 'Not specified'}

WORKBOOK 2: MARKETING STRATEGY
-------------------------------------------
Value Proposition: ${blueprintData.valueProposition || 'Not specified'}
Value Ladder (Free): ${blueprintData.valueLadder.free || 'Not specified'}
Value Ladder (Core): ${blueprintData.valueLadder.core || 'Not specified'}
Pricing Model: ${blueprintData.pricingModel || 'Not specified'}
Primary Channel: ${blueprintData.primaryChannel || 'Not specified'}
Secondary Channel: ${blueprintData.secondaryChannel || 'Not specified'}
Content Pillars: ${blueprintData.contentPillars || 'Not specified'}
Primary Platform: ${blueprintData.primaryPlatform || 'Not specified'}

WORKBOOK 3: CUSTOMER JOURNEY & SYSTEMS
-------------------------------------------
Journey Stages: ${blueprintData.journeyStages.map(s => s.stage).join(', ') || 'Not specified'}
Email Automation: ${blueprintData.emailAutomation || 'Not specified'}
Key SOPs: ${blueprintData.keySOP || 'Not specified'}
Loyalty Tiers: ${blueprintData.loyaltyTiers || 'Not specified'}
Referral System: ${blueprintData.referralSystem || 'Not specified'}

WORKBOOK 4: MEASUREMENT, SCALING & GROWTH
-------------------------------------------
Leading Indicators: ${blueprintData.leadingIndicators.map(i => i.indicator).join(', ') || 'Not specified'}
Revenue: ${blueprintData.revenue || 'Not specified'}
Customer Acquisition Cost (CAC): ${blueprintData.cac || 'Not specified'}
Lifetime Value (LTV): ${blueprintData.ltv || 'Not specified'}
LTV:CAC Ratio: ${blueprintData.ltvCacRatio || 'Not specified'}

IMPLEMENTATION ROADMAP
-------------------------------------------
Week 1-2: Review complete blueprint and set priorities
Month 1: Execute foundational systems (WB 0-3)
Month 2: Launch growth sprint and track metrics (WB 4)
Month 3: Optimize based on data and scale what works
Ongoing: Weekly reviews, monthly tests, quarterly strategy updates

===========================================
Generated: ${new Date().toLocaleDateString()}
===========================================
    `.trim();

    const blob = new Blob([blueprintText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'BLKBLD-Master-Blueprint.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  return (
    <ProtectedWorkbook
      productType="workbook_4"
      priceId="price_1SHBj5AnYzcngRwoUKYMf5Mc"
      price={19700}
      workbookTitle="Workbook 4 - Measurement, Scaling & Growth"
    >
      <div className="min-h-screen bg-background">
        <WorkbookHeader
          number="04"
          title="MEASUREMENT, SCALING & GROWTH"
          subtitle="Transform Data into Decisions and Scale What Works"
        />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Save Indicator */}
        {isSaving && (
          <div className="fixed top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <Save className="w-4 h-4" />
            <span className="text-sm font-medium">Saved</span>
          </div>
        )}

        {/* Top Save Button */}
        <div className="mb-6 flex justify-end">
          <Button onClick={handleManualSave} className="gap-2">
            <Save className="w-4 h-4" />
            Save All Changes
          </Button>
        </div>

        {/* Introduction */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-card to-muted/20">
          <h2 className="text-2xl font-bold mb-4">Who This Is For</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Business owners who have built systems (Workbooks 0-3) and are ready to scale intelligently using data. If guesswork is costing you money, this workbook transforms data into decisions.
          </p>

          <h3 className="text-xl font-semibold mb-3">✅ Prerequisites</h3>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li>• Completed Workbooks 0-3 (Foundation through Customer Journey)</li>
            <li>• Active business with trackable metrics</li>
            <li>• 5-10 hours of focused time</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">What You'll Walk Away With</h3>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li>• Custom performance dashboard</li>
            <li>• 90-day growth sprint plan</li>
            <li>• Testing framework for optimization</li>
            <li>• Team building and delegation frameworks</li>
          </ul>

          <div className="bg-background/50 p-4 rounded mb-6">
            <p className="font-semibold mb-1">Success Metric:</p>
            <p className="text-sm">20% improvement in key metrics within 90 days</p>
          </div>

          <div className="bg-muted/50 border-l-4 border-muted-foreground p-4 rounded mb-6">
            <p className="font-semibold mb-2">🔗 Bridge to Success - The Complete BLKBLD Journey:</p>
            <ul className="text-sm space-y-1">
              <li>WORKBOOK 0: Market opportunity validated</li>
              <li>WORKBOOK 1: Brand foundation built</li>
              <li>WORKBOOK 2: Strategic marketing system</li>
              <li>WORKBOOK 3: Automated customer experience</li>
              <li className="font-semibold text-primary">WORKBOOK 4: Data-driven scaling (you're here!)</li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-semibold mb-3">Why This Framework Works</h3>
            <p className="text-muted-foreground mb-4">This isn't theory from a textbook. This framework is built on:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>MBA-Level Strategy:</strong> Proven frameworks from top-tier business education, adapted for real-world application</li>
              <li>• <strong>Industry Battle-Tested:</strong> Refined through years of building and scaling multiple businesses</li>
              <li>• <strong>Results-Driven:</strong> Every exercise connects directly to revenue, customers, and sustainable growth</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4 italic">
              You're not just learning concepts—you're implementing the same systems that generate six-figure consulting engagements, now available in a structured, self-paced format.
            </p>
          </div>
        </Card>

        {/* Section 1: Performance Dashboard */}
        <Collapsible>
        <Card className="p-8 mb-8">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
              <SectionHeader
            number="1"
            title="Your Performance Dashboard"
                description="The numbers that actually matter"
                icon={<LineChart className="w-8 h-8" />}
              />
              <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
          <div className="space-y-6 mt-6">
            <div className="bg-accent/5 border-l-4 border-accent p-4 rounded mb-6">
              <p className="text-sm font-medium">
                💡 Most businesses either track nothing (flying blind) or everything (analysis paralysis). A good dashboard shows problems before they're crises.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Layer 1: Leading Indicators (Weekly)</h3>
              <p className="text-sm text-muted-foreground mb-4">These predict what will happen next month</p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-3 text-left text-sm font-semibold">Metric</th>
                      <th className="border p-3 text-left text-sm font-semibold">Target</th>
                      <th className="border p-3 text-center text-sm font-semibold">W1</th>
                      <th className="border p-3 text-center text-sm font-semibold">W2</th>
                      <th className="border p-3 text-center text-sm font-semibold">W3</th>
                      <th className="border p-3 text-center text-sm font-semibold">W4</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      "Leads generated",
                      "Content published",
                      "Outreach activities",
                      "Email list growth",
                      "Engagement rate",
                    ].map((metric, i) => (
                      <tr key={i} className="hover:bg-muted/50">
                        <td className="border p-3 font-medium">{metric}</td>
                        <td className="border p-3">
                          <Input className="h-8" placeholder="Target" />
                        </td>
                        <td className="border p-3">
                          <Input className="h-8 text-center" />
                        </td>
                        <td className="border p-3">
                          <Input className="h-8 text-center" />
                        </td>
                        <td className="border p-3">
                          <Input className="h-8 text-center" />
                        </td>
                        <td className="border p-3">
                          <Input className="h-8 text-center" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Layer 2: Lagging Indicators (Monthly)</h3>
              <p className="text-sm text-muted-foreground mb-4">These confirm what actually happened</p>
              
              <div className="space-y-3">
                {[
                  { metric: "Conversion rate", unit: "%" },
                  { metric: "Average order value", unit: "$" },
                  { metric: "Customer acquisition cost", unit: "$" },
                  { metric: "Customer lifetime value", unit: "$" },
                  { metric: "Monthly recurring revenue", unit: "$" },
                ].map((item, i) => (
                  <div key={i} className="grid md:grid-cols-5 gap-3 items-center">
                    <Label className="md:col-span-2">{item.metric}</Label>
                    <Input placeholder={`Target ${item.unit}`} />
                    <Input placeholder={`Month 1 ${item.unit}`} />
                    <Input placeholder={`Month 2 ${item.unit}`} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Your One Number</h3>
              <p className="text-sm text-muted-foreground mb-3">
                If you could only track ONE metric for the next 90 days, what would it be?
              </p>
              <Input placeholder="e.g., New qualified leads per week" />
            </div>
          </div>

          {/* AI Boost */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-bold mb-4">🤖 AI BOOST</h3>
            <AIPromptCard
              title="Metrics That Matter"
              prompt={`My business model: [from Workbook 2]
Current stage: [startup/growth/scale]
90-day goal: [specific goal]

Recommend:
1. Top 5 leading indicators to track weekly
2. Top 5 lagging indicators to track monthly
3. My "One Number" for next 90 days (with reasoning)
4. Dashboard structure (how to organize)
5. Warning signs to watch for

Make it specific to my business model.`}
            />
          </div>
          </CollapsibleContent>
        </Card>
        </Collapsible>

        {/* Section 2: Testing Framework */}
        <Collapsible>
        <Card className="p-8 mb-8">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
              <SectionHeader
            number="2"
            title="Testing & Optimization Framework"
                description="Scientific approach to improvement"
                icon={<Target className="w-8 h-8" />}
              />
              <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
          <div className="space-y-6 mt-6">
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-2 border-accent/30 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-bold mb-3">The Testing Protocol</h3>
              <ol className="space-y-2 text-sm">
                <li><strong>1. Hypothesize:</strong> "If we change X, then Y will improve because Z"</li>
                <li><strong>2. Test:</strong> Change ONE variable at a time</li>
                <li><strong>3. Measure:</strong> Track for at least 2 weeks</li>
                <li><strong>4. Decide:</strong> Keep, kill, or iterate</li>
              </ol>
            </div>

            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 bg-muted/20">
                <h4 className="font-semibold mb-4">Test #{i}</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`test-${i}-hypothesis`}>Hypothesis</Label>
                    <Textarea
                      id={`test-${i}-hypothesis`}
                      rows={2}
                      placeholder="If we [change], then [result] will improve because [reasoning]"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`test-${i}-metric`}>Metric to Track</Label>
                      <Input id={`test-${i}-metric`} placeholder="e.g., Email open rate" />
                    </div>
                    <div>
                      <Label htmlFor={`test-${i}-duration`}>Test Duration</Label>
                      <Input id={`test-${i}-duration`} placeholder="e.g., 2 weeks" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`test-${i}-baseline`}>Baseline (current performance)</Label>
                    <Input id={`test-${i}-baseline`} placeholder="e.g., 22% open rate" />
                  </div>
                  <div>
                    <Label htmlFor={`test-${i}-target`}>Target Improvement</Label>
                    <Input id={`test-${i}-target`} placeholder="e.g., 30% open rate" />
                  </div>
                  <div>
                    <Label htmlFor={`test-${i}-result`}>Results & Decision</Label>
                    <Textarea
                      id={`test-${i}-result`}
                      rows={2}
                      placeholder="Document what happened and what you'll do next..."
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* AI Boost */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-bold mb-4">🤖 AI BOOST</h3>
            <AIPromptCard
              title="Test Ideas Generator"
              prompt={`My current performance:
- [Metric 1]: [current number]
- [Metric 2]: [current number]
- [Metric 3]: [current number]

Goal: Improve [specific metric] by 20% in 30 days

Generate 5 test hypotheses using format:
"If we [change X], then [Y] will improve by [%] because [reasoning based on customer psychology/behavior]"

Rank by:
1. Likely impact (high/med/low)
2. Ease of implementation (easy/medium/hard)
3. Time to results (days)

Recommend which test to run first and why.`}
            />
          </div>
          </CollapsibleContent>
        </Card>
        </Collapsible>

        {/* Section 3: 90-Day Growth Sprint */}
        <Collapsible>
        <Card className="p-8 mb-8">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
              <SectionHeader
            number="3"
            title="90-Day Growth Sprint Plan"
                description="Your roadmap to 20% improvement"
                icon={<Rocket className="w-8 h-8" />}
              />
              <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
          <div className="space-y-6 mt-6">
            <div>
              <Label htmlFor="sprint-goal" className="text-lg">Sprint Goal</Label>
              <Input
                id="sprint-goal"
                className="text-lg"
                placeholder="e.g., Increase qualified leads from 20 to 30 per month"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {["Month 1: Foundation", "Month 2: Optimization", "Month 3: Acceleration"].map((title, i) => (
                <Card key={i} className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
                  <h4 className="font-bold mb-4">{title}</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`month-${i}-focus`} className="text-xs">Primary Focus</Label>
                      <Textarea id={`month-${i}-focus`} rows={2} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor={`month-${i}-activities`} className="text-xs">Key Activities</Label>
                      <Textarea id={`month-${i}-activities`} rows={3} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor={`month-${i}-milestone`} className="text-xs">Milestone</Label>
                      <Input id={`month-${i}-milestone`} className="mt-1" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Weekly Review Questions</h3>
              <Card className="p-4 bg-muted/30">
                <ol className="space-y-2 text-sm">
                  <li>1. Are we on track to hit this month's milestone?</li>
                  <li>2. What's working better than expected?</li>
                  <li>3. What's not working? Why?</li>
                  <li>4. What's the one thing to improve next week?</li>
                  <li>5. Do we need to pivot or persist?</li>
                </ol>
              </Card>
            </div>
          </div>

          {/* AI Boost */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-bold mb-4">🤖 AI BOOST</h3>
            <AIPromptCard
              title="Sprint Plan Builder"
              prompt={`Create my 90-day growth sprint:

Goal: [your specific goal]
Current performance: [baseline metrics]
Resources: [time, budget, team]
Constraints: [what you can't change]

For each month, provide:
1. Primary focus area
2. 3-5 key activities (specific, actionable)
3. Success milestone
4. Potential roadblocks
5. Contingency plan

Make it realistic for [solo/small team/company] execution.`}
            />
          </div>
          </CollapsibleContent>
        </Card>
        </Collapsible>

        {/* Section 4: Team & Scaling */}
        <Collapsible>
        <Card className="p-8 mb-8">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
              <SectionHeader
            number="4"
            title="Team Building & Delegation"
                description="Scale yourself by building systems"
                icon={<Users className="w-8 h-8" />}
              />
              <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
          <div className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-bold mb-4">Role Mapping</h3>
              <p className="text-sm text-muted-foreground mb-4">
                What roles do you need to scale? Start by documenting what YOU do, then determine what to delegate.
              </p>
              
              {[
                "Marketing & Content",
                "Sales & Customer Success",
                "Operations & Fulfillment",
                "Finance & Admin",
              ].map((area, i) => (
                <Card key={i} className="p-6 bg-muted/20">
                  <h4 className="font-semibold mb-4">{area}</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`role-${i}-tasks`}>Tasks (what needs to happen)</Label>
                      <Textarea id={`role-${i}-tasks`} rows={2} />
                    </div>
                    <div>
                      <Label htmlFor={`role-${i}-hours`}>Hours per week</Label>
                      <Input id={`role-${i}-hours`} type="number" />
                    </div>
                    <div>
                      <Label htmlFor={`role-${i}-delegate`}>Delegate to:</Label>
                      <select id={`role-${i}-delegate`} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Keep (founder)</option>
                        <option>Hire (employee/contractor)</option>
                        <option>Automate (software/AI)</option>
                        <option>Eliminate (not needed)</option>
                      </select>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">First Hire Priority</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your role mapping, what's the ONE role that would free up the most strategic time?
              </p>
              <Textarea rows={3} placeholder="Role title, responsibilities, impact on growth..." />
            </div>
          </div>

          {/* AI Boost */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-bold mb-4">🤖 AI BOOST</h3>
            <div className="space-y-4">
              <AIPromptCard
                title="Hire vs Automate vs Eliminate"
                prompt={`Analyze my workload:

Tasks I do weekly:
[List 10-15 recurring tasks with time spent]

For each task, recommend:
1. Keep (only I can do this)
2. Hire (worth paying someone)
3. Automate (software/AI solution)
4. Eliminate (low ROI)

Provide:
- Reasoning for each decision
- Tool suggestions for automation
- Role description for hire recommendations
- Priority order (what to do first)

Goal: Free up 10 hours/week for strategic work.`}
              />

              <AIPromptCard
                title="Job Description Builder"
                prompt={`Create a job description for:

Role: [role title]
Key responsibilities: [from role mapping]
Hours per week: [number]
Brand values: [from Workbook 1]

Include:
1. Role overview (2 sentences)
2. Key responsibilities (5-7 bullets)
3. Required skills/experience
4. Success metrics (how we'll measure performance)
5. Compensation range
6. Application question (to filter candidates)

Write in my brand voice: [ARE/NOT from Workbook 1]`}
              />
            </div>
          </div>
          </CollapsibleContent>
        </Card>
        </Collapsible>

        {/* Complete Master Blueprint - After Section 4 */}
        <BlueprintSection
          title="Your Complete Master Blueprint"
          description="Your full strategic foundation from market validation to systematic scaling (Workbooks 0-4)"
          sections={[
            {
              title: "FOUNDATION (Workbooks 0-3)",
              items: [
                "Market Opportunity & White Space validated",
                "Brand Foundation with mission, values, and identity",
                "Marketing Strategy with 4P mix and campaigns",
                "Customer Journey Systems automated and documented"
              ]
            },
            {
              title: "MEASUREMENT & GROWTH (Workbook 4)",
              items: [
                "Performance Dashboard: Leading and lagging indicators",
                "Testing Framework: Scientific approach to optimization",
                "90-Day Growth Sprint: Structured roadmap to 20% improvement",
                "Team Building Strategy: Scale through delegation and systems"
              ]
            },
            {
              title: "IMPLEMENTATION ROADMAP",
              items: [
                "Week 1-2: Review complete blueprint and set priorities",
                "Month 1: Execute foundational systems (WB 0-3)",
                "Month 2: Launch growth sprint and track metrics (WB 4)",
                "Month 3: Optimize based on data and scale what works",
                "Ongoing: Weekly reviews, monthly tests, quarterly strategy updates"
              ]
            }
          ]}
          downloadText="Download Complete Master Blueprint (WB 0-4)"
          onDownload={handleDownloadMasterBlueprint}
        />

        {/* Congratulations Section */}
        <Collapsible>
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-2 border-primary">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center gap-4 mb-4 justify-between hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-4">
                <PartyPopper className="w-12 h-12 text-primary" />
                <div className="text-left">
                  <h2 className="text-2xl font-bold">🎉 Congratulations!</h2>
                  <p className="text-muted-foreground">You've Completed the BLKBLD Master Blueprint</p>
                </div>
              </div>
              <ChevronDown className="h-6 w-6 transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
          <div className="space-y-4">
            <p className="text-lg">
              You now have a <strong>complete strategic foundation</strong> from market validation to systematic scaling. This is the same framework that generates six-figure consulting engagements.
            </p>
            <div className="bg-background/50 p-6 rounded-lg">
              <h3 className="font-bold mb-3">What You've Accomplished:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span>Market opportunity validated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>Brand foundation built</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>Marketing strategy documented</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>Customer systems automated</span>
                  </li>
                </ul>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span>Performance dashboard created</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>Testing framework established</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>Growth sprint planned</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>Team strategy defined</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-r from-accent/10 to-primary/10 p-4 rounded-lg border-2 border-accent/30">
              <h3 className="font-bold mb-2">Your Next Steps:</h3>
              <ol className="space-y-2 text-sm">
                <li>1. <strong>Review</strong> your complete blueprint and identify quick wins</li>
                <li>2. <strong>Implement</strong> your 90-day sprint plan starting this week</li>
                <li>3. <strong>Track</strong> your metrics dashboard weekly (set a recurring calendar event)</li>
                <li>4. <strong>Test</strong> one optimization hypothesis per month</li>
                <li>5. <strong>Scale</strong> what works, cut what doesn't, iterate continuously</li>
              </ol>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Button variant="hero" size="lg" asChild className="flex-1">
              <a href="/">View All Workbooks</a>
            </Button>
            <Button variant="outline" size="lg" asChild className="flex-1">
              <a href="/blueprint">Download Complete Blueprint</a>
            </Button>
          </div>
          </CollapsibleContent>
        </Card>
        </Collapsible>

        {/* Manual Save Button */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg mb-1">Save Your Work</h3>
              <p className="text-sm text-muted-foreground">Your data auto-saves, but you can manually save anytime for peace of mind</p>
            </div>
            <Button onClick={handleManualSave} size="lg" className="gap-2">
              <Save className="w-5 h-5" />
              Save All Changes
            </Button>
          </div>
        </Card>

        <div className="flex justify-between gap-4 mt-8">
          <Button variant="outline" size="lg" asChild>
            <a href="/workbook/3">← Back to Workbook 3</a>
          </Button>
          <Button onClick={handleDownload} size="lg" variant="outline" className="gap-2">
            <Download className="w-5 h-5" />
            Download My Workbook
          </Button>
        </div>
      </div>
      </div>
    </ProtectedWorkbook>
  );
}
