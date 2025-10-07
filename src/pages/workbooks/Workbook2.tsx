import { useState, useEffect } from "react";
import { WorkbookHeader } from "@/components/WorkbookHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { AIPromptCard } from "@/components/AIPromptCard";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { TrendingUp, DollarSign, BarChart3, Megaphone, ChevronDown, PartyPopper, Save } from "lucide-react";
import { useWorkbook } from "@/contexts/WorkbookContext";

export default function Workbook2() {
  const { data, updateData } = useWorkbook();
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

  return (
    <div className="min-h-screen bg-background">
      <WorkbookHeader
        number="02"
        title="MARKETING STRATEGY EXECUTION"
        subtitle="Turn Your Brand Foundation into a Revenue-Generating Machine"
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
            Businesses ready to move from random marketing to strategic execution. If you've completed Workbook 1, you have your brand foundation—now we build the revenue-generating engine.
          </p>

          <h3 className="text-xl font-bold mb-3">✅ Prerequisites</h3>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li>• Completed Workbook 1 (Brand Strategy Foundation)</li>
            <li>• 5-10 hours of focused time</li>
            <li>• Access to competitive research tools (Google, social platforms)</li>
          </ul>

          <h3 className="text-xl font-bold mb-3">What You'll Walk Away With</h3>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li>• Complete business model and market analysis</li>
            <li>• Proprietary 4P marketing mix strategy</li>
            <li>• Value ladder with pricing psychology</li>
            <li>• 30-day content calendar—copy-paste ready</li>
          </ul>

          <div className="bg-background/50 p-4 rounded mb-6">
            <p className="font-semibold mb-1">Success Metric:</p>
            <p className="text-sm">Complete marketing plan with measurable goals for each channel</p>
          </div>

          <div className="border-t pt-6 mb-6">
            <h3 className="text-xl font-bold mb-3">🔗 Bridge to Success</h3>
            <p className="font-semibold mb-3">The Complete BLKBLD Journey:</p>
            <ul className="space-y-2 text-sm">
              <li><strong>WORKBOOK 0:</strong> Market opportunity validated</li>
              <li><strong>WORKBOOK 1:</strong> Brand foundation built</li>
              <li className="text-accent"><strong>WORKBOOK 2:</strong> Strategic marketing system (you're here!)</li>
              <li><strong>WORKBOOK 3:</strong> Automated customer experience</li>
              <li><strong>WORKBOOK 4:</strong> Data-driven optimization and scaling</li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-bold mb-3">Why This Framework Works</h3>
            <p className="text-muted-foreground mb-4">This isn't theory from a textbook. This framework is built on:</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>MBA-Level Strategy:</strong> Proven frameworks from top-tier business education</li>
              <li>• <strong>Industry Battle-Tested:</strong> Refined through years of building businesses</li>
              <li>• <strong>Results-Driven:</strong> Every exercise connects to revenue and growth</li>
            </ul>
          </div>
        </Card>

        {/* Section 1: Strategic Foundation */}
        <Collapsible defaultOpen={false}>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                <SectionHeader
                  number="1"
                  title="Strategic Foundation Speed-to-Value Architecture"
                  description="Understanding how all pieces connect"
                  icon={<TrendingUp className="w-8 h-8" />}
                />
                <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="space-y-6 mt-6">
                <div className="bg-accent/5 border-l-4 border-accent p-4 rounded">
                  <p className="text-sm font-medium">
                    💡 <strong>Why This Matters:</strong> Your brand promise from Workbook 1 must align with business reality. This canvas ensures marketing promises match what you can actually deliver.
                  </p>
                </div>

                <div className="bg-muted/30 border-l-4 border-muted-foreground p-4 rounded">
                  <p className="text-sm font-medium">
                    💡 <strong>New to This?</strong> A Business Model Canvas maps how your business creates, delivers, and captures value. Think of it as a one-page business plan.
                  </p>
                </div>

                <h3 className="text-xl font-bold">1.1 Business Model Canvas (Two 15-min Sprints)</h3>

                {/* Sprint 1 */}
                <Card className="p-6 bg-muted/20">
                  <h4 className="font-semibold mb-4">Sprint 1: Core Elements (15 min)</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="customer-segments">Customer Segments</Label>
                      <p className="text-xs text-muted-foreground mb-2">Who needs you most?</p>
                      <Textarea 
                        id="customer-segments" 
                        rows={2}
                        value={data.customerSegments}
                        onChange={(e) => updateData('customerSegments', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="value-prop">Value Proposition</Label>
                      <p className="text-xs text-muted-foreground mb-2">What problem do you solve?</p>
                      <Textarea 
                        id="value-prop" 
                        rows={2}
                        value={data.valueProposition}
                        onChange={(e) => updateData('valueProposition', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="channels">Channels</Label>
                      <p className="text-xs text-muted-foreground mb-2">How do they find/buy from you?</p>
                      <Textarea 
                        id="channels" 
                        rows={2}
                        value={data.primaryChannel}
                        onChange={(e) => updateData('primaryChannel', e.target.value)}
                      />
                    </div>
                  </div>
                </Card>

                {/* Sprint 2 */}
                <Card className="p-6 bg-muted/20">
                  <h4 className="font-semibold mb-4">Sprint 2: Operations (15 min)</h4>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="key-resources">Key Resources</Label>
                      <p className="text-xs text-muted-foreground mb-2">What do you need to operate?</p>
                      <Textarea id="key-resources" rows={2} />
                    </div>
                    <div>
                      <Label htmlFor="key-activities">Key Activities</Label>
                      <p className="text-xs text-muted-foreground mb-2">What must happen daily?</p>
                      <Textarea 
                        id="key-activities" 
                        rows={2}
                        value={data.keyActivities}
                        onChange={(e) => updateData('keyActivities', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="revenue-streams">Revenue Streams</Label>
                      <p className="text-xs text-muted-foreground mb-2">How do you make money?</p>
                      <Textarea 
                        id="revenue-streams" 
                        rows={2}
                        value={data.revenueStreams}
                        onChange={(e) => updateData('revenueStreams', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cost-structure">Cost Structure</Label>
                      <p className="text-xs text-muted-foreground mb-2">What are the biggest expenses?</p>
                      <Textarea id="cost-structure" rows={2} />
                    </div>
                  </div>
                </Card>

                <div className="bg-accent/10 border-l-4 border-accent p-4 rounded">
                  <p className="text-sm font-medium">
                    💡 <strong>Quick Win:</strong> Overwhelmed? Only fill 'Value Prop' and 'Customer Segments' first.
                  </p>
                </div>

                {/* Bridge Check */}
                <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
                  <h4 className="font-semibold mb-3">🔗 Bridge Check from Workbook 1</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Value Prop = Your Brand Promise?</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Customer Segments = Your Target?</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Key Activities deliver your Pillars?</span>
                    </label>
                  </div>
                </div>

                {/* Examples */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Examples Across Three Brand Types:</h3>
                  
                  <Collapsible>
                    <Card className="p-6 mb-4 bg-muted/20">
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                          <h4 className="font-semibold flex items-center gap-2">
                            🏪 Brick-and-Mortar Brand - FreshStart Café
                          </h4>
                          <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-4 space-y-2 text-sm">
                          <p><strong>Value Proposition:</strong> Healthy breakfast ready in under 5 minutes</p>
                          <p><strong>Customer Segments:</strong> Busy Phoenix families with kids</p>
                          <p><strong>Channels:</strong> Physical location + pre-order app</p>
                          <p><strong>Revenue Streams:</strong> Food sales + catering + loyalty program</p>
                        </div>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>

                  <Collapsible>
                    <Card className="p-6 mb-4 bg-muted/20">
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                          <h4 className="font-semibold flex items-center gap-2">
                            🎯 Service Brand - Business Coach
                          </h4>
                          <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-4 space-y-2 text-sm">
                          <p><strong>Channels:</strong> LinkedIn + referrals + speaking engagements</p>
                          <p><strong>Customer Segments:</strong> Overwhelmed solopreneurs ($50K-$200K revenue)</p>
                          <p><strong>Value Proposition:</strong> Build profitable systems in 90 days without burnout</p>
                          <p><strong>Revenue Streams:</strong> 1:1 coaching + group programs + workshops</p>
                        </div>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>

                  <Collapsible>
                    <Card className="p-6 bg-muted/20">
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                          <h4 className="font-semibold flex items-center gap-2">
                            👤 Personal Brand - Marketing Executive
                          </h4>
                          <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-4 space-y-2 text-sm">
                          <p><strong>Channels:</strong> LinkedIn thought leadership + conference speaking + industry networks</p>
                          <p><strong>Customer Segments:</strong> B2B SaaS CEOs</p>
                          <p><strong>Value Proposition:</strong> Predictable marketing systems that scale</p>
                          <p><strong>Revenue Streams:</strong> Salary advancement + consulting opportunities + speaking fees</p>
                        </div>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                </div>

                {/* AI Boost - Canvas Optimizer */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-xl font-bold mb-4">🤖 AI BOOST - Canvas Optimizer</h3>
                  <AIPromptCard
                    title="Canvas Optimizer"
                    prompt={`You are a senior business model strategist. Analyze this canvas and provide ACTIONABLE insights:

My business model: [Paste your canvas elements]
Brand type: [Business/Product/Service/Personal]

CONSTRAINTS:
- I have a limited budget (<$5K)

AVOID suggesting:
- Expensive partnerships or technology
- Complex revenue models requiring large teams
- Strategies that take 6+ months to implement

REQUIRED OUTPUT FORMAT:
1. BIGGEST RISK: [One sentence]
2. PROFIT OPPORTUNITY: [Specific element to optimize] + [Expected % improvement]
3. MISSING REVENUE STREAM: [One realistic addition] + [Implementation steps]
4. PARTNERSHIP IDEA: [Low-cost, high-impact suggestion] + [How to approach]`}
                  />
                </div>

                {/* 1.2 Market Intelligence */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-4">1.2 Consolidated Market Intelligence Sprint (45 min)</h3>
                  <p className="text-sm text-muted-foreground mb-6">Your complete market reality</p>

                  <div className="bg-accent/5 border-l-4 border-accent p-4 rounded mb-6">
                    <p className="text-sm font-medium">
                      💡 <strong>Why This Matters:</strong> You can't win a game you don't understand. The 5Cs give you a 360-degree view of your market landscape.
                    </p>
                  </div>

                  <h4 className="font-semibold mb-4">The Market Intelligence Framework (15 Min 5C Rapid Scan)</h4>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="company-analysis">Company - Your top 3 strengths (Double down here)</Label>
                      <Textarea 
                        id="company-analysis" 
                        rows={3}
                        value={data.companyStrengths}
                        onChange={(e) => updateData('companyStrengths', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category-analysis">Category - Market size & growth (Ride this trend)</Label>
                      <Textarea 
                        id="category-analysis" 
                        rows={3}
                        value={data.categoryOpportunity}
                        onChange={(e) => updateData('categoryOpportunity', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="customer-analysis">Customer - Their top 3 unmet needs (Fill this gap)</Label>
                      <Textarea 
                        id="customer-analysis" 
                        rows={3}
                        value={data.customerInsights}
                        onChange={(e) => updateData('customerInsights', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="competition-analysis">Competition - What they all miss (Your opportunity)</Label>
                      <Textarea 
                        id="competition-analysis" 
                        rows={3}
                        value={data.competitionGap}
                        onChange={(e) => updateData('competitionGap', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="context-analysis">Context - One trend to ride (Timing advantage)</Label>
                      <Textarea 
                        id="context-analysis" 
                        rows={3}
                        value={data.contextTrend}
                        onChange={(e) => updateData('contextTrend', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label htmlFor="big-opportunity">The Big Opportunity</Label>
                    <p className="text-sm text-muted-foreground mb-2">Based on all 5Cs, what opportunity emerges?</p>
                    <Textarea id="big-opportunity" rows={3} placeholder="Your strategic opportunity..." />
                  </div>
                </div>

                {/* AI Boost - Market Intelligence */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-xl font-bold mb-4">🤖 AI BOOST - Market Intelligence</h3>
                  <AIPromptCard
                    title="Market Intelligence"
                    prompt={`You are a market research analyst specializing in small business strategy. Help me find my best opportunity.

My industry: [type]
My strengths: [3 things]
Budget: Under $5K
Competition: [names]
Brand type: [Business/Product/Service/Personal]
Target Audience: [from Workbook 1]
My 5C's exercise: [Copy and Paste your 5Cs here]

DO NOT include:
- Suggestions requiring significant capital investment
- Complex market segmentation beyond my capacity

CONDITIONS:
- Prioritize speed-to-market over perfection

OUTPUT:
- BEST TARGET: [Who to focus on first] + [Where to find them]
- CUSTOMER PAIN POINTS: [Top 3 unmet needs] + [Evidence/source]
- YOUR ADVANTAGE: [What competitors miss that you can deliver]
- PRICE POINT: [What they'll pay] + [Market evidence]
- Conclude with: 'Start with [specific audience] because [compelling reason].'`}
                  />
                </div>

                {/* Exercise */}
                <div className="mt-6 bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Exercise (10 min): Target Validation</h4>
                  <p className="text-sm mb-3">Call 3 people in your target segment. Ask:</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• "What's your biggest challenge with [problem area]?"</li>
                    <li>• "What would perfect look like?"</li>
                    <li>• "What would you pay for that?"</li>
                  </ul>
                </div>

                {/* Checkpoint */}
                <div className="mt-8 bg-primary/10 border-2 border-primary p-6 rounded-lg">
                  <h4 className="font-bold mb-3">Section 1 Checkpoint ✓</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Business Model Canvas complete</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Market opportunity identified</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Primary target segment chosen</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Positioning statement written</span>
                    </label>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Section 2: 4P Marketing Mix */}
        <Collapsible defaultOpen={false}>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                <SectionHeader
                  number="2"
                  title="4P Marketing Mix"
                  description="Product, Price, Place, Promotion"
                  icon={<DollarSign className="w-8 h-8" />}
                />
                <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="space-y-8 mt-6">
                <div className="bg-accent/5 border-l-4 border-accent p-4 rounded">
                  <p className="text-sm font-medium">
                    💡 <strong>Why This Section Matters:</strong> The 4Ps are your controllable levers: Product (what you sell), Price (what you charge), Place (where/how delivered), Promotion (how people find you). Get these aligned and marketing becomes systematic, not random.
                  </p>
                </div>

                {/* 2.1 Product Strategy */}
                <div>
                  <h3 className="text-xl font-bold mb-4">2.1 Product Strategy - What you're really selling</h3>
                  
                  <div className="bg-muted/30 border-l-4 border-muted-foreground p-4 rounded mb-6">
                    <p className="text-sm font-medium">
                      💡 <strong>New to This?</strong> People don't buy products—they buy transformations. Your "product" is the change you create.
                    </p>
                  </div>

                  <h4 className="font-semibold mb-4">Value Ladder Design</h4>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border p-3 text-left font-semibold">Level</th>
                          <th className="border p-3 text-left font-semibold">Offer</th>
                          <th className="border p-3 text-left font-semibold">Price</th>
                          <th className="border p-3 text-left font-semibold">Purpose</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border p-3">Free</td>
                          <td className="border p-3">
                            <Input 
                              placeholder="e.g., Brand Strategy Quiz"
                              value={data.valueLadder.free}
                              onChange={(e) => updateData('valueLadder', { ...data.valueLadder, free: e.target.value })}
                            />
                          </td>
                          <td className="border p-3">$0</td>
                          <td className="border p-3 text-muted-foreground">Attract leads</td>
                        </tr>
                        <tr>
                          <td className="border p-3">Entry</td>
                          <td className="border p-3">
                            <Input placeholder="e.g., Mini Workshop" />
                          </td>
                          <td className="border p-3">
                            <Input placeholder="$27" />
                          </td>
                          <td className="border p-3 text-muted-foreground">Validate interest</td>
                        </tr>
                        <tr>
                          <td className="border p-3">Core</td>
                          <td className="border p-3">
                            <Input 
                              placeholder="e.g., Complete Workbook System"
                              value={data.valueLadder.core}
                              onChange={(e) => updateData('valueLadder', { ...data.valueLadder, core: e.target.value })}
                            />
                          </td>
                          <td className="border p-3">
                            <Input placeholder="$297" />
                          </td>
                          <td className="border p-3 text-muted-foreground">Generate profit</td>
                        </tr>
                        <tr>
                          <td className="border p-3">Premium</td>
                          <td className="border p-3">
                            <Input placeholder="e.g., 1:1 Strategy Consultation" />
                          </td>
                          <td className="border p-3">
                            <Input placeholder="$997" />
                          </td>
                          <td className="border p-3 text-muted-foreground">Maximize value</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="font-semibold mb-4">Feature-Emotion-Transformation Map</h4>
                  <div className="space-y-3 mb-6">
                    <div>
                      <Label htmlFor="feature">Feature - What you provide</Label>
                      <Input id="feature" placeholder="e.g., 90-day system implementation" />
                    </div>
                    <div>
                      <Label htmlFor="benefit">Benefit - Immediate value</Label>
                      <Input id="benefit" placeholder="e.g., Organized processes, clear priorities" />
                    </div>
                    <div>
                      <Label htmlFor="transformation">Transformation - Life/business change</Label>
                      <Input id="transformation" placeholder="e.g., Business that serves owner, not consumes them" />
                    </div>
                    <div>
                      <Label htmlFor="emotion">Emotion - How they feel</Label>
                      <Input id="emotion" placeholder="e.g., Relief, control, excitement about growth" />
                    </div>
                  </div>

                  {/* Product Examples */}
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Examples:</h4>
                    
                    <Collapsible>
                      <Card className="p-6 mb-4 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h5 className="font-semibold">🏪 Brick-and-Mortar Brand - FreshStart Café</h5>
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-4 space-y-2 text-sm">
                            <p><strong>Feature:</strong> 5-minute chef-made breakfast</p>
                            <p><strong>Benefit:</strong> Save time, eat healthy</p>
                            <p><strong>Transformation:</strong> Stress-free mornings, family connection</p>
                            <p><strong>Emotion:</strong> Calm, energized, confident</p>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    <Collapsible>
                      <Card className="p-6 mb-4 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h5 className="font-semibold">🎯 Service Brand - Business Coach</h5>
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-4 space-y-2 text-sm">
                            <p><strong>Feature:</strong> 90-day system implementation</p>
                            <p><strong>Benefit:</strong> Organized processes, clear priorities</p>
                            <p><strong>Transformation:</strong> Business that serves owner, not consumes them</p>
                            <p><strong>Emotion:</strong> Relief, control, excitement about growth</p>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    <Collapsible>
                      <Card className="p-6 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h5 className="font-semibold">👤 Personal Brand - Marketing Executive</h5>
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-4 space-y-2 text-sm">
                            <p><strong>Feature:</strong> Systematic marketing frameworks</p>
                            <p><strong>Benefit:</strong> Predictable lead generation, clear ROI</p>
                            <p><strong>Transformation:</strong> Confident scaling, executive credibility</p>
                            <p><strong>Emotion:</strong> Professional confidence, career advancement security</p>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  </div>

                  {/* AI Boost - Product Optimizer */}
                  <div className="mt-8 pt-6 border-t">
                    <h4 className="text-lg font-bold mb-4">🤖 AI BOOST - Product Optimizer</h4>
                    <AIPromptCard
                      title="Product Optimizer"
                      prompt={`You are a product strategist. Design my 4-tier value ladder:

- My core offer: [describe]
- Target customer: [who]
- Main transformation: [result]
- Brand type: [Business/Product/Service/Personal]

Provide:
- FREE: Lead magnet idea
- ENTRY: Low-risk first purchase
- CORE: Main revenue generator
- PREMIUM: Ultra version

• Include pricing logic for each tier
• Feature-benefit-transformation breakdown for core offer`}
                    />
                  </div>
                </div>

                {/* 2.2 Pricing Strategy */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-4">2.2 Pricing Strategy</h3>

                  <div className="bg-accent/5 border-l-4 border-accent p-4 rounded mb-6">
                    <p className="text-sm font-medium">
                      💡 <strong>Why This Matters:</strong> Price is the only P that generates revenue—everything else costs money. Your pricing signals quality and determines profitability.
                    </p>
                  </div>

                  <div className="bg-muted/30 border-l-4 border-muted-foreground p-4 rounded mb-6">
                    <p className="text-sm font-medium">
                      💡 <strong>New to This?</strong><br />
                      • CAC = Customer Acquisition Cost (what you spend to get one customer)<br />
                      • LTV = Lifetime Value (total revenue from one customer)<br />
                      • Margin = Profit percentage after all costs
                    </p>
                  </div>

                  <h4 className="font-semibold mb-4">Pricing Model Selection</h4>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <label className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 cursor-pointer">
                      <input type="checkbox" />
                      <span className="text-sm">One-time purchase</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 cursor-pointer">
                      <input type="checkbox" />
                      <span className="text-sm">Subscription/recurring</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 cursor-pointer">
                      <input type="checkbox" />
                      <span className="text-sm">Tiered (good/better/best)</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 cursor-pointer">
                      <input type="checkbox" />
                      <span className="text-sm">Usage-based</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 cursor-pointer">
                      <input type="checkbox" />
                      <span className="text-sm">Project/package</span>
                    </label>
                  </div>

                  <h4 className="font-semibold mb-4">Break-Even Analysis Must-Do</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="fixed-costs">Fixed costs/month</Label>
                      <Input id="fixed-costs" placeholder="$2,500" />
                    </div>
                    <div>
                      <Label htmlFor="variable-cost">Variable cost per sale</Label>
                      <Input id="variable-cost" placeholder="$50" />
                    </div>
                    <div>
                      <Label htmlFor="your-price">Your price</Label>
                      <Input id="your-price" placeholder="$297" />
                    </div>
                    <div>
                      <Label htmlFor="breakeven">Break-even units per month</Label>
                      <Input id="breakeven" placeholder="Calculated: 10" disabled />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-6">Formula: Fixed Costs ÷ (Price - Variable Cost) = Units needed</p>

                  <h4 className="font-semibold mb-4">Good-Better-Best Tiers (Psychological Pricing)</h4>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <Card className="p-4 bg-muted/20">
                      <Label className="mb-2 block">Good - Basic solution</Label>
                      <Input placeholder="$97" className="mb-2" />
                      <Textarea rows={3} placeholder="What's included..." />
                    </Card>
                    <Card className="p-4 bg-primary/5 border-2 border-primary">
                      <Label className="mb-2 block">Better - Most popular</Label>
                      <Input placeholder="$297" className="mb-2" />
                      <Textarea rows={3} placeholder="What's included..." />
                    </Card>
                    <Card className="p-4 bg-muted/20">
                      <Label className="mb-2 block">Best - Premium</Label>
                      <Input placeholder="$997" className="mb-2" />
                      <Textarea rows={3} placeholder="What's included..." />
                    </Card>
                  </div>

                  <div className="bg-accent/10 border-l-4 border-accent p-4 rounded mb-6">
                    <h4 className="font-semibold mb-2">Pricing Psychology Trade Secrets</h4>
                    <ul className="text-sm space-y-1">
                      <li>• End in 7 or 9 for deals ($19, $99; $27, $97) - signals value</li>
                      <li>• End in 0 for premium ($100, $500) - signals quality</li>
                      <li>• Always show premium first (anchoring)</li>
                      <li>• Bundle complementary items together</li>
                    </ul>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold mb-2">🚨 Troubleshooting:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• "Low margins?" → Test premium tier at 3X current price</li>
                      <li>• "Scared of pricing high?" → Use anchor pricing (show highest first)</li>
                      <li>• "No one's buying?" → Price might be too low (signals poor quality)</li>
                    </ul>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold mb-3">Exercise (10 min): Price Testing</h4>
                    <ol className="text-sm space-y-1 ml-4">
                      <li>1. Calculate your true break-even</li>
                      <li>2. Add 30% margin minimum</li>
                      <li>3. Create 3 tiers</li>
                      <li>4. Test with 5 prospects - gauge reaction</li>
                    </ol>
                  </div>

                  <div className="bg-accent/10 border-l-4 border-accent p-4 rounded mb-6">
                    <p className="text-sm font-medium">
                      💡 <strong>Solo Founder Shortcut:</strong> Start with competitor price + 20%. Test for 2 weeks. Adjust based on objections.
                    </p>
                  </div>

                  {/* Pricing Examples */}
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Examples:</h4>
                    
                    <Collapsible>
                      <Card className="p-6 mb-4 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h5 className="font-semibold">🏪 Brick-and-Mortar Brand - FreshStart Café</h5>
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-4 space-y-2 text-sm">
                            <p><strong>Good:</strong> Single breakfast ($8)</p>
                            <p><strong>Better:</strong> Family pack ($28)</p>
                            <p><strong>Best:</strong> Weekly meal plan ($89)</p>
                            <p><strong>Psychology:</strong> Pricing ends in 8/9 for value perception</p>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    <Collapsible>
                      <Card className="p-6 mb-4 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h5 className="font-semibold">🎯 Service Brand - Business Coach</h5>
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-4 space-y-2 text-sm">
                            <p><strong>Good:</strong> DIY course ($297)</p>
                            <p><strong>Better:</strong> Group coaching ($1,497)</p>
                            <p><strong>Best:</strong> 1:1 intensive ($4,997)</p>
                            <p><strong>Psychology:</strong> Premium positioning with high anchor price</p>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    <Collapsible>
                      <Card className="p-6 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h5 className="font-semibold">👤 Personal Brand - Marketing Executive</h5>
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-4 space-y-2 text-sm">
                            <p><strong>Good:</strong> LinkedIn consultation ($150/hr)</p>
                            <p><strong>Better:</strong> Strategy audit ($2,500)</p>
                            <p><strong>Best:</strong> Fractional CMO ($8,500/month)</p>
                            <p><strong>Psychology:</strong> Premium pricing signals expertise and results</p>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  </div>

                  {/* AI Boost - Price Architect */}
                  <div className="mt-8 pt-6 border-t">
                    <h4 className="text-lg font-bold mb-4">🤖 AI BOOST - Price Architect</h4>
                    <AIPromptCard
                      title="Price Architect"
                      prompt={`You are a pricing consultant. Set my price for profit and psychology.

My costs: Fixed $[amount] + Variable $[per unit]
Competitor prices: [list 3]
Target customer budget: [range]
Value proposition: [transformation]
Brand type: [Business/Product/Service/Personal]

AVOID:
- Race-to-the-bottom pricing strategies
- Complex tiering that confuses customers

DELIVER:
- OPTIMAL PRICE: $[amount] because [psychological reasoning]
- THREE-TIER STRUCTURE: ENTRY/STANDARD/PREMIUM with pricing logic
- OBJECTION RESPONSE: [Top price concern] → [Your answer]
- TEST PLAN: [2-week experiment to validate]`}
                    />
                  </div>
                </div>

                {/* 2.3 Place & Distribution Strategy */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-4">2.3 Place & Distribution Strategy (10 min)</h3>
                  <p className="text-sm text-muted-foreground mb-6">Where and how customers access you</p>

                  <div className="bg-accent/5 border-l-4 border-accent p-4 rounded mb-6">
                    <p className="text-sm font-medium">
                      💡 <strong>Why This Matters:</strong> The best product at the right price means nothing if customers can't easily find and buy it. Your distribution strategy determines accessibility and experience.
                    </p>
                  </div>

                  <div className="bg-muted/30 border-l-4 border-muted-foreground p-4 rounded mb-6">
                    <p className="text-sm font-medium">
                      💡 <strong>New to This?</strong> "Place" = where/how customers can buy from you. More channels ≠ better. Start with one, master it, then expand.
                    </p>
                  </div>

                  <h4 className="font-semibold mb-4">Channel ROI Decision Tree (Proprietary)</h4>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border p-3 text-left font-semibold">Channel</th>
                          <th className="border p-3 text-left font-semibold">Setup Time</th>
                          <th className="border p-3 text-left font-semibold">Monthly Cost</th>
                          <th className="border p-3 text-left font-semibold">Conversion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          "Website",
                          "Social Commerce",
                          "Marketplace (Amazon/Etsy)",
                          "Physical Location",
                          "Partners/Affiliates",
                          "Events",
                        ].map((channel, i) => (
                          <tr key={i} className="hover:bg-muted/50">
                            <td className="border p-3 font-medium">{channel}</td>
                            <td className="border p-3">
                              <Input className="h-8" placeholder="Hours" />
                            </td>
                            <td className="border p-3">
                              <Input className="h-8" placeholder="$" />
                            </td>
                            <td className="border p-3">
                              <select className="h-8 w-full rounded-md border border-input bg-background px-2 text-sm">
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold mb-3">Exercise (10 min): Channel Audit</h4>
                    <ol className="text-sm space-y-1 ml-4">
                      <li>1. List everywhere customers can buy</li>
                      <li>2. Track last month's sales by channel</li>
                      <li>3. Calculate profit by channel</li>
                      <li>4. Double down on #1, cut bottom performer</li>
                    </ol>
                  </div>

                  <div className="bg-accent/10 border-l-4 border-accent p-4 rounded mb-6">
                    <p className="text-sm font-medium">
                      💡 <strong>Quick Win:</strong> Double down on highest ROI channel, cut lowest performer.
                    </p>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold mb-2">🚨 Troubleshooting:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Too many options?</strong> → Start with where your customers already buy similar products</li>
                      <li>• <strong>No online presence?</strong> → Begin with free social media, then simple website</li>
                      <li>• <strong>Can't afford multiple channels?</strong> → Master ONE before adding another</li>
                    </ul>
                  </div>

                  <div className="bg-accent/10 border-l-4 border-accent p-4 rounded mb-6">
                    <h4 className="font-semibold mb-2">Solo Founder Shortcuts:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Free:</strong> Social media + Google My Business</li>
                      <li>• <strong>Low-cost:</strong> Simple website (Squarespace/Wix) + one marketplace</li>
                      <li>• <strong>When ready:</strong> Add partnerships and paid advertising</li>
                    </ul>
                  </div>

                  {/* Place Examples */}
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Examples:</h4>
                    
                    <Collapsible>
                      <Card className="p-6 mb-4 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h5 className="font-semibold">🏪 Brick-and-Mortar Brand - FreshStart Café</h5>
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-4 space-y-2 text-sm">
                            <p><strong>Primary:</strong> Physical location with pickup lane</p>
                            <p><strong>Secondary:</strong> Pre-order app for convenience</p>
                            <p><strong>Growth:</strong> Catering partnerships with local businesses</p>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    <Collapsible>
                      <Card className="p-6 mb-4 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h5 className="font-semibold">🎯 Service Brand - Business Coach</h5>
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-4 space-y-2 text-sm">
                            <p><strong>Primary:</strong> LinkedIn for thought leadership and direct outreach</p>
                            <p><strong>Secondary:</strong> Referral partnerships with complementary coaches</p>
                            <p><strong>Growth:</strong> Speaking at industry events and podcasts</p>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    <Collapsible>
                      <Card className="p-6 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h5 className="font-semibold">👤 Personal Brand - Marketing Executive</h5>
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-4 space-y-2 text-sm">
                            <p><strong>Primary:</strong> LinkedIn thought leadership and networking</p>
                            <p><strong>Secondary:</strong> Industry conference speaking</p>
                            <p><strong>Growth:</strong> Executive search firm relationships</p>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  </div>

                  {/* AI Boost - Distribution Designer */}
                  <div className="mt-8 pt-6 border-t">
                    <h4 className="text-lg font-bold mb-4">🤖 AI BOOST - Distribution Designer</h4>
                    <AIPromptCard
                      title="Distribution Designer"
                      prompt={`You are a distribution strategist. Recommend optimal channels:

My product/service: [description]
Customer demographics: [age, location, behavior]
Current channels: [what I use now]
Budget: $[amount]/month
Brand type: [Business/Product/Service/Personal]

Provide:
1. Top 3 channels for my business type
2. Implementation sequence (easiest first)
3. Expected ROI and conversion rates
4. Free alternatives for each`}
                    />
                  </div>
                </div>

                {/* 2.4 Promotion Strategy */}
                <div className="mt-12">
                  <h3 className="text-xl font-bold mb-4">2.4 Promotion Strategy (15 min)</h3>
                  <p className="text-sm text-muted-foreground mb-6">How you reach and convert</p>

                  <div className="bg-accent/5 border-l-4 border-accent p-4 rounded mb-6">
                    <p className="text-sm font-medium">
                      💡 <strong>Why This Matters:</strong> Even the best product needs promotion. Your strategy ensures the right people know about you at the right time through the right channels.
                    </p>
                  </div>

                  <h4 className="font-semibold mb-4">Channel Selection (Pick 3-4 to start)</h4>
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    <label className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 cursor-pointer">
                      <input type="checkbox" />
                      <span className="text-sm">Content marketing (blog/video)</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 cursor-pointer">
                      <input type="checkbox" />
                      <span className="text-sm">Social media</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 cursor-pointer">
                      <input type="checkbox" />
                      <span className="text-sm">Email marketing</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 cursor-pointer">
                      <input type="checkbox" />
                      <span className="text-sm">Paid ads (Google/Facebook)</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 cursor-pointer">
                      <input type="checkbox" />
                      <span className="text-sm">Networking/partnerships</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 cursor-pointer">
                      <input type="checkbox" />
                      <span className="text-sm">SEO/local search</span>
                    </label>
                  </div>

                  <h4 className="font-semibold mb-4">Content Pillars (3-5 topics you'll always discuss)</h4>
                  <p className="text-sm text-muted-foreground mb-4">Based on Workbook 1, from your Brand Pillars, create content themes:</p>
                  <div className="space-y-3 mb-6">
                    <div>
                      <Label htmlFor="content-pillars">Your Content Pillars</Label>
                      <Input 
                        id="content-pillars" 
                        placeholder="e.g., Strategy, Systems, Scaling, Stories"
                        value={data.contentPillars}
                        onChange={(e) => updateData('contentPillars', e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="primary-platform">Primary Platform</Label>
                        <Input 
                          id="primary-platform" 
                          placeholder="e.g., LinkedIn"
                          value={data.primaryPlatform}
                          onChange={(e) => updateData('primaryPlatform', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="content-mix">Content Mix %</Label>
                        <Input id="content-mix" placeholder="60% Educational, 30% Inspirational, 10% Promotional" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent/10 border-l-4 border-accent p-4 rounded mb-6">
                    <h4 className="font-semibold mb-2">Content Repurposing Matrix (BLKBLD Proprietary - One Post = 9 Assets)</h4>
                    <div className="text-sm space-y-1">
                      <p>• <strong>1 Blog Post</strong> → 5 Social posts + 1 Email + 3 Stories</p>
                      <p>• <strong>1 Video</strong> → 10 Short clips + 1 Podcast + Blog + Social posts</p>
                      <p>• <strong>1 Webinar</strong> → 20 Tips + Email series + Course + Social content</p>
                    </div>
                  </div>

                  <h4 className="font-semibold mb-4">30-Day Content Calendar Template</h4>
                  <div className="overflow-x-auto mb-6">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border p-3 text-left font-semibold">Week</th>
                          <th className="border p-3 text-left font-semibold">Mon</th>
                          <th className="border p-3 text-left font-semibold">Wed</th>
                          <th className="border p-3 text-left font-semibold">Fri</th>
                          <th className="border p-3 text-left font-semibold">Focus</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border p-3">1</td>
                          <td className="border p-3 text-muted-foreground">Educational</td>
                          <td className="border p-3 text-muted-foreground">Behind-the-scenes</td>
                          <td className="border p-3 text-muted-foreground">Inspirational</td>
                          <td className="border p-3 text-muted-foreground">60% Value, 40% Promotion</td>
                        </tr>
                        <tr>
                          <td className="border p-3">2</td>
                          <td className="border p-3 text-muted-foreground">Community</td>
                          <td className="border p-3 text-muted-foreground">Educational</td>
                          <td className="border p-3 text-muted-foreground">Promotional</td>
                          <td className="border p-3 text-muted-foreground">Focus on engagement</td>
                        </tr>
                        <tr>
                          <td className="border p-3">3</td>
                          <td className="border p-3 text-muted-foreground">Inspirational</td>
                          <td className="border p-3 text-muted-foreground">Behind-the-scenes</td>
                          <td className="border p-3 text-muted-foreground">Educational</td>
                          <td className="border p-3 text-muted-foreground">Build trust</td>
                        </tr>
                        <tr>
                          <td className="border p-3">4</td>
                          <td className="border p-3 text-muted-foreground">Promotional</td>
                          <td className="border p-3 text-muted-foreground">Community</td>
                          <td className="border p-3 text-muted-foreground">Educational</td>
                          <td className="border p-3 text-muted-foreground">Convert warm audience</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold mb-2">🚨 Troubleshooting:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>"Overwhelmed by content?"</strong> → Pick ONE platform, post 2x/week maximum</li>
                      <li>• <strong>"No engagement?"</strong> → Ask questions, respond to every comment within 4 hours</li>
                      <li>• <strong>"Running out of ideas?"</strong> → Survey audience monthly: "What's your biggest challenge with _____?"</li>
                    </ul>
                  </div>

                  <div className="bg-accent/10 border-l-4 border-accent p-4 rounded mb-6">
                    <p className="text-sm font-medium">
                      💡 <strong>Quick Win:</strong> Batch create 1 month of content in 4 hours. Use templates and repurpose everything. One blog post = 5 social posts + 1 email + 3 stories
                    </p>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold mb-2">What If I Don't Have:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Time for daily posts?</strong> → Schedule weekly, batch monthly</li>
                      <li>• <strong>Design skills?</strong> → Use Canva templates + brand colors from Workbook 1</li>
                      <li>• <strong>Video equipment?</strong> → Phone + good lighting + quiet space = professional enough</li>
                    </ul>
                  </div>

                  {/* Promotion Examples */}
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Examples:</h4>
                    
                    <Collapsible>
                      <Card className="p-6 mb-4 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h5 className="font-semibold">🏪 Brick-and-Mortar Brand - FreshStart Café</h5>
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-4 space-y-2 text-sm">
                            <p><strong>Channels:</strong> Instagram (food photos), Facebook (community), email (weekly specials)</p>
                            <p><strong>Calendar:</strong> 60% health tips, 20% behind-the-scenes, 20% menu promotion</p>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    <Collapsible>
                      <Card className="p-6 mb-4 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h5 className="font-semibold">🎯 Service Brand - Business Coach</h5>
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-4 space-y-2 text-sm">
                            <p><strong>Content Pillars:</strong> System building, entrepreneur stories, productivity tips</p>
                            <p><strong>Channels:</strong> LinkedIn (thought leadership)</p>
                            <p><strong>Calendar:</strong> 70% education, 15% client stories, 15% program promotion</p>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    <Collapsible>
                      <Card className="p-6 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h5 className="font-semibold">👤 Personal Brand - Marketing Executive</h5>
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-4 space-y-2 text-sm">
                            <p><strong>Channels:</strong> LinkedIn (daily posts), Medium (long-form)</p>
                            <p><strong>Content Pillars:</strong> Marketing frameworks, B2B growth case studies, industry insights</p>
                            <p><strong>Calendar:</strong> 80% education/insights, 10% case studies, 10% availability/expertise</p>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  </div>

                  {/* AI Boost - Content Calendar */}
                  <div className="mt-8 pt-6 border-t">
                    <h4 className="text-lg font-bold mb-4">🤖 AI BOOST - Content Calendar</h4>
                    <AIPromptCard
                      title="Content Calendar"
                      prompt={`You are a content strategist. Create my 30-day calendar that converts.

My business: [what you do]
Brand pillars: [from Workbook 1]
Brand voice: [from Workbook 1]
Product/service: [what you offer]
Target audience: [who + their pain]
Platform: [Instagram/LinkedIn/TikTok]
Brand type: [Business/Product/Service/Personal]

REQUIREMENTS:
- 80% value, 20% promotion ratio
- Each post must serve a purpose in customer journey
- Include engagement triggers and calls-to-action
- Content must be batch-creatable in 4 hours

OUTPUT:
- CONTENT PILLARS: [4 themes] + [% split] + [Customer journey stage each serves]
- 30-DAY CALENDAR: [2 posts per week with titles, hooks, and CTAs]
- HASHTAG STRATEGY: [3 hashtags in tiers: High/Medium/Low competition]
- REPURPOSING MAP: [How to turn each post into 3 additional assets]`}
                    />
                  </div>
                </div>

                {/* Section 2 Checkpoint */}
                <div className="mt-12 bg-primary/10 border-2 border-primary p-6 rounded-lg">
                  <h4 className="font-bold mb-3">Section 2 Checkpoint ✓</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Product ladder defined with "good enough" standards</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Pricing strategy set with break-even calculated</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Distribution channels mapped and prioritized</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>3-4 promotion channels selected</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>30-day content calendar created</span>
                    </label>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Congratulations Section */}
        <Collapsible>
          <Card className="p-8 mb-8 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-2 border-primary">
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center gap-4 mb-4 justify-between hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-4">
                  <PartyPopper className="w-12 h-12 text-primary" />
                  <div className="text-left">
                    <h2 className="text-2xl font-bold">Congratulations! 🎉</h2>
                    <p className="text-muted-foreground">You've completed Workbook 2</p>
                  </div>
                </div>
                <ChevronDown className="h-6 w-6 transition-transform duration-200" />
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="space-y-3">
                <p className="text-lg">
                  Your <strong>marketing strategy</strong> is built! You now have a complete roadmap to turn your brand foundation into revenue.
                </p>
                <div className="bg-background/50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">What You've Accomplished:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✅</span>
                      <span>Mapped your business model and validated alignment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✅</span>
                      <span>Completed 5C market analysis for strategic positioning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✅</span>
                      <span>Developed your 4P marketing mix (Product, Price, Place, Promotion)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✅</span>
                      <span>Created a 30-day content calendar ready to execute</span>
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  Next up: Workbook 3 will automate your customer journey and build systems that turn leads into loyal advocates.
                </p>
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

        <div className="flex justify-between">
          <Button variant="outline" size="lg" asChild>
            <a href="/workbook/1">← Back to Workbook 1</a>
          </Button>
          <Button variant="hero" size="lg" asChild>
            <a href="/workbook/3">Continue to Workbook 3: Customer Journey →</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
