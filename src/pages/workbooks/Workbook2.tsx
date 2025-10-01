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

        {/* Introduction */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-card to-muted/20">
          <h2 className="text-2xl font-bold mb-4">What You'll Walk Away With</h2>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Complete market analysis and positioning</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Proprietary 4P marketing mix strategy</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>90-day content calendar—copy-paste ready</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Marketing ROI tracking framework</span>
            </li>
          </ul>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-background rounded-lg border">
              <p className="text-sm font-medium mb-1">Prerequisites</p>
              <p className="text-xs text-muted-foreground">Completed Workbook 1</p>
            </div>
            <div className="p-4 bg-background rounded-lg border">
              <p className="text-sm font-medium mb-1">Time Required</p>
              <p className="text-xs text-muted-foreground">5-10 hours</p>
            </div>
          </div>
        </Card>

        {/* Section 1: Business Model Canvas */}
        <Collapsible>
        <Card className="p-8 mb-8">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
              <SectionHeader
            number="1"
            title="Business Model Canvas"
                description="Understanding how all pieces connect"
                icon={<TrendingUp className="w-8 h-8" />}
              />
              <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
          <div className="space-y-6 mt-6">
            <div className="bg-accent/5 border-l-4 border-accent p-4 rounded mb-6">
              <p className="text-sm font-medium">
                💡 A Business Model Canvas maps how your business creates, delivers, and captures value. Think of it as a one-page business plan.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-muted/20">
                <h3 className="font-semibold mb-4">Core Elements</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customer-segments">Customer Segments</Label>
                    <p className="text-xs text-muted-foreground mb-2">Who needs you most?</p>
                    <Textarea id="customer-segments" rows={2} />
                  </div>
                  <div>
                    <Label htmlFor="value-prop">Value Proposition</Label>
                    <p className="text-xs text-muted-foreground mb-2">What problem do you solve?</p>
                    <Textarea id="value-prop" rows={2} />
                  </div>
                  <div>
                    <Label htmlFor="channels">Channels</Label>
                    <p className="text-xs text-muted-foreground mb-2">How do they find/buy from you?</p>
                    <Textarea id="channels" rows={2} />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-muted/20">
                <h3 className="font-semibold mb-4">Operations</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="key-resources">Key Resources</Label>
                    <p className="text-xs text-muted-foreground mb-2">What do you need to operate?</p>
                    <Textarea id="key-resources" rows={2} />
                  </div>
                  <div>
                    <Label htmlFor="key-activities">Key Activities</Label>
                    <p className="text-xs text-muted-foreground mb-2">What do you do daily?</p>
                    <Textarea id="key-activities" rows={2} />
                  </div>
                  <div>
                    <Label htmlFor="cost-structure">Cost Structure</Label>
                    <p className="text-xs text-muted-foreground mb-2">Major expenses?</p>
                    <Textarea id="cost-structure" rows={2} />
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <Label htmlFor="revenue-streams">Revenue Streams</Label>
              <p className="text-sm text-muted-foreground mb-2">How do you make money?</p>
              <Textarea id="revenue-streams" rows={3} placeholder="List all ways you generate revenue" />
            </div>
          </div>

          {/* AI Boost */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-bold mb-4">🤖 AI BOOST</h3>
            <AIPromptCard
              title="Business Model Validation"
              prompt={`Analyze my business model:

Customer Segments: [your segments]
Value Proposition: [your value prop]
Channels: [your channels]
Revenue Streams: [your streams]

Identify:
1. Gaps or misalignments
2. Revenue optimization opportunities
3. Channel efficiency issues
4. One quick win I can implement this week`}
            />
          </div>
          </CollapsibleContent>
        </Card>
        </Collapsible>

        {/* Section 2: 5C Market Analysis */}
        <Collapsible>
        <Card className="p-8 mb-8">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
              <SectionHeader
            number="2"
            title="5C Market Analysis"
                description="Company, Category, Customer, Competition, Context"
                icon={<BarChart3 className="w-8 h-8" />}
              />
              <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
          <div className="space-y-6 mt-6">
            {[
              { id: "company", title: "Company", question: "Top 3 strengths?" },
              { id: "category", title: "Category", question: "What's the market opportunity?" },
              { id: "customer", title: "Customer", question: "Top 3 needs/desires?" },
              { id: "competition", title: "Competition", question: "What gap do they all miss?" },
              { id: "context", title: "Context/Trend", question: "What trend can you ride?" },
            ].map((item) => (
              <div key={item.id}>
                <Label htmlFor={item.id} className="text-lg font-semibold">
                  {item.title}
                </Label>
                <p className="text-sm text-muted-foreground mb-2">{item.question}</p>
                <Textarea id={item.id} rows={3} />
              </div>
            ))}
          </div>

          {/* AI Boost */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-bold mb-4">🤖 AI BOOST</h3>
            <AIPromptCard
              title="5C Deep Dive"
              prompt={`Based on my 5C analysis:

Company strengths: [your strengths]
Category opportunity: [opportunity]
Customer needs: [needs]
Competition gap: [gap]
Context/trend: [trend]

Provide:
1. Strategic positioning recommendation
2. Messaging angle that leverages the trend
3. Content topics that hit all 5 Cs
4. Warning: What could derail this strategy?`}
            />
          </div>
          </CollapsibleContent>
        </Card>
        </Collapsible>

        {/* Section 3: 4P Marketing Mix */}
        <Collapsible>
        <Card className="p-8 mb-8">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
              <SectionHeader
            number="3"
            title="4P Marketing Mix"
                description="Product, Price, Place, Promotion"
                icon={<DollarSign className="w-8 h-8" />}
              />
              <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
          <div className="space-y-8 mt-6">
            {/* Product */}
            <div>
              <h3 className="text-xl font-bold mb-4">PRODUCT - Value Ladder</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="free-offer">Free Offer</Label>
                  <p className="text-xs text-muted-foreground mb-2">Validate interest, build trust</p>
                  <Input id="free-offer" placeholder="e.g., Brand Strategy Quiz" />
                </div>
                <div>
                  <Label htmlFor="core-offer">Core Offer</Label>
                  <p className="text-xs text-muted-foreground mb-2">Maximum value, main revenue driver</p>
                  <Input id="core-offer" placeholder="e.g., Complete Workbook System" />
                </div>
                <div>
                  <Label htmlFor="premium-offer">Premium Offer (Optional)</Label>
                  <p className="text-xs text-muted-foreground mb-2">High-touch, high-value</p>
                  <Input id="premium-offer" placeholder="e.g., 1:1 Strategy Consultation" />
                </div>
              </div>
            </div>

            {/* Price */}
            <div>
              <h3 className="text-xl font-bold mb-4">PRICE Strategy</h3>
              <div className="space-y-4">
                <div>
                  <Label>Pricing Model</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {["One-time", "Subscription", "Tiered", "Project-based"].map((model) => (
                      <label key={model} className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 cursor-pointer">
                        <input type="checkbox" />
                        <span className="text-sm">{model}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price-good">Good</Label>
                    <Input id="price-good" placeholder="$" />
                  </div>
                  <div>
                    <Label htmlFor="price-better">Better</Label>
                    <Input id="price-better" placeholder="$" />
                  </div>
                  <div>
                    <Label htmlFor="price-best">Best</Label>
                    <Input id="price-best" placeholder="$" />
                  </div>
                </div>
              </div>
            </div>

            {/* Place */}
            <div>
              <h3 className="text-xl font-bold mb-4">PLACE - Distribution</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="primary-channel">Primary Channel</Label>
                  <Input id="primary-channel" placeholder="e.g., Direct website sales" />
                </div>
                <div>
                  <Label htmlFor="secondary-channel">Secondary Channel</Label>
                  <Input id="secondary-channel" placeholder="e.g., Partner referrals" />
                </div>
              </div>
            </div>

            {/* Promotion */}
            <div>
              <h3 className="text-xl font-bold mb-4">PROMOTION - Content Strategy</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="content-pillars">Content Pillars (3-4 themes)</Label>
                  <Input id="content-pillars" placeholder="e.g., Strategy, Systems, Scaling, Stories" />
                </div>
                <div>
                  <Label htmlFor="primary-platform">Primary Platform</Label>
                  <Input id="primary-platform" placeholder="e.g., LinkedIn" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="mix-educational">Educational %</Label>
                    <Input id="mix-educational" type="number" placeholder="60" />
                  </div>
                  <div>
                    <Label htmlFor="mix-inspirational">Inspirational %</Label>
                    <Input id="mix-inspirational" type="number" placeholder="30" />
                  </div>
                  <div>
                    <Label htmlFor="mix-promotional">Promotional %</Label>
                    <Input id="mix-promotional" type="number" placeholder="10" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Boost */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-bold mb-4">🤖 AI BOOST</h3>
            <div className="space-y-4">
              <AIPromptCard
                title="Content Pillar Development"
                prompt={`My brand is about: [your positioning from Workbook 1]
My customer needs: [from 5C analysis]

Create 4 content pillars that:
1. Align with my brand
2. Address customer needs
3. Are broad enough for 50+ posts each
4. Differentiate me from competitors

For each pillar, give me:
- Pillar name
- 5 post topics
- Content mix recommendations`}
              />

              <AIPromptCard
                title="Pricing Psychology"
                prompt={`My core offer is: [your offer]
My target customer values: [what they value most]
Competition prices at: [competitor pricing]

Recommend:
1. Optimal price point with reasoning
2. How to frame the price (annual vs monthly, payment plans)
3. Anchor pricing strategy
4. What to include at each tier
5. Guarantee that reduces risk`}
              />
            </div>
          </div>
          </CollapsibleContent>
        </Card>
        </Collapsible>

        {/* Section 4: Campaign Planning */}
        <Collapsible>
        <Card className="p-8 mb-8">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
              <SectionHeader
            number="4"
            title="90-Day Campaign Plan"
                description="Your first strategic marketing campaign"
                icon={<Megaphone className="w-8 h-8" />}
              />
              <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
          <div className="space-y-6 mt-6">
            <div>
              <Label htmlFor="campaign-goal">Campaign Goal</Label>
              <Input id="campaign-goal" placeholder="e.g., 100 email subscribers in 90 days" />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 bg-primary/5 border-primary/20">
                <h4 className="font-semibold mb-3">Month 1: Awareness</h4>
                <Textarea rows={4} placeholder="Activities, content themes, channels" />
              </Card>
              <Card className="p-4 bg-primary/5 border-primary/20">
                <h4 className="font-semibold mb-3">Month 2: Engagement</h4>
                <Textarea rows={4} placeholder="Activities, content themes, channels" />
              </Card>
              <Card className="p-4 bg-primary/5 border-primary/20">
                <h4 className="font-semibold mb-3">Month 3: Conversion</h4>
                <Textarea rows={4} placeholder="Activities, content themes, channels" />
              </Card>
            </div>

            <div>
              <Label htmlFor="success-metrics">Success Metrics</Label>
              <Textarea id="success-metrics" rows={3} placeholder="How will you measure success?" />
            </div>
          </div>

          {/* AI Boost */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-bold mb-4">🤖 AI BOOST</h3>
            <AIPromptCard
              title="90-Day Content Calendar"
              prompt={`Create a 90-day content calendar for:

Goal: [your campaign goal]
Platform: [primary platform]
Content Pillars: [your pillars]
Audience: [target customer]

For each week, provide:
1. Content theme
2. 3 post ideas (with hooks)
3. CTA strategy
4. Engagement tactics

Format as a week-by-week breakdown I can copy-paste.`}
            />
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
                  <span className="text-accent mt-1">✓</span>
                  <span>Mapped your business model and validated alignment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Completed 5C market analysis for strategic positioning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Developed your 4P marketing mix (Product, Price, Place, Promotion)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Created a 90-day campaign plan ready to execute</span>
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
