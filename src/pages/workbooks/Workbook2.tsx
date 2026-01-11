import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { WorkbookHeader } from "@/components/WorkbookHeader";
import { AIPromptCard } from "@/components/AIPromptCard";
import { ProtectedWorkbook } from "@/components/ProtectedWorkbook";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, PartyPopper, Save, Download } from "lucide-react";
import { useWorkbook } from "@/contexts/WorkbookContext";
import { generateWorkbook2Content, downloadWorkbook } from "@/utils/workbookDownload";
import { useAuth } from "@/contexts/AuthContext";
import { MarketingStrategy } from "@/components/MarketingStrategy";

export default function Workbook2() {
  const { data, updateData } = useWorkbook();
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const [isSaving, setIsSaving] = useState(false);
  
  // Local state for fields not in WorkbookContext - load from localStorage
  const [localData, setLocalData] = useState(() => {
    const saved = localStorage.getItem('workbook2LocalData');
    const defaultData = {
      keyResources: '',
      costStructure: '',
      bigOpportunity: '',
      primarySegment: '',
      checkpoints: { canvasComplete: false, canvasValidated: false, marketComplete: false, marketValidated: false, strategyComplete: false }
    };
    if (saved) {
      try {
        return { ...defaultData, ...JSON.parse(saved) };
      } catch {
        return defaultData;
      }
    }
    return defaultData;
  });

  // Save localData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('workbook2LocalData', JSON.stringify(localData));
  }, [localData]);

  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => setIsSaving(false), 1000);
    return () => clearTimeout(timer);
  }, [data, localData]);

  const handleManualSave = () => {
    localStorage.setItem('workbookData', JSON.stringify(data));
    localStorage.setItem('workbook2LocalData', JSON.stringify(localData));
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  const handleDownload = () => {
    const content = generateWorkbook2Content(data);
    downloadWorkbook(content, 2);
  };

  return (
    <ProtectedWorkbook
      productType="workbook_2"
      priceId="price_1SHBiiAnYzcngRwozXR4UtDC"
      price={9700}
      workbookTitle="Workbook 2 - Marketing Strategy Execution"
    >
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

          <h3 className="text-xl font-semibold mb-3">✅ Prerequisites</h3>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li>• Completed Workbook 1 (Brand Strategy Foundation)</li>
            <li>• 5-10 hours of focused time</li>
            <li>• Access to competitive research tools (Google, social platforms)</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">What You'll Walk Away With</h3>
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

          <div className="bg-muted/50 border-l-4 border-muted-foreground p-4 rounded mb-6">
            <p className="font-semibold mb-2">🔗 Bridge to Success - The Complete BLKBLD Journey:</p>
            <ul className="text-sm space-y-1">
              <li>WORKBOOK 0: Market opportunity validated</li>
              <li>WORKBOOK 1: Brand foundation built</li>
              <li className="font-semibold text-primary">WORKBOOK 2: Strategic marketing system (you're here!)</li>
              <li>→ WORKBOOK 3: Automated customer experience</li>
              <li>→ WORKBOOK 4: Data-driven optimization and scaling</li>
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

        {/* SECTION 1: Business Model Canvas */}
        <Collapsible defaultOpen={true}>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <div className="hover:opacity-80 transition-opacity">
                <h2 className="text-2xl font-bold mb-2 pb-3 border-b flex items-center justify-between">
                  <span>Step 1 of 3: Business Model Canvas</span>
                  <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
                </h2>
                <p className="text-sm text-muted-foreground mt-2 text-left">Map Your Business Reality</p>
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>

              <div className="space-y-6 mt-6">
                <div className="bg-accent/5 border-l-4 border-accent p-4 rounded">
                  <p className="text-sm font-medium">
                    <strong>Why This Matters:</strong> Your brand promise from Workbook 1 must align with business reality. This canvas ensures marketing promises match what you can actually deliver.
                  </p>
                </div>

                <div className="bg-muted/30 border-l-4 border-muted-foreground p-4 rounded">
                  <p className="text-sm font-medium">
                    💡 <strong>New to This?</strong> A Business Model Canvas maps how your business creates, delivers, and captures value. Think of it as a one-page business plan.
                  </p>
                </div>

                {/* Sprint 1 */}
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">
                    1
                  </span>
                  Sprint 1: Core Elements
                </h3>
                <Card className="p-6 bg-muted/20 mb-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="customer-segments">Customer Segments</Label>
                      <p className="text-xs text-muted-foreground mb-2">Who needs you most?</p>
                      <Textarea 
                        id="customer-segments" 
                        rows={2}
                        value={data.customerSegments || ""}
                        onChange={(e) => updateData('customerSegments', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="value-prop">Value Proposition</Label>
                      <p className="text-xs text-muted-foreground mb-2">What problem do you solve?</p>
                      <Textarea 
                        id="value-prop" 
                        rows={2}
                        value={data.valueProposition || ""}
                        onChange={(e) => updateData('valueProposition', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="channels">Channels</Label>
                      <p className="text-xs text-muted-foreground mb-2">How do they find/buy from you?</p>
                      <Textarea 
                        id="channels" 
                        rows={2}
                        value={data.primaryChannel || ""}
                        onChange={(e) => updateData('primaryChannel', e.target.value)}
                      />
                    </div>
                  </div>
                </Card>

                {/* Sprint 2 */}
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">
                    2
                  </span>
                  Sprint 2: Operations
                </h3>
                <Card className="p-6 bg-muted/20 mb-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="key-resources">Key Resources</Label>
                      <p className="text-xs text-muted-foreground mb-2">What do you need to operate?</p>
                      <Textarea 
                        id="key-resources" 
                        rows={2}
                        value={localData.keyResources || ''}
                        onChange={(e) => setLocalData(prev => ({ ...prev, keyResources: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="key-activities">Key Activities</Label>
                      <p className="text-xs text-muted-foreground mb-2">What must happen daily?</p>
                      <Textarea 
                        id="key-activities" 
                        rows={2}
                        value={data.keyActivities || ""}
                        onChange={(e) => updateData('keyActivities', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="revenue-streams">Revenue Streams</Label>
                      <p className="text-xs text-muted-foreground mb-2">How do you make money?</p>
                      <Textarea 
                        id="revenue-streams" 
                        rows={2}
                        value={data.revenueStreams || ""}
                        onChange={(e) => updateData('revenueStreams', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cost-structure">Cost Structure</Label>
                      <p className="text-xs text-muted-foreground mb-2">What are the biggest expenses?</p>
                      <Textarea 
                        id="cost-structure" 
                        rows={2}
                        value={localData.costStructure || ''}
                        onChange={(e) => setLocalData(prev => ({ ...prev, costStructure: e.target.value }))}
                      />
                    </div>
                  </div>
                </Card>

                <div className="bg-gold/10 border-l-4 border-gold p-4 rounded mb-6">
                  <p className="text-sm font-medium">
                    💡 <span className="text-gold">Quick Win:</span> Overwhelmed? Only fill 'Value Prop' and 'Customer Segments' first.
                  </p>
                </div>

                {/* Bridge Check */}
                <div className="bg-primary/10 border-l-4 border-primary p-4 rounded mb-6">
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
                <h3 className="text-xl font-bold mb-4">Examples Across Three Brand Types:</h3>
                <div className="space-y-4">
                  <Collapsible>
                    <Card className="p-6 mb-4 bg-muted/20">
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                          <h4 className="font-semibold flex items-center gap-2">
                            💼 Brick-and-Mortar Brand - FreshStart Café
                          </h4>
                          <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-4 space-y-2 text-sm">
                          <p><strong>Customer Segments:</strong> Busy Phoenix families with kids</p>
                          <p><strong>Value Proposition:</strong> Healthy breakfast</p>
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
                          <p><strong>Revenue Streams:</strong> Coaching + group programs + workshops</p>
                          <p><strong>Value Proposition:</strong> Systematic marketing frameworks for predictable scale</p>
                          <p><strong>Customer Segments:</strong> Overwhelmed solopreneurs ($50K-$200K revenue)</p>
                          <p><strong>Channels:</strong> LinkedIn thought leadership + conference speaking + industry networks</p>
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
                          <p><strong>Revenue Streams:</strong> Salary advancement + consulting opportunities + speaking fees</p>
                          <p><strong>Customer Segments:</strong> B2B SaaS CEOs struggling with unpredictable growth</p>
                        </div>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                </div>

                {/* AI Boost */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-xl font-bold mb-4">🤖 AI BOOST - Canvas Optimizer</h3>
                  <AIPromptCard
                    title="Canvas Optimizer"
                    prompt={`You are a senior business model strategist. Analyze this canvas and provide ACTIONABLE insights:

My business model: [Paste your canvas elements] | Brand type: [Business/Product/Service/Personal]

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
4. PARTNERSHIP IDEA: [Low-cost, high-impact suggestion] + [How to approach]

Cite your sources for each claim in your response. Flag any assumptions, inferences, or gaps you filled in without direct evidence.`}
                  />
                </div>

                {/* Section 1 Checkpoint */}
                <div className="mt-8 p-6 bg-primary/10 border-l-4 border-primary rounded">
                  <h4 className="font-semibold mb-3">Section 1 Checkpoint ✓</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Business Model Canvas complete</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Business Model Canvas validated</span>
                    </label>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* SECTION 2: Consolidated Market Intelligence Sprint */}
        <Collapsible defaultOpen={false}>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <div className="hover:opacity-80 transition-opacity">
                <h2 className="text-2xl font-bold mb-2 pb-3 border-b flex items-center justify-between">
                  <span>Step 2 of 3: Consolidated Market Intelligence Sprint</span>
                  <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
                </h2>
                <p className="text-sm text-muted-foreground mt-2 text-left">Your Complete Market Reality</p>
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>

              <div className="space-y-6 mt-6">
                <div className="bg-accent/5 border-l-4 border-accent p-4 rounded">
                  <p className="text-sm font-medium">
                    <strong>Why This Matters:</strong> You can't win a game you don't understand. The 5Cs give you a 360-degree view of your market landscape. The STP Framework helps you focus resources where they'll have maximum impact, rather than trying to serve everyone and serving no one well.
                  </p>
                </div>

            <div className="bg-muted/30 border-l-4 border-muted-foreground p-4 rounded">
              <p className="text-sm font-medium">
                💡 <strong>New to This?</strong> The Market Intelligence Framework
              </p>
            </div>

            {/* 5C Framework */}
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">
                1
              </span>
              5 Min 5C Rapid Scan
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="company">Company - Your top 3 strengths (Double down here)</Label>
                <Textarea 
                  id="company" 
                  rows={2}
                  value={data.companyStrengths || ""}
                  onChange={(e) => updateData('companyStrengths', e.target.value)}
                  placeholder="What are you uniquely good at?"
                />
              </div>
              <div>
                <Label htmlFor="category">Category - Market size & growth (Ride this trend)</Label>
                <Textarea 
                  id="category" 
                  rows={2}
                  value={data.categoryOpportunity || ""}
                  onChange={(e) => updateData('categoryOpportunity', e.target.value)}
                  placeholder="What trends are happening in your industry?"
                />
              </div>
              <div>
                <Label htmlFor="customer">Customer - Their top 3 unmet needs (Fill this gap)</Label>
                <Textarea 
                  id="customer" 
                  rows={2}
                  value={data.customerInsights || ""}
                  onChange={(e) => updateData('customerInsights', e.target.value)}
                  placeholder="What problems aren't being solved well?"
                />
              </div>
              <div>
                <Label htmlFor="competition">Competition - What they all miss (Your opportunity)</Label>
                <Textarea 
                  id="competition" 
                  rows={2}
                  value={data.competitionGap || ""}
                  onChange={(e) => updateData('competitionGap', e.target.value)}
                  placeholder="What is everyone in your industry doing wrong?"
                />
              </div>
              <div>
                <Label htmlFor="context">Context - One trend to ride (Timing advantage)</Label>
                <Textarea 
                  id="context" 
                  rows={2}
                  value={data.contextTrend || ""}
                  onChange={(e) => updateData('contextTrend', e.target.value)}
                  placeholder="What external trends can you leverage?"
                />
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="big-opportunity">The Big Opportunity</Label>
              <p className="text-sm text-muted-foreground mb-2">Based on all 5Cs, what opportunity emerges?</p>
              <Textarea 
                id="big-opportunity" 
                rows={3} 
                placeholder="Your strategic opportunity..." 
                value={localData.bigOpportunity || ''}
                onChange={(e) => setLocalData(prev => ({ ...prev, bigOpportunity: e.target.value }))}
              />
            </div>

            {/* Segmentation & Targeting */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  2
                </span>
                Segmentation & Targeting
              </h3>
              <p className="text-sm text-muted-foreground mb-4">Your Target Audience</p>
              <div className="bg-muted/20 p-4 rounded">
                <p className="text-sm mb-2">Primary Segment: <span className="text-xs text-muted-foreground">(Should have highest pain + budget for your product/service + reachable)</span></p>
                <Input 
                  placeholder="e.g., Busy parents with household income $75K+" 
                  value={localData.primarySegment || ''}
                  onChange={(e) => setLocalData(prev => ({ ...prev, primarySegment: e.target.value }))}
                />
              </div>
            </div>

            {/* Examples */}
            <h3 className="text-xl font-bold mb-4 mt-6">Examples:</h3>
            <div className="space-y-4">
              <Collapsible>
                <Card className="p-6 mb-4 bg-muted/20">
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                      <h4 className="font-semibold flex items-center gap-2">
                        💼 Brick-and-Mortar Brand - FreshStart Café
                      </h4>
                      <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-4 space-y-2 text-sm">
                      <p><strong>Segments:</strong> Busy parents, remote workers, health-conscious seniors</p>
                      <p><strong>Target:</strong> Busy parents (highest frequency + willingness to pay)</p>
                      <p><strong>Positioning:</strong> "For busy Phoenix parents who struggle with morning chaos, FreshStart is the neighborhood café that guarantees healthy breakfasts in under 5 minutes because of our chef-made meals and dedicated pickup lane."</p>
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
                      <p><strong>Segments:</strong> New entrepreneurs, overwhelmed solopreneurs, scaling CEOs</p>
                      <p><strong>Target:</strong> Overwhelmed solopreneurs (ready to invest, highest pain)</p>
                      <p><strong>Positioning:</strong> "For overwhelmed solopreneurs who want to scale without burning out, I'm the business coach who builds profitable systems in 90 days because I've systematized 5 businesses without the overwhelm."</p>
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
                      <p><strong>Segments:</strong> Startup CEOs, scale-up founders, marketing VPs</p>
                      <p><strong>Target:</strong> B2B SaaS scale-up CEOs (hiring decision makers, budget available)</p>
                      <p><strong>Positioning:</strong> "For B2B SaaS CEOs who struggle with unpredictable growth, I'm the marketing executive who delivers systematic scale because I've led 3 companies from $1M to $10M ARR using proven frameworks."</p>
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            </div>

            {/* AI Boost - Market Intelligence */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-xl font-bold mb-4">🤖 AI BOOST - Market Intelligence</h3>
              <AIPromptCard
                title="Market Intelligence"
                prompt={`You are a market research analyst specializing in small business strategy. Help me find my best opportunity.

My industry: [type] | My strengths: [3 things] | Budget: Under $5K | Competition: [names] | Brand type: [Business/Product/Service/Personal] | Target Audience: [from Workbook 1]

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
- Conclude with: 'Start with [specific audience] because [compelling reason].'

Cite your sources for each claim in your response. Flag any assumptions, inferences, or gaps you filled in without direct evidence.`}
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

            {/* Section 2 Checkpoint */}
            <div className="mt-8 p-6 bg-primary/10 border-l-4 border-primary rounded">
              <h4 className="font-semibold mb-3">Section 2 Checkpoint ✓</h4>
              <div className="space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Market opportunity identified</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Primary target segment chosen</span>
                </label>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>

        {/* SECTION 3: 4P Marketing Mix */}
        <Collapsible defaultOpen={false}>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <div className="hover:opacity-80 transition-opacity">
                <h2 className="text-2xl font-bold mb-2 pb-3 border-b flex items-center justify-between">
                  <span>Step 3 of 3: 4P Marketing Mix</span>
                  <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
                </h2>
                <p className="text-sm text-muted-foreground mt-2 text-left">Strategic Marketing Execution</p>
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="space-y-6 mt-6">
                <div className="bg-accent/5 border-l-4 border-accent p-4 rounded">
                  <p className="text-sm font-medium">
                    <strong>Why This Section Matters:</strong> The 4Ps are your controllable levers: Product (what you sell), Price (what you charge), Place (where/how delivered), Promotion (how people find you). Get these aligned and marketing becomes systematic, not random.
                  </p>
                </div>

                {/* 3.1 Product Strategy */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">
                      1
                    </span>
                    Product Strategy <span className="text-sm text-muted-foreground font-normal ml-2">What you're really selling</span>
                  </h3>

                  <div className="bg-muted/30 border-l-4 border-muted-foreground p-4 rounded mb-6">
                    <p className="text-sm font-medium">
                      💡 <strong>New to This?</strong> People don't buy products—they buy transformations. Your "product" is the change you create.
                    </p>
                  </div>

                  <h4 className="text-lg font-semibold mb-4">Value Ladder Design</h4>
                  <Card className="p-6 bg-muted/20 mb-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="value-ladder-free">Free Offer</Label>
                          <p className="text-xs text-muted-foreground mb-2">Purpose: Attract leads | Good Enough: Gets 100% downloads</p>
                          <Input 
                            id="value-ladder-free" 
                            placeholder="e.g., Free checklist, guide"
                            value={data.valueLadder?.free || ""}
                            onChange={(e) => updateData('valueLadder', { ...data.valueLadder, free: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="value-ladder-entry">Entry ($)</Label>
                          <p className="text-xs text-muted-foreground mb-2">Purpose: Validate interest | Good Enough: 10% conversion</p>
                          <Input id="value-ladder-entry" placeholder="e.g., $27 mini-course" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="value-ladder-core">Core ($$)</Label>
                          <p className="text-xs text-muted-foreground mb-2">Purpose: Generate profit | Good Enough: Covers all costs + 30%</p>
                          <Input 
                            id="value-ladder-core" 
                            placeholder="e.g., $497 program"
                            value={data.valueLadder?.core || ""}
                            onChange={(e) => updateData('valueLadder', { ...data.valueLadder, core: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="value-ladder-premium">Premium ($$$)</Label>
                          <p className="text-xs text-muted-foreground mb-2">Purpose: Maximize value | Good Enough: 3X core price</p>
                          <Input id="value-ladder-premium" placeholder="e.g., $1,497 VIP" />
                        </div>
                      </div>
                    </div>
                  </Card>

                  <h4 className="text-lg font-semibold mb-4">Feature-Emotion-Transformation Map</h4>
                  <Card className="p-6 bg-muted/20 mb-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="feature">Feature</Label>
                        <p className="text-xs text-muted-foreground mb-2">What you provide</p>
                        <Input id="feature" placeholder="e.g., 5-minute chef-made breakfast" />
                      </div>
                      <div>
                        <Label htmlFor="benefit">Benefit</Label>
                        <p className="text-xs text-muted-foreground mb-2">Immediate value</p>
                        <Input id="benefit" placeholder="e.g., Save time, eat healthy" />
                      </div>
                      <div>
                        <Label htmlFor="transformation">Transformation</Label>
                        <p className="text-xs text-muted-foreground mb-2">Life/business change</p>
                        <Input id="transformation" placeholder="e.g., Stress-free mornings, family connection" />
                      </div>
                      <div>
                        <Label htmlFor="emotion">Emotion</Label>
                        <p className="text-xs text-muted-foreground mb-2">How they feel</p>
                        <Input id="emotion" placeholder="e.g., Calm, energized, confident" />
                      </div>
                    </div>
                  </Card>

                  {/* Product Examples */}
                  <h4 className="text-lg font-semibold mb-4">Examples:</h4>
                  <div className="space-y-4">
                    <Collapsible>
                      <Card className="p-6 mb-4 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h4 className="font-semibold flex items-center gap-2">
                              💼 Brick-and-Mortar Brand - FreshStart Café
                            </h4>
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
                            <h4 className="font-semibold flex items-center gap-2">
                              🎯 Service Brand - Business Coach
                            </h4>
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
                  </div>
                </div>

                {/* 3.2 Pricing Strategy */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">
                      2
                    </span>
                    Pricing Strategy <span className="text-sm text-muted-foreground font-normal ml-2">What you charge and why</span>
                  </h3>

                  <div className="bg-accent/5 border-l-4 border-accent p-4 rounded mb-6">
                    <p className="text-sm font-medium">
                      <strong>Why This Matters:</strong> Price is the only P that generates revenue—everything else costs money. Your pricing signals quality and determines profitability.
                    </p>
                  </div>

                  <div className="bg-muted/30 border-l-4 border-muted-foreground p-4 rounded mb-6">
                    <p className="text-sm font-medium mb-2">💡 <strong>New to This?</strong></p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>CAC</strong> = Customer Acquisition Cost (what you spend to get one customer)</li>
                      <li>• <strong>LTV</strong> = Lifetime Value (total revenue from one customer)</li>
                      <li>• <strong>Margin</strong> = Profit percentage after all costs</li>
                    </ul>
                  </div>

                  <h4 className="text-lg font-semibold mb-4">Pricing Model Selection</h4>
                  <Card className="p-6 bg-muted/20 mb-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>One-time purchase</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Subscription/recurring</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Tiered (good/better/best)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Usage-based</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Project/package</span>
                      </label>
                    </div>
                  </Card>

                  <h4 className="text-lg font-semibold mb-4">Break-Even Analysis Must-Do</h4>
                  <Card className="p-6 bg-muted/20 mb-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fixed-costs">Fixed costs/month</Label>
                          <Input 
                            id="fixed-costs" 
                            type="number" 
                            placeholder="$0"
                            value={data.fixedCosts || ""}
                            onChange={(e) => updateData('fixedCosts', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="variable-cost">Variable cost per sale</Label>
                          <Input 
                            id="variable-cost" 
                            type="number" 
                            placeholder="$0"
                            value={data.variableCost || ""}
                            onChange={(e) => updateData('variableCost', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="your-price">Your price</Label>
                          <Input 
                            id="your-price" 
                            type="number" 
                            placeholder="$0"
                            value={data.yourPrice || ""}
                            onChange={(e) => updateData('yourPrice', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="breakeven">Break-even units</Label>
                          <Input 
                            id="breakeven" 
                            type="number" 
                            placeholder="per month"
                            value={data.breakEven || ""}
                            onChange={(e) => updateData('breakEven', e.target.value)}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground italic">Formula: Fixed Costs ÷ (Price - Variable Cost) = Units needed</p>
                    </div>
                  </Card>

                  <h4 className="text-lg font-semibold mb-4">Good-Better-Best Tiers</h4>
                  <Card className="p-6 bg-muted/20 mb-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="tier-good">Good - Basic solution</Label>
                        <Input id="tier-good" placeholder="$__" />
                      </div>
                      <div>
                        <Label htmlFor="tier-better">Better - Enhanced features</Label>
                        <Input id="tier-better" placeholder="$__" />
                      </div>
                      <div>
                        <Label htmlFor="tier-best">Best - Premium experience</Label>
                        <Input id="tier-best" placeholder="$__" />
                      </div>
                    </div>
                  </Card>

                  <h4 className="text-lg font-semibold mb-4">Pricing Psychology Trade Secrets</h4>
                  <Card className="p-6 bg-muted/20 mb-6">
                    <ul className="space-y-2 text-sm">
                      <li>• End in 7 or 9 for deals ($19, $99; $27, $97) - signals value</li>
                      <li>• End in 0 for premium ($100, $500) - signals quality</li>
                      <li>• Always show premium first (anchoring)</li>
                      <li>• Bundle complementary items together</li>
                    </ul>
                  </Card>

                  <div className="bg-accent/10 border-l-4 border-accent p-4 rounded mb-6">
                    <p className="text-sm font-medium mb-2"><strong>🚨 Troubleshooting:</strong></p>
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
                  <h4 className="text-lg font-semibold mb-4">Examples:</h4>
                  <div className="space-y-4">
                    <Collapsible>
                      <Card className="p-6 mb-4 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h4 className="font-semibold flex items-center gap-2">
                              💼 Brick-and-Mortar Brand - FreshStart Café
                            </h4>
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
                            <h4 className="font-semibold flex items-center gap-2">
                              🎯 Service Brand - Business Coach
                            </h4>
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
                            <h4 className="font-semibold flex items-center gap-2">
                              👤 Personal Brand - Marketing Executive
                            </h4>
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
                </div>

                {/* 3.3 Place & Distribution Strategy */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-2xl font-bold mb-2">3.3 Place & Distribution Strategy</h3>
                  <p className="text-muted-foreground mb-6">Where and how customers access you</p>

                  <div className="bg-accent/5 border-l-4 border-accent p-4 rounded mb-6">
                    <p className="text-sm font-medium">
                      <strong>Why This Matters:</strong> The best product at the right price means nothing if customers can't easily find and buy it. Your distribution strategy determines accessibility and experience.
                    </p>
                  </div>

                  <div className="bg-muted/30 border-l-4 border-muted-foreground p-4 rounded mb-6">
                    <p className="text-sm font-medium">
                      💡 <strong>New to This?</strong> "Place" = where/how customers can buy from you. More channels ≠ better. Start with one, master it, then expand.
                    </p>
                  </div>

                  <h4 className="text-lg font-semibold mb-4">Channel ROI Decision Tree</h4>
                  <Card className="p-6 bg-muted/20 mb-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left pb-2">Channel</th>
                            <th className="text-left pb-2">Setup Time</th>
                            <th className="text-left pb-2">Monthly Cost</th>
                            <th className="text-left pb-2">Conversion Rate</th>
                            <th className="text-left pb-2">ROI Priority</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs">
                          <tr>
                            <td className="py-2">Website</td>
                            <td><Input className="h-8" placeholder="__" /></td>
                            <td><Input className="h-8" placeholder="$__" /></td>
                            <td><Input className="h-8" placeholder="__%"/></td>
                            <td><Input className="h-8" placeholder="High/Med/Low" /></td>
                          </tr>
                          <tr>
                            <td className="py-2">Social Commerce</td>
                            <td><Input className="h-8" placeholder="__" /></td>
                            <td><Input className="h-8" placeholder="$__" /></td>
                            <td><Input className="h-8" placeholder="__%"/></td>
                            <td><Input className="h-8" placeholder="High/Med/Low" /></td>
                          </tr>
                          <tr>
                            <td className="py-2">Marketplace</td>
                            <td><Input className="h-8" placeholder="__" /></td>
                            <td><Input className="h-8" placeholder="$__" /></td>
                            <td><Input className="h-8" placeholder="__%"/></td>
                            <td><Input className="h-8" placeholder="High/Med/Low" /></td>
                          </tr>
                          <tr>
                            <td className="py-2">Physical Location</td>
                            <td><Input className="h-8" placeholder="__" /></td>
                            <td><Input className="h-8" placeholder="$__" /></td>
                            <td><Input className="h-8" placeholder="__%"/></td>
                            <td><Input className="h-8" placeholder="High/Med/Low" /></td>
                          </tr>
                          <tr>
                            <td className="py-2">Partners/Affiliates</td>
                            <td><Input className="h-8" placeholder="__" /></td>
                            <td><Input className="h-8" placeholder="$__" /></td>
                            <td><Input className="h-8" placeholder="__%"/></td>
                            <td><Input className="h-8" placeholder="High/Med/Low" /></td>
                          </tr>
                          <tr>
                            <td className="py-2">Events</td>
                            <td><Input className="h-8" placeholder="__" /></td>
                            <td><Input className="h-8" placeholder="$__" /></td>
                            <td><Input className="h-8" placeholder="__%"/></td>
                            <td><Input className="h-8" placeholder="High/Med/Low" /></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>

                  <div className="bg-muted/30 p-4 rounded-lg mb-6">
                    <h4 className="font-semibold mb-3">Exercise (10 min): Channel Audit</h4>
                    <ol className="text-sm space-y-1 ml-4">
                      <li>1. List everywhere customers can buy</li>
                      <li>2. Track last month's sales by channel</li>
                      <li>3. Calculate profit by channel</li>
                      <li>4. Double down on #1, cut bottom performer</li>
                    </ol>
                  </div>

                  <div className="bg-gold/10 border-l-4 border-gold p-4 rounded mb-6">
                    <p className="text-sm font-medium">
                      💡 <span className="text-gold">Quick Win:</span> Double down on highest ROI channel, cut lowest performer.
                    </p>
                  </div>

                  <div className="bg-accent/10 border-l-4 border-accent p-4 rounded mb-6">
                    <p className="text-sm font-medium mb-2"><strong>Solo Founder Shortcuts:</strong></p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Free:</strong> Social media + Google My Business</li>
                      <li>• <strong>Low-cost:</strong> Simple website (Squarespace/Wix) + one marketplace</li>
                      <li>• <strong>When ready:</strong> Add partnerships and paid advertising</li>
                    </ul>
                  </div>

                  {/* Distribution Examples */}
                  <h4 className="text-lg font-semibold mb-4">Examples:</h4>
                  <div className="space-y-4">
                    <Collapsible>
                      <Card className="p-6 mb-4 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h4 className="font-semibold flex items-center gap-2">
                              💼 Brick-and-Mortar Brand - FreshStart Café
                            </h4>
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
                            <h4 className="font-semibold flex items-center gap-2">
                              🎯 Service Brand - Business Coach
                            </h4>
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
                            <h4 className="font-semibold flex items-center gap-2">
                              👤 Personal Brand - Marketing Executive
                            </h4>
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
                </div>

                {/* 3.4 Promotion Strategy */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">
                      4
                    </span>
                    Promotion Strategy <span className="text-sm text-muted-foreground font-normal ml-2">How you reach and convert</span>
                  </h3>

                  <div className="bg-accent/5 border-l-4 border-accent p-4 rounded mb-6">
                    <p className="text-sm font-medium">
                      <strong>Why This Matters:</strong> Even the best product needs promotion. Your strategy ensures the right people know about you at the right time through the right channels.
                    </p>
                  </div>

                  <h4 className="text-lg font-semibold mb-4">Channel Selection (Pick 3-4 to start)</h4>
                  <Card className="p-6 bg-muted/20 mb-6">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Content marketing (blog/video)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Social media</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Email marketing</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Paid ads (Google/Facebook)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Networking/partnerships</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>SEO/local search</span>
                      </label>
                    </div>
                  </Card>

                  <h4 className="text-lg font-semibold mb-4">Content Pillars (3-5 topics you'll always discuss)</h4>
                  <p className="text-sm text-muted-foreground mb-4">Based on Workbook 1, from your Brand Pillars, create content themes:</p>
                  <Card className="p-6 bg-muted/20 mb-6">
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="content-pillars">Your Content Pillars</Label>
                        <Textarea 
                          id="content-pillars" 
                          rows={4}
                          placeholder="e.g., 1) Educational: How-to guides&#10;2) Inspirational: Success stories&#10;3) Behind-the-scenes: Process reveals&#10;4) Promotional: Product features&#10;5) Community: User content, Q&A"
                          value={data.contentPillars || ""}
                          onChange={(e) => updateData('contentPillars', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="primary-platform">Primary Platform</Label>
                        <Input 
                          id="primary-platform" 
                          placeholder="e.g., Instagram, LinkedIn, TikTok"
                          value={data.primaryPlatform || ""}
                          onChange={(e) => updateData('primaryPlatform', e.target.value)}
                        />
                      </div>
                    </div>
                  </Card>

                  <h4 className="text-lg font-semibold mb-4">Content Repurposing Matrix (BLKBLD Proprietary - One Post = 9 Assets)</h4>
                  <Card className="p-6 bg-muted/20 mb-6">
                    <div className="space-y-2 text-sm">
                      <p><strong>1 Blog Post</strong> → 5 Social posts + 1 Email + 3 Stories</p>
                      <p><strong>1 Video</strong> → 10 Short clips + 1 Podcast + Blog + Social posts</p>
                      <p><strong>1 Webinar</strong> → 20 Tips + Email series + Course + Social content</p>
                    </div>
                  </Card>

                  <h4 className="text-lg font-semibold mb-4">30 Day Content Calendar Template (Copy-Paste Ready)</h4>
                  <Card className="p-6 bg-muted/20 mb-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left pb-2">Week</th>
                            <th className="text-left pb-2">Mon</th>
                            <th className="text-left pb-2">Wed</th>
                            <th className="text-left pb-2">Fri</th>
                            <th className="text-left pb-2">Content Mix</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs">
                          <tr>
                            <td className="py-2">1</td>
                            <td>Educational</td>
                            <td>Behind-the-scenes</td>
                            <td>Inspirational</td>
                            <td>60% Value, 40% Promotion</td>
                          </tr>
                          <tr>
                            <td className="py-2">2</td>
                            <td>Community</td>
                            <td>Educational</td>
                            <td>Promotional</td>
                            <td>Focus on engagement</td>
                          </tr>
                          <tr>
                            <td className="py-2">3</td>
                            <td>Inspirational</td>
                            <td>Behind-the-scenes</td>
                            <td>Educational</td>
                            <td>Build trust</td>
                          </tr>
                          <tr>
                            <td className="py-2">4</td>
                            <td>Promotional</td>
                            <td>Community</td>
                            <td>Educational</td>
                            <td>Convert warm audience</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>

                  {/* Promotion Examples */}
                  <h4 className="text-lg font-semibold mb-4">Examples:</h4>
                  <div className="space-y-4">
                    <Collapsible>
                      <Card className="p-6 mb-4 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h4 className="font-semibold flex items-center gap-2">
                              💼 Brick-and-Mortar Brand - FreshStart Café
                            </h4>
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
                            <h4 className="font-semibold flex items-center gap-2">
                              🎯 Service Brand - Business Coach
                            </h4>
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
                            <h4 className="font-semibold flex items-center gap-2">
                              👤 Personal Brand - Marketing Executive
                            </h4>
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-4 space-y-2 text-sm">
                            <p><strong>Channels:</strong> LinkedIn (daily posts) + Medium (long-form)</p>
                            <p><strong>Content Pillars:</strong> Marketing frameworks, B2B growth case studies, industry insights</p>
                            <p><strong>Calendar:</strong> 80% education/insights, 10% case studies, 10% availability/expertise</p>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  </div>

                  <div className="bg-accent/10 border-l-4 border-accent p-4 rounded mb-6 mt-6">
                    <p className="text-sm font-medium mb-2"><strong>🚨 Troubleshooting:</strong></p>
                    <ul className="text-sm space-y-1">
                      <li>• "Overwhelmed by content?" → Pick ONE platform, post 2x/week maximum</li>
                      <li>• "No engagement?" → Ask questions, respond to every comment within 4 hours</li>
                      <li>• "Running out of ideas?" → Survey audience monthly: "What's your biggest challenge with _____?"</li>
                    </ul>
                  </div>

                  <div className="bg-gold/10 border-l-4 border-gold p-4 rounded mb-6">
                    <p className="text-sm font-medium">
                      💡 <span className="text-gold">Quick Win:</span> Batch create 1 month of content in 4 hours. Use templates and repurpose everything. One blog post = 5 social posts + 1 email + 3 stories
                    </p>
                  </div>

                  <div className="bg-muted/30 border-l-4 border-muted-foreground p-4 rounded mb-6">
                    <p className="text-sm font-medium mb-2"><strong>What If I Don't Have:</strong></p>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Time for daily posts?</strong> → Schedule weekly, batch monthly</li>
                      <li>• <strong>Design skills?</strong> → Use Canva templates + brand colors from Workbook 1</li>
                      <li>• <strong>Video equipment?</strong> → Phone + good lighting + quiet space = professional enough</li>
                    </ul>
                  </div>

                  {/* AI Boost - Content Calendar */}
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-xl font-bold mb-4">🤖 AI BOOST - Content Calendar</h3>
                    <AIPromptCard
                      title="Content Calendar"
                      prompt={`You are a content strategist. Create my 30-day calendar that converts.

My business: [what you do] | Brand pillars: [from Workbook 1] | Brand voice: [from Workbook 1] | Product/service: [what you offer] | Target audience: [who + their pain] | Platform: [Instagram/LinkedIn/TikTok] | Brand type: [Business/Product/Service/Personal]

REQUIREMENTS:
- 80% value, 20% promotion ratio
- Each post must serve a purpose in customer journey
- Include engagement triggers and calls-to-action
- Content must be batch-creatable in 4 hours

OUTPUT:
- CONTENT PILLARS: [4 themes] + [% split] + [Customer journey stage each serves]
- 30-DAY CALENDAR: [2 posts per week with titles, hooks, and CTAs]
- HASHTAG STRATEGY: [3 hashtags in tiers: High/Medium/Low competition]
- REPURPOSING MAP: [How to turn each post into 3 additional assets]

Cite your sources for each claim in your response. Flag any assumptions, inferences, or gaps you filled in without direct evidence.`}
                    />
                  </div>
                </div>

                {/* Section 3 Checkpoint */}
                <div className="mt-8 p-6 bg-primary/10 border-l-4 border-primary rounded">
                  <h4 className="font-semibold mb-3">Section 3 Checkpoint ✓</h4>
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

        {/* Congratulations */}
        <Collapsible defaultOpen={false}>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-3">
                  <PartyPopper className="w-8 h-8 text-primary" />
                  <div>
                    <h2 className="text-2xl font-bold text-left">Congratulations!</h2>
                    <p className="text-sm text-muted-foreground text-left">You've completed Workbook 2</p>
                  </div>
                </div>
                <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="space-y-6 mt-6 text-center">
                <h2 className="text-3xl font-bold">🎉</h2>
                <p className="text-lg text-muted-foreground">
                  You've completed the Marketing Strategy Execution workbook!
                </p>
                <div className="bg-background/50 p-6 rounded-lg">
                  <h3 className="font-bold mb-3">What You've Accomplished:</h3>
                  <ul className="text-left space-y-2 text-sm max-w-2xl mx-auto">
                    <li>✅ Business Model Canvas complete</li>
                    <li>✅ Market intelligence and target audience defined</li>
                    <li>✅ Product strategy and value ladder designed</li>
                    <li>✅ Pricing strategy with psychology principles</li>
                    <li>✅ Distribution channels mapped</li>
                    <li>✅ Promotion strategy and content calendar ready</li>
                  </ul>
                </div>
                <p className="text-muted-foreground">
                  Next up: <strong>Workbook 3</strong> - Customer Journey & Systems
                </p>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Marketing Strategy Summary */}
        <MarketingStrategy data={data} />

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

        <div className="flex justify-between gap-4">
          <Button variant="outline" size="lg" asChild>
            <Link to="/workbook/1">← Back to Workbook 1</Link>
          </Button>
          <Button onClick={handleDownload} size="lg" variant="outline" className="gap-2">
            <Download className="w-5 h-5" />
            Download My Workbook
          </Button>
          <Button variant="hero" size="lg" asChild>
            <Link to="/workbook/3">Continue to Workbook 3: Customer Journey →</Link>
          </Button>
        </div>
      </div>
      </div>
    </ProtectedWorkbook>
  );
}