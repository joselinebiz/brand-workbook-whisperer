import { WorkbookHeader } from "@/components/WorkbookHeader";
import { AIPromptCard } from "@/components/AIPromptCard";
import { ExampleBox } from "@/components/ExampleBox";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Target, Users, TrendingUp, ChevronDown, PartyPopper, Save } from "lucide-react";
import { useWorkbook } from "@/contexts/WorkbookContext";
import { useEffect, useState } from "react";

export default function Workbook0() {
  const { data, updateData } = useWorkbook();
  const [isSaving, setIsSaving] = useState(false);

  // Show save indicator briefly when data changes
  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => setIsSaving(false), 1000);
    return () => clearTimeout(timer);
  }, [data]);
  return (
    <div className="min-h-screen bg-background">
      <WorkbookHeader
        number="00"
        title="FIND YOUR WHITE SPACE"
        subtitle="The 45 Minute Market Opportunity Sprint"
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
          <h2 className="text-2xl font-bold mb-4">Who This Is For</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Entrepreneurs building businesses, service providers launching consultancies, and
            professionals establishing thought leadership to advance their careers. Whether you're
            validating a business idea or positioning yourself as an industry expert, this process
            works.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
              <Target className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-medium">Time Required</p>
                <p className="text-xs text-muted-foreground">45 minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
              <Users className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-medium">Tools Needed</p>
                <p className="text-xs text-muted-foreground">Google + AI</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
              <TrendingUp className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-medium">Outcome</p>
                <p className="text-xs text-muted-foreground">White Space</p>
              </div>
            </div>
          </div>

          <div className="bg-accent/10 border-l-4 border-accent p-4 rounded mb-6">
            <p className="font-semibold mb-1">What You'll Walk Away With:</p>
            <p className="text-sm">
              One clear sentence: "I'm the only one who _______ for _______ because _______."
            </p>
          </div>

          <div className="bg-primary/10 border-l-4 border-primary p-4 rounded mb-6">
            <p className="font-semibold mb-2">🔗 Bridge to Success</p>
            <p className="text-sm">
              This validates your opportunity. Workbook 1 polishes it into a brand foundation. Workbook 2 builds your strategic marketing system. Workbook 3 automates customer experience. Workbook 4 scales what works.
            </p>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-bold mb-3">Why This Framework Works</h3>
            <p className="text-muted-foreground mb-3">
              This isn't theory from a textbook. This framework is built on:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span><strong>MBA-Level Strategy:</strong> Proven frameworks from top-tier business education, adapted for real-world application</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span><strong>Industry Battle-Tested:</strong> Refined through years of building and scaling multiple businesses</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span><strong>Results-Driven:</strong> Every exercise connects directly to revenue, customers, and sustainable growth</span>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mt-3 italic">
              You're not just learning concepts—you're implementing the same systems that generate six-figure consulting engagements, now available in a structured, self-paced format.
            </p>
          </div>
        </Card>

        {/* THE ONLY 3 QUESTIONS */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30">
          <h2 className="text-2xl font-bold mb-4">THE ONLY 3 QUESTIONS THAT MATTER</h2>
          <p className="text-muted-foreground mb-4">Before building anything:</p>
          <ol className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <span className="bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <div>
                <p className="font-semibold">Who desperately needs this?</p>
                <p className="text-sm text-muted-foreground">(Name them or stop)</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
              <div>
                <p className="font-semibold">What gap exists?</p>
                <p className="text-sm text-muted-foreground">(Find it or pivot)</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
              <div>
                <p className="font-semibold">Can this make money?</p>
                <p className="text-sm text-muted-foreground">(Prove it or refine)</p>
              </div>
            </li>
          </ol>
          <p className="font-semibold text-center">Answer all three in 45 minutes. Speed beats perfection.</p>
        </Card>

        {/* Part 1: The 10 Minute Market Scan */}
        <Collapsible>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <h2 className="text-2xl font-bold mb-6 pb-3 border-b flex items-center justify-between hover:text-primary transition-colors">
                PART 1: THE 10 MINUTE MARKET SCAN
                <ChevronDown className="h-6 w-6 transition-transform duration-200" />
              </h2>
            </CollapsibleTrigger>
            
            <CollapsibleContent>

          {/* Your Customer */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">
                1
              </span>
              Your Customer <span className="text-sm text-muted-foreground font-normal">(3 min)</span>
            </h3>

            <div className="space-y-4 pl-10">
              <div>
                <Label htmlFor="customer">One specific person</Label>
                <Input 
                  id="customer" 
                  placeholder="e.g., Small business owners in Phoenix"
                  value={data.targetCustomer}
                  onChange={(e) => updateData('targetCustomer', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="problem">Their #1 problem</Label>
                <Input 
                  id="problem" 
                  placeholder="e.g., No time to create marketing content"
                  value={data.customerProblem}
                  onChange={(e) => updateData('customerProblem', e.target.value)}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cost">Cost to them ($/month or hours/week)</Label>
                  <Input id="cost" placeholder="$500/month OR 10 hours/week" />
                </div>
                <div>
                  <Label htmlFor="bandaid">Current band-aid solution</Label>
                  <Input id="bandaid" placeholder="e.g., DIY using Canva" />
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/20 p-3 rounded">
                <p className="text-sm font-medium">💡 Stuck? Stop. Call 5 potential customers today.</p>
              </div>

              <AIPromptCard
                title="AI Prompt: Customer Research"
                context="Use this after speaking with 5 potential customers"
                prompt={`I interviewed 5 [type of customers]. Here's what they said about [problem]:

[Paste quotes/notes]

Analyze this and tell me:
1. What's the #1 problem they ALL mentioned?
2. What's costing them the most (time or money)?
3. What band-aid solutions are they using now?

Format as: Problem / Cost / Current Solution`}
              />
            </div>
          </div>

          {/* Your Competition */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">
                2
              </span>
              Your Competition <span className="text-sm text-muted-foreground font-normal">(5 min)</span>
            </h3>

            <div className="space-y-4 pl-10">
              <p className="text-sm text-muted-foreground mb-4">
                Search: "[your solution] + [your city]" - List 3
              </p>

              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4 bg-muted/30">
                  <p className="text-sm font-semibold mb-3">Competitor {i}</p>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor={`comp-name-${i}`} className="text-xs">Name</Label>
                      <Input id={`comp-name-${i}`} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor={`comp-promise-${i}`} className="text-xs">Promise</Label>
                      <Input id={`comp-promise-${i}`} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor={`comp-price-${i}`} className="text-xs">Price</Label>
                      <Input id={`comp-price-${i}`} className="mt-1" placeholder="$" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <Label htmlFor={`comp-miss-${i}`} className="text-xs">What They Miss</Label>
                    <Input id={`comp-miss-${i}`} className="mt-1" />
                  </div>
                </Card>
              ))}

              <div>
                <Label htmlFor="pattern">The Pattern: What do ALL miss?</Label>
                <Textarea id="pattern" rows={2} />
              </div>

              <AIPromptCard
                title="AI Prompt: Competitive Analysis"
                context="Use this to identify market gaps"
                prompt={`Here are 3 competitors in [your market]:

1. [Name] - Promise: [X] - Price: $[Y] - Missing: [Z]
2. [Name] - Promise: [X] - Price: $[Y] - Missing: [Z]
3. [Name] - Promise: [X] - Price: $[Y] - Missing: [Z]

What gap do ALL three competitors miss? What could someone own that none of them address?

Give me 3 specific angles I could take.`}
              />
            </div>
          </div>

          {/* Your Opportunity */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">
                3
              </span>
              Your Opportunity <span className="text-sm text-muted-foreground font-normal">(2 min)</span>
            </h3>

            <div className="space-y-4 pl-10">
              <p className="text-sm text-muted-foreground mb-3">Check boxes you can own:</p>
              
              <div className="grid md:grid-cols-2 gap-2">
                {["Faster", "Cheaper", "Premium", "Easier", "More personal", "More technical", "Different audience", "Different problem"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
            </CollapsibleContent>
        </Card>
        </Collapsible>

        {/* Part 2: The 15-Minute Business Model */}
        <Collapsible>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <h2 className="text-2xl font-bold mb-6 pb-3 border-b flex items-center justify-between hover:text-primary transition-colors">
                PART 2: THE 15-MINUTE BUSINESS MODEL
                <ChevronDown className="h-6 w-6 transition-transform duration-200" />
              </h2>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <p className="text-muted-foreground mb-6">Fill each box in 90 seconds. First thought = best thought.</p>
              
              <div className="space-y-4">
                {[
                  { num: 1, label: "Who", question: "Who desperately needs this?" },
                  { num: 2, label: "Problem", question: "What costly problem do you solve?" },
                  { num: 3, label: "Solution", question: "What's your unique approach?" },
                  { num: 4, label: "Delivery", question: "How do they get it?" },
                  { num: 5, label: "Discovery", question: "How do they find you?" },
                  { num: 6, label: "Price", question: "What will they pay?", prefix: "$" },
                  { num: 7, label: "Costs", question: "Biggest expense per sale?", prefix: "$" },
                  { num: 8, label: "Activities", question: "Daily tasks for success?" },
                  { num: 9, label: "Partners", question: "Who helps you deliver?" }
                ].map((item) => (
                  <Card key={item.num} className="p-4 bg-muted/30">
                    <div className="flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                        {item.num}
                      </span>
                      <div className="flex-1">
                        <Label className="text-sm font-bold mb-2 block">{item.label}</Label>
                        <p className="text-sm text-muted-foreground mb-2">{item.question}</p>
                        <Input placeholder={item.prefix ? `${item.prefix}` : "Your 90-second answer"} />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
                <p className="font-semibold mb-2">Quick Math:</p>
                <p className="text-sm mb-2">Price ÷ Cost per sale = _____ (Must be ≥ 3 to survive)</p>
                <p className="text-xs text-muted-foreground italic">Include recurring costs (software, ads, payment fees)</p>
              </div>

              <div className="mt-4 p-4 bg-background border-2 border-primary/20 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="font-semibold">✅ Reality Check: Could you serve a customer tomorrow?</span>
                </label>
              </div>

              <div className="mt-8 pt-6 border-t">
                <h3 className="font-semibold mb-4">Business Model Examples:</h3>
                <div className="space-y-4">
                  <ExampleBox
                    icon="🏪"
                    title="Brick-and-Mortar Brand - FreshStart Café"
                    content="Who: Busy Phoenix families with kids | Problem: Morning chaos, unhealthy breakfast options | Solution: Chef-made meals ready in under 5 minutes | Delivery: Pickup lane + pre-order app | Discovery: Local parent Facebook groups, school partnerships | Price: $8-12 per person | Costs: $3-4 per meal | Ratio: 3:1 ✓"
                  />
                  <ExampleBox
                    icon="🎯"
                    title="Service Brand - Business Coach"
                    content="Who: Overwhelmed solopreneurs making $50K-200K | Problem: Working 60+ hours, no systems, constant firefighting | Solution: 90-day system implementation with accountability | Delivery: Group coaching + 1:1 calls + templates | Discovery: LinkedIn content, podcast interviews, referrals | Price: $2,997 program | Costs: $500 (time + tools) | Ratio: 6:1 ✓"
                  />
                  <ExampleBox
                    icon="👤"
                    title="Personal Brand - Marketing Executive"
                    content="Who: Hiring managers and CEOs at B2B SaaS companies | Problem: Need experienced marketing leader who can scale revenue predictably | Solution: Proven track record + thought leadership content demonstrating expertise | Delivery: LinkedIn thought leadership + conference speaking + portfolio of results | Discovery: LinkedIn algorithm, industry conferences, executive networks | Price: $150K-250K salary range | Costs: $5K annually (conferences + courses + associations) | ROI: 30-50X career advancement ✓"
                  />
                </div>
              </div>

              <AIPromptCard
                title="AI Prompt: Model Validation"
                context="Use this to validate your business model"
                prompt={`Review my business model:
- Customer: [who]
- Problem: [what]
- Solution: [how]
- Price: [amount]
- Main cost: [what]

Provide:
1. Similar successful business examples
2. Potential revenue at 10, 100, 1000 customers
3. 3 risks and mitigation strategies
4. Suggested pricing models (one-time, subscription, tiered)`}
              />
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Part 3: The 5-Minute Validation */}
        <Collapsible>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <h2 className="text-2xl font-bold mb-6 pb-3 border-b flex items-center justify-between hover:text-primary transition-colors">
                PART 3: THE 5-MINUTE VALIDATION
                <ChevronDown className="h-6 w-6 transition-transform duration-200" />
              </h2>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              {/* 30-Second Pitch */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Your 30-Second Pitch</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Format: "I help [who] achieve [what] by [how] so they can [why it matters]."
                </p>
                
                <div className="space-y-3 mb-6">
                  <ExampleBox
                    icon="🏪"
                    title="Business Example"
                    content="I help busy Phoenix families start their day right with chef-quality breakfasts ready in under 5 minutes so they can spend mornings connecting, not stressing."
                  />
                  <ExampleBox
                    icon="🎯"
                    title="Service Example"
                    content="I help overwhelmed solopreneurs build profitable systems in 90 days without working more hours so they can scale their business and reclaim their life."
                  />
                  <ExampleBox
                    icon="👤"
                    title="Personal Example"
                    content="I help B2B SaaS companies break through revenue plateaus by implementing the same systematic marketing frameworks I used to scale three companies from $1M to $10M ARR so they can achieve predictable, sustainable growth."
                  />
                </div>

                <Label htmlFor="pitch">Write yours:</Label>
                <Textarea id="pitch" rows={3} placeholder="I help..." className="mt-2" />
              </div>

              {/* The Gut Check */}
              <div className="mb-8 p-6 bg-muted/30 rounded-lg">
                <h3 className="text-xl font-bold mb-4">The Gut Check</h3>
                <p className="text-sm text-muted-foreground mb-4">Rate 1-10:</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3">
                    <Label className="w-40">Excitement level:</Label>
                    <Input type="number" min="1" max="10" placeholder="___" className="w-20" />
                    <span className="text-sm text-muted-foreground">/10</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Label className="w-40">Customer clarity:</Label>
                    <Input type="number" min="1" max="10" placeholder="___" className="w-20" />
                    <span className="text-sm text-muted-foreground">/10</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Label className="w-40">Uniqueness:</Label>
                    <Input type="number" min="1" max="10" placeholder="___" className="w-20" />
                    <span className="text-sm text-muted-foreground">/10</span>
                  </div>
                  <div className="flex items-center gap-3 pt-2 border-t">
                    <Label className="w-40 font-bold">Total:</Label>
                    <Input type="number" placeholder="___" className="w-20" />
                    <span className="text-sm text-muted-foreground">/30</span>
                  </div>
                </div>

                <div className="bg-background p-4 rounded">
                  <p className="font-semibold mb-2">Decision:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• 25-30: Full speed → Workbook 1</li>
                    <li>• 20-24: Solid foundation</li>
                    <li>• Below 20: Pivot angle</li>
                  </ul>
                </div>
              </div>

              {/* The Coffee Shop Test */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">The Coffee Shop Test</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Explain to 3 strangers in 30 seconds. Record reactions:
                </p>
                
                <div className="space-y-3 mb-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i}>
                      <Label htmlFor={`person-${i}`}>Person {i}</Label>
                      <Input id={`person-${i}`} placeholder="Their reaction..." className="mt-1" />
                    </div>
                  ))}
                </div>

                <div className="bg-accent/10 border border-accent/20 p-4 rounded">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Eyes light up = You found it</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>"That's like [X]" = Note for positioning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">✓</span>
                      <span>Confused = Capture questions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* White Space Declaration */}
        <Collapsible>
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary">
          <CollapsibleTrigger className="w-full">
            <h2 className="text-2xl font-bold mb-6 flex items-center justify-between hover:text-primary transition-colors">
              YOUR WHITE SPACE DECLARATION
              <ChevronDown className="h-6 w-6 transition-transform duration-200" />
            </h2>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
          <div className="space-y-6">
            {/* THE OPPORTUNITY */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-primary">THE OPPORTUNITY</h3>
              <p className="text-lg font-medium mb-4">
                "While everyone else fights over
              </p>
              
              <div className="space-y-4 pl-4">
                <div>
                  <Label htmlFor="competitors-chase" className="text-base">What competitors chase</Label>
                  <Input 
                    id="competitors-chase" 
                    className="text-lg"
                    placeholder="e.g., same day delivery"
                  />
                </div>

                <p className="text-lg font-medium">I'll own</p>

                <div>
                  <Label htmlFor="your-whitespace" className="text-base">Your white space</Label>
                  <Input 
                    id="your-whitespace" 
                    className="text-lg"
                    placeholder="e.g., under 5-minute breakfast guarantee"
                  />
                </div>

                <p className="text-lg font-medium">by being the only one who</p>

                <div>
                  <Label htmlFor="unique-approach" className="text-base">Your unique approach</Label>
                  <Input 
                    id="unique-approach" 
                    className="text-lg"
                    placeholder="e.g., combines chef-made meals with dedicated pickup lane"
                    value={data.solution}
                    onChange={(e) => updateData('solution', e.target.value)}
                  />
                </div>

                <p className="text-lg font-medium">for</p>

                <div>
                  <Label htmlFor="specific-audience" className="text-base">Specific audience</Label>
                  <Input 
                    id="specific-audience" 
                    className="text-lg"
                    placeholder="e.g., busy Phoenix families with kids"
                  />
                </div>

                <p className="text-lg font-medium">who value</p>

                <div>
                  <Label htmlFor="what-matters" className="text-base">What matters to them</Label>
                  <Textarea 
                    id="what-matters" 
                    className="text-lg"
                    rows={2}
                    placeholder="e.g., spending morning time connecting instead of stressing"
                    value={data.whiteSpaceDeclaration}
                    onChange={(e) => updateData('whiteSpaceDeclaration', e.target.value)}
                  />
                </div>
              </div>

              <p className="text-lg font-medium mt-4">"</p>
            </div>

            {/* THE VALIDATION */}
            <div className="pt-6 border-t">
              <h3 className="text-xl font-bold mb-4 text-primary">THE VALIDATION</h3>
              <div className="space-y-3 mb-4">
                <label className="flex items-start gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded">
                  <input type="checkbox" className="w-5 h-5 mt-0.5" />
                  <span className="text-sm">Problem confirmed (customers nodded)</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded">
                  <input type="checkbox" className="w-5 h-5 mt-0.5" />
                  <span className="text-sm">Gap found (competitors miss it)</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded">
                  <input type="checkbox" className="w-5 h-5 mt-0.5" />
                  <span className="text-sm">Math works (3:1 minimum OR strong career ROI)</span>
                </label>
              </div>

              <div className="bg-accent/10 border border-accent/20 p-4 rounded">
                <p className="text-sm font-semibold">Success Metric:</p>
                <p className="text-sm">2 out of 3 coffee shop testers say "I need that!" or "You should apply here!"</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <h3 className="font-semibold mb-4">Examples Across Different Brand Types:</h3>
            <div className="space-y-3">
              <ExampleBox
                icon="🏪"
                title="Brick-and-Mortar Brand - FreshStart Café"
                content="I'm the only café that guarantees healthy breakfast in under 5 minutes for busy Phoenix families because of our chef-made meals and dedicated pickup lane."
              />
              <ExampleBox
                icon="🎯"
                title="Service Brand - Business Coach"
                content="I'm the only business coach who helps overwhelmed solopreneurs build systems in 90 days because I've scaled 5 businesses myself without burning out."
              />
              <ExampleBox
                icon="👤"
                title="Personal Brand - Marketing Executive"
                content="I'm the only marketing director you should hire who's helped B2B SaaS companies scale from $1M to $10M ARR using systematic growth frameworks because I've led 3 companies through this exact transition."
              />
            </div>
          </div>

          <AIPromptCard
            title="AI Prompt: White Space Validation"
            context="Use this to test your positioning"
            prompt={`My white space statement is:

"I'm the only one who [your action] for [your customer] because [your advantage]."

Is this:
1. Specific enough that someone would say "that's for me"?
2. Different enough that competitors can't easily copy it?
3. Believable based on my advantage?

Give me a score out of 10 and suggest one improvement.`}
          />
          </CollapsibleContent>
        </Card>
        </Collapsible>

        {/* Bridge to Workbook 1 */}
        <Collapsible>
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/50">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
              <h2 className="text-2xl font-bold text-primary">🔗 BRIDGE TO WORKBOOK 1</h2>
              <ChevronDown className="h-6 w-6 transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
          <div className="mt-6 space-y-4">
            <p className="text-lg font-semibold">You validated demand. Now build the brand foundation that attracts it.</p>
            
            <div className="bg-background/50 p-6 rounded-lg">
              <p className="font-semibold mb-3">You're ready for Workbook 1 if:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Named your customer (even roughly)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Found your gap (even roughly)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Math checks out (even roughly)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Energy is high</span>
                </li>
              </ul>
            </div>

            <p className="text-sm text-muted-foreground italic">
              Remember: Whether you're building the next great brick-and-mortar business, launching a premium consultancy, or establishing yourself as a thought leader in your industry, this validation ensures you're building something people actually want.
            </p>
          </div>
          </CollapsibleContent>
        </Card>
        </Collapsible>

        {/* The Complete BLKBLD Journey */}
        <Collapsible>
        <Card className="p-8 mb-8 bg-gradient-to-br from-accent/10 to-primary/10 border-2 border-accent/50">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
              <h2 className="text-2xl font-bold">THE COMPLETE BLKBLD JOURNEY</h2>
              <ChevronDown className="h-6 w-6 transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
          <div className="mt-6 space-y-6">
            <div>
              <p className="text-lg font-semibold mb-4">You've identified your unique market opportunity across three proven pathways:</p>
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-3 bg-background/50 rounded">
                  <span className="text-2xl">🏪</span>
                  <div>
                    <p className="font-semibold">Brick-and-Mortar Brand</p>
                    <p className="text-sm text-muted-foreground">Build a local business that serves a specific community need</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-background/50 rounded">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <p className="font-semibold">Service Brand</p>
                    <p className="text-sm text-muted-foreground">Launch expertise-based services or consulting</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-background/50 rounded">
                  <span className="text-2xl">👤</span>
                  <div>
                    <p className="font-semibold">Personal Brand</p>
                    <p className="text-sm text-muted-foreground">Establish thought leadership for career advancement</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <p className="font-semibold mb-4">Your Complete Transformation Path:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded border-l-4 border-primary">
                  <span className="text-primary font-bold">✅</span>
                  <span className="font-semibold">WORKBOOK 0: Market opportunity validated (you're here!)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded">
                  <span className="text-muted-foreground">→</span>
                  <span>WORKBOOK 1: Brand foundation that guides every decision</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded">
                  <span className="text-muted-foreground">→</span>
                  <span>WORKBOOK 2: Strategic marketing system aligned with your brand</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded">
                  <span className="text-muted-foreground">→</span>
                  <span>WORKBOOK 3: Automated customer experience that builds loyalty</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-background/50 rounded">
                  <span className="text-muted-foreground">→</span>
                  <span>WORKBOOK 4: Data-driven optimization and systematic scaling</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground italic pt-4">
              Your job today wasn't perfection—it was validation. Now let's transform this rough diamond into a polished brand that attracts the right opportunities and scales systematically.
            </p>
          </div>
          </CollapsibleContent>
        </Card>
        </Collapsible>

        {/* Recommended Tech Stack */}
        <Collapsible>
        <Card className="p-8 mb-8 border-2 border-muted">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
              <h2 className="text-2xl font-bold">Recommended Tech Stack For Validation</h2>
              <ChevronDown className="h-6 w-6 transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
          <div className="mt-6 space-y-6">
            <p className="text-muted-foreground">The right tools accelerate validation without breaking the bank:</p>
            
            <div className="space-y-6">
              <div className="border-l-4 border-accent p-4 bg-accent/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">📧</span>
                  <h3 className="font-bold text-lg">EMAIL & CRM</h3>
                </div>
                <p className="font-semibold mb-1">Constant Contact</p>
                <p className="text-sm text-muted-foreground mb-2">All-in-one platform for email, landing pages, social scheduling, and CRM</p>
                <p className="text-xs italic">Why it works: Manage customer research, surveys, and early lead nurturing in one place</p>
              </div>

              <div className="border-l-4 border-accent p-4 bg-accent/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">📅</span>
                  <h3 className="font-bold text-lg">SCHEDULING</h3>
                </div>
                <p className="font-semibold mb-1">Calendly</p>
                <p className="text-sm text-muted-foreground mb-2">Automate customer interview booking</p>
                <p className="text-xs italic">Why it works: Eliminates back-and-forth emails; looks professional from day one</p>
              </div>

              <div className="border-l-4 border-accent p-4 bg-accent/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">💻</span>
                  <h3 className="font-bold text-lg">VIDEO CALLS</h3>
                </div>
                <p className="font-semibold mb-1">Zoom</p>
                <p className="text-sm text-muted-foreground mb-2">Reliable platform for customer interviews and discovery calls</p>
                <p className="text-xs italic">Why it works: Record sessions for pattern analysis across interviews</p>
              </div>

              <div className="border-l-4 border-accent p-4 bg-accent/5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🌐</span>
                  <h3 className="font-bold text-lg">DOMAIN & HOSTING</h3>
                </div>
                <p className="font-semibold mb-1">GoDaddy</p>
                <p className="text-sm text-muted-foreground mb-2">Secure your business domain early; BlkBld is a reseller of GoDaddy</p>
                <p className="text-xs italic">Why it works: Securing your domain early on websites and social media ensures your brand's name belongs to you. Professional email addresses build credibility during validation phase</p>
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
                  <p className="text-muted-foreground">You've completed Workbook 0</p>
                </div>
              </div>
              <ChevronDown className="h-6 w-6 transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
          <div className="space-y-4">
            <p className="text-lg">
              You've completed the crucial first step: validating market demand.
            </p>
            <p className="text-muted-foreground">
              Whether you're opening a café, launching a coaching practice, or positioning yourself for that CMO role, you now have evidence that people want what you're offering.
            </p>
            
            <div className="bg-background/50 p-4 rounded-lg">
              <p className="font-semibold mb-2">What You've Accomplished:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Identified your specific customer and their #1 problem</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Analyzed your competition and found the gaps they miss</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Validated your business model with clear math</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Defined your unique market position with a clear white space statement</span>
                </li>
              </ul>
            </div>

            <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
              <p className="font-semibold text-lg mb-2">Next: Transform this opportunity into a brand foundation!</p>
              <p className="text-sm">
                Workbook 1 will turn this white space into a complete brand foundation that makes marketing easier and more effective.
              </p>
            </div>

            <p className="text-sm text-muted-foreground italic text-center">
              This workbook works whether you're building a brick-and-mortar business, product or service brand, or personal brand. Same validation process, different applications. You now have the foundation for strategic success.
            </p>
          </div>
          </CollapsibleContent>
        </Card>
        </Collapsible>

        <div className="flex justify-end">
          <Button variant="hero" size="lg" asChild>
            <a href="/workbook/1">Continue to Workbook 1: Brand Strategy →</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
