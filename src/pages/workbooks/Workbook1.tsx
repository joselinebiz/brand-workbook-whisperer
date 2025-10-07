import { useState, useEffect } from "react";
import { WorkbookHeader } from "@/components/WorkbookHeader";
import { AIPromptCard } from "@/components/AIPromptCard";
import { ExampleBox } from "@/components/ExampleBox";
import { BrandGuide } from "@/components/BrandGuide";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, PartyPopper, Save, Target, Award, Eye, Users, TrendingUp } from "lucide-react";
import { useWorkbook } from "@/contexts/WorkbookContext";

export default function Workbook1() {
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

  const getColorPsychology = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    if (luminance < 0.2) return "Elegance, Drama, Strength";
    if (luminance > 0.9 && Math.abs(r - g) < 30 && Math.abs(g - b) < 30 && Math.abs(r - b) < 30) {
      return "Cleanliness, Purity, Freshness";
    }
    if (Math.abs(r - g) < 30 && Math.abs(g - b) < 30 && Math.abs(r - b) < 30) {
      return "Neutrality, Balance, Sophistication";
    }

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    
    if (delta === 0) return "Neutrality, Balance, Sophistication";
    
    let hue = 0;
    if (max === r) {
      hue = ((g - b) / delta) % 6;
    } else if (max === g) {
      hue = (b - r) / delta + 2;
    } else {
      hue = (r - g) / delta + 4;
    }
    hue = Math.round(hue * 60);
    if (hue < 0) hue += 360;
    
    const saturation = max === 0 ? 0 : delta / max;
    
    if (hue >= 0 && hue < 20) return "Power, Strength, Passion";
    if (hue >= 20 && hue < 45) return "Courage, Originality, Success";
    if (hue >= 45 && hue < 70) return "Happiness, Originality, Energy";
    if (hue >= 70 && hue < 160) return "Money, Growth, Freshness, Environmental-Friendliness";
    if (hue >= 160 && hue < 250) return "Integrity, Trust, Tranquility, Loyalty, Intelligence";
    if (hue >= 250 && hue < 330) return "Royalty, Spirituality, Luxury";
    if (hue >= 330) {
      if (luminance > 0.6 && saturation < 0.8) return "Femininity, Compassion, Playfulness";
      return "Power, Strength, Passion";
    }
    
    return "Creativity, Uniqueness";
  };

  return (
    <div className="min-h-screen bg-background">
      <WorkbookHeader
        number="01"
        title="BRAND STRATEGY FOUNDATION"
        subtitle="Build the Foundation That Makes Marketing Easier and More Effective"
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
            New entrepreneurs, stuck business owners, and those looking to build or enhance their personal brand need clarity on who they are, what they stand for, and how to show up in the market consistently.
          </p>

          <h3 className="text-xl font-bold mb-3">Prerequisites ✅</h3>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li>• A business idea, service offering, or career positioning goal</li>
            <li>• 2-4 hours of focused time</li>
            <li>• Completed Workbook 0 (or validated your market opportunity)</li>
          </ul>

          <h3 className="text-xl font-bold mb-3">What You'll Walk Away With</h3>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li>• Clear brand foundation that guides every decision</li>
            <li>• Visual and verbal identity system</li>
            <li>• Customer experience blueprint</li>
            <li>• Ready-to-use templates</li>
            <li>• Enhanced AI prompts for consultant-level guidance</li>
          </ul>

          <div className="bg-primary/10 border-l-4 border-primary p-4 rounded mb-6">
            <p className="text-sm">
              <strong>🤖 AI Partner Evolution:</strong> Our AI assistance grows with your expertise—from foundational clarity here in Workbook 1 to consultant-level analysis in advanced workbooks. You'll get exactly the depth you can handle at each stage.
            </p>
          </div>

          <div className="bg-background/50 p-4 rounded mb-6">
            <p className="font-semibold mb-1">Success Metric:</p>
            <p className="text-sm">Score 10+ on final assessment AND consistent brand across 5 touchpoints</p>
          </div>

          <div className="border-t pt-6 mb-6">
            <h3 className="text-xl font-bold mb-3">🔗 Bridge to Success</h3>
            <p className="font-semibold mb-3">The Complete BLKBLD Journey:</p>
            <ul className="space-y-2 text-sm">
              <li>✅ <strong>WORKBOOK 0:</strong> Market opportunity validated</li>
              <li>✅ <strong>WORKBOOK 1:</strong> Brand foundation built (you're here!)</li>
              <li>→ <strong>WORKBOOK 2:</strong> Strategic marketing system that aligns with your brand</li>
              <li>→ <strong>WORKBOOK 3:</strong> Automated customer experience that builds loyalty</li>
              <li>→ <strong>WORKBOOK 4:</strong> Data-driven optimization and systematic scaling</li>
            </ul>
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


        {/* Section 1: Brand Foundation */}
        <Collapsible>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <h2 className="text-2xl font-bold mb-6 pb-3 border-b flex items-center justify-between hover:text-primary transition-colors">
                Section 1: Brand Foundation (Your North Star)
                <ChevronDown className="h-6 w-6 transition-transform duration-200" />
              </h2>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="bg-primary/10 border-l-4 border-primary p-4 rounded mb-6 mt-6">
                <p className="text-sm">
                  <strong>Why This Section Matters:</strong> Your foundation is your decision filter. Without it, marketing feels random and expensive. With it, every choice becomes clear: "Does this align with our brand?" Studies show purposeful brands grow 2x faster and command 20% higher prices.
                </p>
              </div>

              {/* 1.1 Brand Purpose & Mission */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">1.1 Brand Purpose & Mission</h3>
                <p className="text-muted-foreground mb-4">Why you exist beyond profit</p>

                <div className="bg-muted/30 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold mb-3">Quick Definitions:</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Mission</strong> = What you do daily</p>
                    <p><strong>Vision</strong> = Where you're headed in 5 years</p>
                    <p><strong>BHAG</strong> = Your 10-year moonshot (Big Hairy Audacious Goal)</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="mission" className="text-base mb-2 block">Mission Template:</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      "We exist to [verb] [audience] achieve [outcome] so that [impact]."<br/>
                      <em>Personal Brand:</em> "I exist to [verb] [audience] achieve [outcome] so that [impact]."
                    </p>
                    <Label htmlFor="mission" className="mb-2 block">Your Mission:</Label>
                    <Textarea
                      id="mission"
                      rows={3}
                      placeholder="e.g., We exist to help busy families start their day right so that no one begins stressed."
                      value={data.mission}
                      onChange={(e) => updateData('mission', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="vision" className="text-base mb-2 block">Vision Template:</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      "In [timeframe], [specific change in the world]."
                    </p>
                    <Label htmlFor="vision" className="mb-2 block">Your Vision:</Label>
                    <Textarea
                      id="vision"
                      rows={2}
                      placeholder="e.g., In 5 years, every Phoenix neighborhood has a morning gathering place."
                      value={data.vision5Year}
                      onChange={(e) => updateData('vision5Year', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="bhag" className="text-base mb-2 block">BHAG Template:</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      "[Measurable goal] that [transforms industry/community]."
                    </p>
                    <Label htmlFor="bhag" className="mb-2 block">Your BHAG:</Label>
                    <Textarea
                      id="bhag"
                      rows={2}
                      placeholder="e.g., Become the #1 morning destination in all 50 states using local farms."
                      value={data.bhag10Year}
                      onChange={(e) => updateData('bhag10Year', e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t">
                  <h4 className="font-semibold mb-4">Examples Across Three Brand Types:</h4>
                  <div className="space-y-3">
                    <ExampleBox
                      icon="🏪"
                      title="Brick-and-Mortar Brand - FreshStart Café"
                      content="Mission: We exist to fuel busy families with healthy mornings so that no one starts their day stressed. | Vision: In 5 years, every Phoenix neighborhood has a morning gathering place. | BHAG: Become the #1 morning destination in all 50 states using local farms."
                    />
                    <ExampleBox
                      icon="🎯"
                      title="Service Brand - Business Coach"
                      content="Mission: I exist to help overwhelmed entrepreneurs build systems so they can scale without burning out. | Vision: In 5 years, 10,000 entrepreneurs run businesses that serve them. | BHAG: Eliminate entrepreneurial burnout by teaching systematic business building."
                    />
                    <ExampleBox
                      icon="👤"
                      title="Personal Brand - Marketing Executive"
                      content="Mission: I exist to help B2B SaaS companies achieve predictable growth so they can scale confidently. | Vision: In 5 years, be recognized as the go-to marketing strategist for B2B SaaS scale-ups. | BHAG: Transform how B2B SaaS companies think about systematic marketing growth."
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded mb-4">
                  <p className="text-sm font-medium mb-3">Exercise (10 min): Purpose Draft</p>
                  <ul className="space-y-1 text-sm">
                    <li>1. Write the problem you MOST want to solve</li>
                    <li>2. Why does it matter to YOU personally?</li>
                    <li>3. Draft mission using template</li>
                    <li>4. Read aloud - does it energize you?</li>
                  </ul>
                </div>

                <div className="p-4 bg-accent/10 border border-accent/20 rounded mb-4">
                  <p className="text-sm font-medium mb-2">💡 Quick Win:</p>
                  <p className="text-sm">Can't find your purpose? Ask 5 customers/colleagues why they chose you.</p>
                </div>

                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded">
                  <p className="text-sm font-medium mb-2">⚠️ Red Flag:</p>
                  <p className="text-sm">Generic mission statements don't inspire. Make it personal and specific to YOUR brand and YOUR story.</p>
                </div>

                <AIPromptCard
                  title="🤖 AI Boost - Purpose Builder"
                  context="Use this to craft your complete purpose"
                  prompt={`You are a brand strategist. Help me craft my purpose:

My Business/Product/Service/expertise: [what you do] | Personal story: [why you started] | Target audience: [who] | Brand type: [Brick-and-Mortar/Product/Service/Personal]

• MISSION: [We/I exist to... format] 
• VALUES: [3 core values] + [How each shows up for customers/colleagues]  
• PROMISE: [What you guarantee]
• DIFFERENTIATION: [What competitors/colleagues miss that you deliver]

OUTPUT:
Well articulated mission, values, promise and differentiation that ensures I own the white space in my industry.`}
                />
              </div>

              {/* 1.2 Brand Values & Promise */}
              <div className="mb-8 pt-8 border-t">
                <h3 className="text-xl font-bold mb-4">1.2 Brand Values & Promise</h3>
                <p className="text-muted-foreground mb-4">What you stand for and guarantee</p>

                <div className="bg-primary/10 border-l-4 border-primary p-4 rounded mb-6">
                  <p className="text-sm">
                    <strong>Why This Matters:</strong> Values guide decisions. Promise builds trust. Together, they attract right-fit customers who become loyal fans.
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Choose 3-5 Core Values</h4>
                  <div className="grid md:grid-cols-3 gap-2 mb-4">
                    {["Authenticity", "Excellence", "Innovation", "Integrity", "Simplicity", "Community", "Sustainability", "Empowerment", "Fun"].map((value) => (
                      <label key={value} className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-sm">{value}</span>
                      </label>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`value-${i}`}>Your Value {i}</Label>
                          <Input id={`value-${i}`} placeholder="e.g., Quality" />
                        </div>
                        <div>
                          <Label htmlFor={`value-shows-${i}`}>Shows up as:</Label>
                          <Input id={`value-shows-${i}`} placeholder="e.g., Scratch-made daily" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="promise" className="text-base mb-2 block">Your Brand Promise</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Brick-and-Mortar/Service: "Every time you work with [brand], you can count on _____"<br/>
                    Personal Brand: "Every time someone works with me, they can count on _____"
                  </p>
                  <Textarea
                    id="promise"
                    rows={2}
                    placeholder="e.g., Every time you visit, you can count on fresh food fast with a genuine smile."
                  />
                </div>

                <div className="mt-8 pt-6 border-t">
                  <h4 className="font-semibold mb-4">Examples:</h4>
                  <div className="space-y-3">
                    <ExampleBox
                      icon="🏪"
                      title="Brick-and-Mortar Brand - FreshStart Café"
                      content="Values: Quality (scratch-made daily), Community (know your name), Speed (under 5 min) | Promise: Every time you visit, you can count on fresh food fast with a genuine smile."
                    />
                    <ExampleBox
                      icon="🎯"
                      title="Service Brand - Business Coach"
                      content="Values: Practical (no fluff), Systematic (proven process), Supportive (no judgment) | Promise: Every session delivers actionable next steps you can implement immediately."
                    />
                    <ExampleBox
                      icon="👤"
                      title="Personal Brand - Marketing Executive"
                      content="Values: Data-driven (measure everything), Strategic (think long-term), Results-focused (ROI matters) | Promise: Every strategy I develop is backed by data and designed for measurable growth."
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded mb-4">
                  <p className="text-sm font-medium mb-3">Exercise (5 min): The Promise Test</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Think of your favorite customer/colleague. Write three adjectives they'd use to describe you—these often reveal your authentic values</li>
                    <li>• Can you deliver this promise on your WORST day? If no, simplify until yes.</li>
                  </ul>
                </div>

                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded">
                  <p className="text-sm font-medium mb-2">⚠️ Red Flag:</p>
                  <p className="text-sm">Choosing values and a brand promise you think people want vs. what you actually embody and can deliver leads to inconsistency and broken trust. Ask yourself, can you deliver on the worst day?</p>
                </div>

                <AIPromptCard
                  title="🤖 AI Boost - Values Activator"
                  context="Use this to validate your values"
                  prompt={`You are a brand consultant. Validate my brand values:

My values: [list 3-5] | My target customer/audience: [description] | My competitors/peers focus on: [what] | Brand type: [Brick-and-Mortar/Service/Personal]

DELIVER:
• VALUE CHECK: [Do these match your actions?] + [Customer/colleague evidence needed]
• DIFFERENTIATION: [Which value competitors/peers ignore] + [How to own it]
• PROMISE TEST: [Can you deliver this daily?] + [What to strengthen]
• ACTIVATION: [3 ways each value shows up] + [Policies/behaviors that prove it]`}
                />
              </div>

              {/* 1.3 Brand Pillars */}
              <div className="pt-8 border-t">
                <h3 className="text-xl font-bold mb-4">1.3 Brand Pillars</h3>
                <p className="text-muted-foreground mb-4">Your competitive advantages</p>

                <div className="bg-muted/30 p-4 rounded-lg mb-6">
                  <p className="text-sm">
                    <strong>Pillars vs. Values:</strong> Values are internal beliefs. Pillars are external advantages customers experience. Values are brand principles; pillars are brand advantages.
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-4 bg-muted/30">
                      <p className="text-sm font-semibold mb-3">Pillar {i}</p>
                      <div className="grid md:grid-cols-3 gap-3">
                        <div>
                          <Label htmlFor={`pillar-${i}`} className="text-xs">Pillar</Label>
                          <Input id={`pillar-${i}`} className="mt-1" placeholder="e.g., Speed" />
                        </div>
                        <div>
                          <Label htmlFor={`pillar-shows-${i}`} className="text-xs">How It Shows Up</Label>
                          <Input id={`pillar-shows-${i}`} className="mt-1" placeholder="e.g., Under 5 min" />
                        </div>
                        <div>
                          <Label htmlFor={`pillar-proof-${i}`} className="text-xs">Proof</Label>
                          <Input id={`pillar-proof-${i}`} className="mt-1" placeholder="e.g., Avg: 4:32" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-4">Examples:</h4>
                  <div className="space-y-3">
                    <ExampleBox
                      icon="🏪"
                      title="Brick-and-Mortar Brand - FreshStart Café Pillars"
                      content="Speed → Under 5-min pickup → Average: 4:32 | Local → Daily farm deliveries → 15 partner farms | Family-Friendly → Play area, kids free Sunday → 60% family customers"
                    />
                    <ExampleBox
                      icon="🎯"
                      title="Service Brand - Business Coach Pillars"
                      content="Systems-Based → 90-day framework → 127 successful implementations | No-Fluff → Action-only sessions → 95% say 'immediately useful' | Accountability → Weekly check-ins → 89% complete program"
                    />
                    <ExampleBox
                      icon="👤"
                      title="Personal Brand - Marketing Executive Pillars"
                      content="Scale Experience → Led 3 companies $1M to $10M → Portfolio of results | Framework-Driven → Systematic approach → Documented methodologies | Data-Focused → Measure everything → Track record of ROI improvements"
                    />
                  </div>
                </div>

                <div className="p-4 bg-accent/10 border border-accent/20 rounded mb-4">
                  <p className="text-sm font-medium mb-3">Exercise (10 min): Pillar Discovery</p>
                  <p className="text-sm font-semibold mb-2">For Established Businesses/Careers:</p>
                  <ul className="space-y-1 text-sm mb-3">
                    <li>1. List 10 recent compliments from customers/colleagues</li>
                    <li>2. Find patterns - what's mentioned most?</li>
                    <li>3. Can you deliver this at 3x volume? That's a pillar.</li>
                  </ul>
                  <p className="text-sm font-semibold mb-2">For New Businesses/Career Transitions (No Customers Yet):</p>
                  <ul className="space-y-1 text-sm">
                    <li>1. List your 10 strongest capabilities/experiences</li>
                    <li>2. Identify 3-5 things you can do better than most</li>
                    <li>3. Match these to customer needs from your research</li>
                    <li>4. Validate: "I can deliver this consistently because _____"</li>
                  </ul>
                </div>

                <div className="p-4 bg-accent/10 border border-accent/20 rounded mb-4">
                  <p className="text-sm font-medium mb-2">💡 Quick Win:</p>
                  <p className="text-sm">"We're the only ones who _____ as proven by _____"</p>
                </div>

                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded">
                  <p className="text-sm font-medium mb-2">⚠️ Red Flag:</p>
                  <p className="text-sm">Having more than 5 pillars dilutes focus. Less is more.</p>
                </div>
              </div>

              {/* Section 1 Checkpoint */}
              <div className="mt-8 pt-6 border-t bg-accent/10 border-l-4 border-accent p-4 rounded">
                <p className="font-semibold mb-3">Section 1 Checkpoint ✓</p>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Mission that energizes you</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>3-5 values with examples</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Promise you can always deliver</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>3-5 pillars that differentiate</span>
                  </label>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Section 2: Brand Identity */}
        <Collapsible>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <h2 className="text-2xl font-bold mb-6 pb-3 border-b flex items-center justify-between hover:text-primary transition-colors">
                Section 2: Brand Identity (How You Show Up)
                <ChevronDown className="h-6 w-6 transition-transform duration-200" />
              </h2>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="bg-primary/10 border-l-4 border-primary p-4 rounded mb-6 mt-6">
                <p className="text-sm">
                  <strong>Why This Section Matters:</strong> Consistent identity increases revenue by 23%. People need to see you at least 7 times before buying - make each time count.
                </p>
              </div>

              {/* 2.1 Visual Identity System */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">2.1 Visual Identity System</h3>
                <p className="text-muted-foreground mb-4">Your brand's face</p>

                <div className="bg-muted/30 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold mb-3">Color Psychology Quick Guide:</h4>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <p><strong>Red</strong> = Urgency, passion</p>
                    <p><strong>Blue</strong> = Trust, stability</p>
                    <p><strong>Green</strong> = Growth, health</p>
                    <p><strong>Yellow</strong> = Optimism, clarity</p>
                    <p><strong>Black</strong> = Luxury, sophistication</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Interactive Color Pickers */}
                  <Card className="p-6 bg-muted/20">
                    <h4 className="font-semibold mb-4">Your Visual Identity</h4>
                    <div className="space-y-4">
                      {([
                        { id: "primary", label: "Primary Color", desc: "Main recognition", field: "primaryColor" },
                        { id: "secondary", label: "Secondary Color", desc: "Support", field: "secondaryColor" },
                        { id: "accent", label: "Accent Color", desc: "CTAs only", field: "accentColor" }
                      ] as const).map((color) => {
                        const colorValue = (data[color.field] as string) || "#000000";
                        const psychology = getColorPsychology(colorValue);
                        
                        return (
                          <div key={color.id}>
                            <Label htmlFor={color.id} className="mb-2 block">{color.label}</Label>
                            <p className="text-xs text-muted-foreground mb-2">{color.desc}</p>
                            <div className="flex items-center gap-4">
                              <input
                                type="color"
                                id={color.id}
                                className="w-20 h-10 rounded cursor-pointer border-2 border-border"
                                value={colorValue}
                                onChange={(e) => updateData(color.field, e.target.value)}
                              />
                              <Input
                                value={colorValue}
                                onChange={(e) => updateData(color.field, e.target.value)}
                                placeholder="#000000"
                                className="w-32"
                              />
                              {psychology && (
                                <p className="text-sm text-muted-foreground flex-1">
                                  Psychology: {psychology}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}

                      <div>
                        <Label htmlFor="heading-font">Heading Font</Label>
                        <Input id="heading-font" placeholder="e.g., Montserrat" />
                        <p className="text-xs text-muted-foreground mt-1">Titles and Headlines</p>
                      </div>
                      <div>
                        <Label htmlFor="body-font">Body Font</Label>
                        <Input id="body-font" placeholder="e.g., Open Sans" />
                        <p className="text-xs text-muted-foreground mt-1">Reading/Body</p>
                      </div>
                      <div>
                        <Label htmlFor="accent-font">Accent Font</Label>
                        <Input id="accent-font" placeholder="e.g., Playfair Display" />
                        <p className="text-xs text-muted-foreground mt-1">CTAs or Quotes</p>
                      </div>
                      <div>
                        <Label htmlFor="photo-style">Photography Style</Label>
                        <Input id="photo-style" placeholder="e.g., bright, natural, bold" />
                        <p className="text-xs text-muted-foreground mt-1">Reflects brand personality</p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded mb-4">
                  <p className="text-sm font-medium mb-3">Exercise (15 min): Visual Foundation</p>
                  <ul className="space-y-1 text-sm">
                    <li>1. Pick 3 colors that match your brand personality</li>
                    <li>2. Choose 3 fonts (heading + body + accent)</li>
                    <li>3. Select a photography style (bright, natural, bold, etc.)</li>
                    <li>4. Create one social template</li>
                    <li>5. Use everywhere for 30 days</li>
                  </ul>
                </div>

                <div className="p-4 bg-accent/10 border border-accent/20 rounded">
                  <p className="text-sm font-medium mb-2">💡 Quick Win:</p>
                  <p className="text-sm">Create a Canva brand kit/Mood board - free and saves hours.</p>
                </div>

                <AIPromptCard
                  title="🤖 AI Boost - Visual Direction"
                  context="Use this to get AI guidance on your visual identity"
                  prompt={`You are a visual brand designer. Create my brand identity:

My brand personality: [3 adjectives] | Target audience: [demographics] | Competitors/peers use: [their colors, style] | Brand type: [Brick-and-Mortar/Product/Service/Personal]

SUGGEST:
• COLOR PALETTE: [3 hex codes] + [Psychology behind each]
• FONT PAIRINGS: [Heading + body + accent] + [Why they work]
• PHOTOGRAPHY STYLE: [Specific direction] + [3 mood words]
• AVOID LIST: [What not to use] + [Why it won't work for my audience]`}
                />
              </div>

              {/* 2.2 Verbal Identity & Voice */}
              <div className="mb-8 pt-8 border-t">
                <h3 className="text-xl font-bold mb-4">2.2 Verbal Identity & Voice</h3>
                <p className="text-muted-foreground mb-4">How you sound</p>

                <div className="bg-muted/30 p-4 rounded-lg mb-6">
                  <p className="text-sm mb-3">
                    <strong>Brand Voice:</strong> Your brand voice is how your personality and character comes through in words, it never changes and is consistent across every interaction.
                  </p>
                  <h4 className="font-semibold mb-2">Understanding Voice Components:</h4>
                  <ul className="space-y-1 text-sm">
                    <li><strong>Brand Voice:</strong> Your overall personality (timeless traits)</li>
                    <li><strong>Tagline:</strong> Memorable phrase that captures your essence (≤7 words)</li>
                    <li><strong>One-Liner:</strong> Clear statement of what you do for whom</li>
                    <li><strong>Key Phrases:</strong> Signature words you use consistently</li>
                  </ul>
                </div>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="voice-are">We/I ARE (3 words)</Label>
                      <Input 
                        id="voice-are" 
                        placeholder="e.g., Friendly, Energetic, Reliable"
                        value={data.brandVoiceAre}
                        onChange={(e) => updateData('brandVoiceAre', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="voice-not">We/I are NOT (3 words)</Label>
                      <Input 
                        id="voice-not" 
                        placeholder="e.g., Corporate, Rushed, Impersonal"
                        value={data.brandVoiceNot}
                        onChange={(e) => updateData('brandVoiceNot', e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tagline">Tagline (≤7 words)</Label>
                    <Input 
                      id="tagline" 
                      placeholder="e.g., Mornings made delicious"
                      value={data.tagline}
                      onChange={(e) => updateData('tagline', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="oneliner" className="mb-2 block">One-Liner</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Brick-and-Mortar/Product/Service: "We help [who] achieve [what] through [how] so they can [benefit]."<br/>
                      Personal Brand: "I help [who] achieve [what] through [how] so they can [benefit]."
                    </p>
                    <Textarea
                      id="oneliner"
                      rows={2}
                      placeholder="e.g., We help busy families start their day right with 5-minute chef-quality breakfasts."
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded">
                  <p className="text-sm font-medium mb-3">Exercise (10 min): Voice Test</p>
                  <p className="text-sm">Write 3 social posts. Do they sound like the same person?</p>
                </div>

                <div className="mt-8 pt-6 border-t">
                  <h4 className="font-semibold mb-4">Examples:</h4>
                  <div className="space-y-3">
                    <ExampleBox
                      icon="🏪"
                      title="Brick-and-Mortar Brand - FreshStart Café"
                      content="Voice: Friendly, Energetic, Reliable | NOT: Corporate, Rushed, Impersonal | Tagline: Mornings made delicious | One-liner: We help busy families start their day right with 5-minute chef-quality breakfasts."
                    />
                    <ExampleBox
                      icon="🎯"
                      title="Service Brand - Business Coach"
                      content="Voice: Direct, Supportive, Practical | NOT: Fluffy, Overwhelming, Preachy | Tagline: Systems that scale | One-liner: I help overwhelmed entrepreneurs build profitable systems in 90 days without working more hours."
                    />
                    <ExampleBox
                      icon="👤"
                      title="Personal Brand - Marketing Executive"
                      content="Voice: Strategic, Data-driven, Results-focused | NOT: Theoretical, Salesy, Vague | Tagline: Growth through systems | One-liner: I help B2B SaaS companies scale predictably using systematic marketing frameworks proven at 3 companies."
                    />
                  </div>
                </div>
              </div>

              {/* 2.3 Brand Story */}
              <div className="pt-8 border-t">
                <h3 className="text-xl font-bold mb-4">2.3 Brand Story</h3>
                <p className="text-muted-foreground mb-4">Your emotional connection</p>

                <div className="bg-primary/10 border-l-4 border-primary p-4 rounded mb-6">
                  <p className="text-sm">
                    <strong>Why Stories Matter:</strong> Stories are 22x more memorable than facts. They create emotional connection, which drives 95% of purchases.
                  </p>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold mb-3">Story Structure (150 words max)</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>The Problem:</strong> "I saw [problem] and knew there had to be a better way..."</li>
                    <li><strong>The Solution:</strong> "So I created/developed [solution] that [unique approach]..."</li>
                    <li><strong>The Transformation:</strong> "Now customers/clients [result] and feel [emotion]..."</li>
                    <li><strong>The Vision:</strong> "We're/I'm building toward [future impact]..."</li>
                  </ul>
                </div>

                <div>
                  <Label htmlFor="story">Your Story:</Label>
                  <Textarea
                    id="story"
                    rows={6}
                    placeholder="Write your brand story here..."
                  />
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-4">Examples:</h4>
                  <div className="space-y-3">
                    <ExampleBox
                      icon="🏪"
                      title="Brick-and-Mortar Brand - FreshStart Café"
                      content="I started FreshStart Café because I saw busy families skipping breakfast. People felt tired and disconnected. So I created a café with customizable bowls and pre-order options to save time and bring families together. Now customers start the day energized, and our community gathers every morning. We're on a mission to make healthy mornings the new normal!"
                    />
                    <ExampleBox
                      icon="🎯"
                      title="Service Brand - Business Coach"
                      content="I became a business coach after burning out scaling my third company. Entrepreneurs were working 80+ hours with no systems. So I developed a 90-day framework that creates profitable processes without the overwhelm. Now clients build businesses that serve them, not consume them. I'm building a world where entrepreneurship enhances life, not dominates it."
                    />
                    <ExampleBox
                      icon="👤"
                      title="Personal Brand - Marketing Executive"
                      content="I focus on systematic B2B marketing because I've seen too many companies waste millions on random tactics. After leading marketing at three scale-ups from $1M to $10M ARR, I developed frameworks that eliminate guesswork. Now the companies I work with achieve predictable, sustainable growth. I'm proving that marketing can be as systematic as engineering."
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded">
                  <p className="text-sm font-medium mb-2">⚠️ Red Flag:</p>
                  <p className="text-sm">Making yourself the hero instead of the guide. Your customer/client/employer is the hero, you are the guide helping your hero transform.</p>
                </div>

                <AIPromptCard
                  title="🤖 AI Boost - Story Builder"
                  context="Use this to craft your compelling brand story"
                  prompt={`You are a StoryBrand-certified copywriter. Create my brand story:

My background: [experience] | Problem I solve: [what] | Solution: [how] | Customer/client transformation: [result] | Brand type: [Brick-and-Mortar/Service/Personal]

CREATE:
• BRAND STORY: [250 words using StoryBrand framework]
• EMOTIONAL HOOKS: [3 phrases that connect with pain/desire]
• PROOF POINTS: [Evidence this transformation happens]
• STORY VARIATIONS: [30-second elevator pitch version]`}
                />
              </div>

              {/* Section 2 Checkpoint */}
              <div className="mt-8 pt-6 border-t bg-accent/10 border-l-4 border-accent p-4 rounded">
                <p className="font-semibold mb-3">Section 2 Checkpoint ✓</p>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Visual identity created (colors, fonts)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Voice defined (3 are/3 are not)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Tagline under 7 words</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Story under 150 words</span>
                  </label>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Section 3: Positioning & Experience */}
        <Collapsible>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <h2 className="text-2xl font-bold mb-6 pb-3 border-b flex items-center justify-between hover:text-primary transition-colors">
                Section 3: Positioning & Experience
                <ChevronDown className="h-6 w-6 transition-transform duration-200" />
              </h2>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="bg-primary/10 border-l-4 border-primary p-4 rounded mb-6 mt-6">
                <p className="text-sm">
                  <strong>Why This Section Matters:</strong> Clear positioning reduces marketing costs by 30%. Designed experiences generate 3x more referrals.
                </p>
              </div>

              {/* 3.1 Competitive Positioning */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">3.1 Competitive Positioning</h3>
                <p className="text-muted-foreground mb-4">Your unique space</p>

                <div className="space-y-4 mb-6">
                  <h4 className="font-semibold">Competitor Analysis</h4>
                  <p className="text-xs text-muted-foreground mb-3">Data automatically pulled from Workbook 0</p>
                  {(() => {
                    // Get competitor data from localStorage
                    const saved = localStorage.getItem('workbook0LocalData');
                    const workbook0Data = saved ? JSON.parse(saved) : { competitors: Array(3).fill({ name: '', promise: '', miss: '' }) };
                    
                    return [1, 2, 3].map((i) => {
                      const competitor = workbook0Data.competitors[i-1] || { name: '', promise: '', miss: '' };
                      return (
                        <Card key={i} className="p-4 bg-muted/30">
                          <p className="text-sm font-semibold mb-3">
                            Competitor {i}
                            {competitor.name && <span className="text-muted-foreground font-normal ml-2">- {competitor.name}</span>}
                          </p>
                          <div className="grid md:grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs">What They Promise</Label>
                              <p className="text-sm mt-1 p-2 bg-background rounded border">{competitor.promise || 'N/A'}</p>
                            </div>
                            <div>
                              <Label className="text-xs">What They Miss</Label>
                              <p className="text-sm mt-1 p-2 bg-background rounded border">{competitor.miss || 'N/A'}</p>
                            </div>
                          </div>
                        </Card>
                      );
                    });
                  })()}

                  <div>
                    <Label htmlFor="gap">The Gap: What do ALL competitors miss?</Label>
                    <Textarea id="gap" rows={2} className="mt-2" />
                  </div>
                </div>

                <div className="mb-6">
                  <Label htmlFor="positioning" className="text-base mb-2 block">Your Positioning Statement</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Brick-and-Mortar/Service: "For [target] who [need], [brand] is the [category] that [unique benefit] because [proof]."<br/>
                    Personal Brand: "For [target] who [need], I'm the [role/expert] that [unique benefit] because [proof]."
                  </p>
                  <Textarea
                    id="positioning"
                    rows={3}
                    placeholder="e.g., For busy Phoenix families, FreshStart is the neighborhood spot for chef-quality breakfasts ready fast, thanks to daily local farm deliveries."
                  />
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Target Audience Snapshot</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="demographics">Demographics</Label>
                      <Input id="demographics" placeholder="Age, income, location" />
                    </div>
                    <div>
                      <Label htmlFor="psychographics">Psychographics</Label>
                      <Input id="psychographics" placeholder="Values, fears, dreams" />
                    </div>
                    <div>
                      <Label htmlFor="find-them">Where to find them</Label>
                      <Input id="find-them" placeholder="e.g., Local parent Facebook groups, school partnerships" />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-4">Examples:</h4>
                  <div className="space-y-3">
                    <ExampleBox
                      icon="🏪"
                      title="Brick-and-Mortar Brand - FreshStart Café"
                      content="For busy Phoenix families, FreshStart is the neighborhood spot for chef-quality breakfasts ready fast, thanks to daily local farm deliveries."
                    />
                    <ExampleBox
                      icon="🎯"
                      title="Service Brand - Business Coach"
                      content="For overwhelmed solopreneurs who want to scale, I'm the business coach who builds profitable systems in 90 days because I've systematized 5 businesses without burnout."
                    />
                    <ExampleBox
                      icon="👤"
                      title="Personal Brand - Marketing Executive"
                      content="For B2B SaaS CEOs who struggle with unpredictable growth, I'm the marketing executive who delivers systematic scale because I've led 3 companies from $1M to $10M ARR using proven frameworks."
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded">
                  <p className="text-sm font-medium mb-3">Exercise (15 min): Position Validation</p>
                  <ul className="space-y-1 text-sm">
                    <li>1. Share positioning with 5 target customers/connections.</li>
                    <li>2. Ask: "Does this describe what you need?"</li>
                    <li>3. Refine based on feedback.</li>
                  </ul>
                </div>

                <AIPromptCard
                  title="🤖 AI Boost - Position Finder"
                  context="Use this to identify your unique market position"
                  prompt={`You are a positioning strategist. Find my unique market position:

My target: [who] | Competitors/peers: [list 3 with their positioning] | My strengths: [what you do best] | Brand type: [Brick-and-Mortar/Service/Personal]

IDENTIFY:
• WHITE SPACE: [Position no one owns] + [Why it's available]
• POSITIONING OPTIONS: [3 different strategies] + [Pros/cons of each]
• COMPETITIVE MOAT: [What competitors/peers can't copy] + [How to strengthen it]
• VALIDATION TEST: [3 questions to ask prospects/connections] + [Success criteria]`}
                />
              </div>

              {/* 3.2 Customer Experience Blueprint */}
              <div className="pt-8 border-t">
                <h3 className="text-xl font-bold mb-4">3.2 Customer Experience Blueprint</h3>
                <p className="text-muted-foreground mb-4">Designing delight</p>

                <div className="bg-primary/10 border-l-4 border-primary p-4 rounded mb-6">
                  <p className="text-sm">
                    <strong>Why This Matters:</strong> Your brand is every interaction. One bad experience undoes years of marketing.
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-4">Journey Mapping</h4>
                  <div className="space-y-4">
                    {[
                      { stage: "Awareness", touchpoint: "First contact", feeling: "Curious", action: "Clear value", metric: "Views" },
                      { stage: "Consideration", touchpoint: "Research", feeling: "Confident", action: "Social proof", metric: "Engagement" },
                      { stage: "Purchase/Hire", touchpoint: "Transaction", feeling: "Certain", action: "Easy process", metric: "Conversion" },
                      { stage: "Delivery", touchpoint: "Experience", feeling: "Delighted", action: "Exceed promise", metric: "Satisfaction" },
                      { stage: "Post-Purchase", touchpoint: "Follow-up", feeling: "Valued", action: "Stay connected", metric: "Referrals" }
                    ].map((item, idx) => (
                      <Card key={idx} className="p-4 bg-muted/30">
                        <div className="grid md:grid-cols-5 gap-3 items-center">
                          <div>
                            <p className="text-xs text-muted-foreground">Stage</p>
                            <p className="text-sm font-semibold">{item.stage}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Touchpoint</p>
                            <p className="text-sm">{item.touchpoint}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Desired Feeling</p>
                            <p className="text-sm">{item.feeling}</p>
                          </div>
                          <div>
                            <Label htmlFor={`action-${idx}`} className="text-xs">Your Action</Label>
                            <Input id={`action-${idx}`} className="mt-1" placeholder={`${item.action} _____`} />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Metric</p>
                            <p className="text-sm">{item.metric}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Design Your Peak Moment</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="peak-moment">What's the ONE moment customers remember most?</Label>
                      <Input id="peak-moment" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="make-remarkable">How can you make it remarkable?</Label>
                      <Textarea id="make-remarkable" rows={2} className="mt-2" />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold mb-4">Create One SOP (Standard Operating Procedure)</h4>
                  <Card className="p-4 bg-muted/30">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="sop-process">Process:</Label>
                        <Input id="sop-process" className="mt-1" placeholder="e.g., Morning Rush" />
                      </div>
                      <div>
                        <Label htmlFor="sop-trigger">Trigger: What starts it?</Label>
                        <Input id="sop-trigger" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="sop-steps">Steps: 1-2-3-4-5</Label>
                        <Textarea id="sop-steps" rows={3} className="mt-1" placeholder="List each step..." />
                      </div>
                      <div>
                        <Label htmlFor="sop-quality">Quality Bar: What's "done well"?</Label>
                        <Input id="sop-quality" className="mt-1" />
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-4">Examples:</h4>
                  <div className="space-y-3">
                    <ExampleBox
                      icon="🏪"
                      title="Brick-and-Mortar Brand - FreshStart SOP - Morning Rush"
                      content="Greet in 10 seconds → Suggest if they look rushed → Confirm order → Process payment → Call name when ready | Quality: Under 5 minutes, hot, correct"
                    />
                    <ExampleBox
                      icon="🎯"
                      title="Service Brand - Business Coach SOP - First Session"
                      content="Review intake form → Identify top 3 priorities → Create action plan → Schedule next check-in → Send summary + resources | Quality: Clear next steps, feels supported"
                    />
                    <ExampleBox
                      icon="👤"
                      title="Personal Brand - Marketing Executive SOP - Strategy Presentation"
                      content="Research company thoroughly → Prepare data-backed insights → Present frameworks, not tactics → Address specific challenges → Follow up with detailed plan | Quality: Strategic depth, actionable recommendations"
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded">
                  <p className="text-sm font-medium mb-3">Exercise (10 min): Peak Moment Design</p>
                  <ul className="space-y-1 text-sm">
                    <li>1. Identify customer's best moment with you</li>
                    <li>2. Add one unexpected delight</li>
                    <li>3. Test with next 5 customers</li>
                  </ul>
                </div>
              </div>

              {/* Section 3 Checkpoint */}
              <div className="mt-8 pt-6 border-t bg-accent/10 border-l-4 border-accent p-4 rounded">
                <p className="font-semibold mb-3">Section 3 Checkpoint ✓</p>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Competitive gaps identified</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Positioning statement tested</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Journey mapped</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>One SOP created</span>
                  </label>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Section 4: Implementation Sprint */}
        <Collapsible>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <h2 className="text-2xl font-bold mb-6 pb-3 border-b flex items-center justify-between hover:text-primary transition-colors">
                Section 4: Implementation Sprint
                <ChevronDown className="h-6 w-6 transition-transform duration-200" />
              </h2>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="bg-primary/10 border-l-4 border-primary p-4 rounded mb-6 mt-6">
                <p className="text-sm">
                  <strong>Why This Section Matters:</strong> Strategy without implementation is just expensive planning. This sprint gets your brand live in 7 days.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">7-Day Brand Rollout</h3>
                <div className="space-y-3">
                  {[
                    { days: "Days 1-2", title: "Visual Updates", items: ["Logo everywhere", "Colors consistent", "Email signature with updated tagline"] },
                    { days: "Days 3-4", title: "Verbal Updates", items: ["All bios same voice", "Tagline everywhere", "Content templates"] },
                    { days: "Days 5-6", title: "Experience Design", items: ["Map journey", "Create one SOP", "Design peak moment"] },
                    { days: "Day 7", title: "Consistency Check", items: ["Audit all touchpoints", "Fix misalignments", "Celebrate!"] }
                  ].map((phase, idx) => (
                    <Card key={idx} className="p-4 bg-muted/30">
                      <p className="font-semibold mb-2">{phase.days}: {phase.title}</p>
                      <ul className="space-y-1 text-sm">
                        {phase.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <input type="checkbox" className="w-4 h-4" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </div>

              {/* One-Page Brand Guide */}
              <BrandGuide data={data} />

              <div className="mt-8 p-4 bg-accent/10 border border-accent/20 rounded">
                <p className="text-sm font-medium mb-2">Exercise (30 min): Quick Win Sweep</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Update all social bios NOW</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Fix email signature</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>Apply colors everywhere visible</span>
                  </li>
                </ul>
              </div>

              <AIPromptCard
                title="🤖 AI Boost - Brand Validator"
                context="Use this for a final audit of your brand foundation"
                prompt={`You are a brand consultant. Audit my complete brand foundation:

Foundation: [Mission, values, promise] | Visual: [Colors, fonts] | Voice: [3 traits] | Positioning: [statement] | Brand type: [Brick-and-Mortar/Service/Personal]

DELIVER:
• CLARITY SCORE: [1-10] + [Biggest confusion to fix]
• MARKET FIT: [Strong/Weak] + [One positioning adjustment]
• CONSISTENCY CHECK: [Where brand breaks down] + [Quick fix]
• READY FOR MARKETING: [Yes/No] + [What to strengthen first]`}
              />
            </CollapsibleContent>
          </Card>
        </Collapsible>


        {/* Troubleshooting Guide */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b">
            Troubleshooting Guide
          </h2>
          
          <div className="space-y-4">
            {[
              { problem: "Can't define purpose", solution: "Interview 5 customers/colleagues about why they chose you" },
              { problem: "Brand feels generic", solution: "Narrow target audience by 50%" },
              { problem: "No time for this", solution: "15 minutes daily beats 4-hour blocks" },
              { problem: "Can't afford design", solution: "Consistency beats fancy. Use Canva free." }
            ].map((item, idx) => (
              <Card key={idx} className="p-4 bg-muted/30">
                <p className="font-semibold mb-2">"{item.problem}"</p>
                <p className="text-sm text-muted-foreground">→ {item.solution}</p>
              </Card>
            ))}
          </div>
        </Card>

        {/* Quick Wins */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b">
            Quick Wins (Next Hour)
          </h2>
          
          <div className="space-y-3">
            {[
              { num: 1, task: "Write mission", time: "5 min" },
              { num: 2, task: "Pick 3 colors", time: "5 min" },
              { num: 3, task: "Update all bios", time: "10 min" },
              { num: 4, task: "Create email signature", time: "5 min" },
              { num: 5, task: "Define 3 values", time: "5 min" }
            ].map((item) => (
              <label key={item.num} className="flex items-center gap-3 p-3 bg-background rounded hover:bg-muted/50 transition-colors cursor-pointer">
                <input type="checkbox" className="w-5 h-5" />
                <span className="font-semibold text-lg">{item.num}.</span>
                <span className="flex-1">{item.task}</span>
                <span className="text-sm text-muted-foreground">({item.time})</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Bridge to Workbook 2 */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b flex items-center gap-2">
            <span>🔗</span> Bridge to Workbook 2
          </h2>
          
          <p className="text-muted-foreground mb-4">
            Your brand foundation becomes your marketing filter:
          </p>

          <div className="grid md:grid-cols-2 gap-3 mb-6">
            {[
              { label: "Purpose", becomes: "Content themes" },
              { label: "Pillars", becomes: "Content categories" },
              { label: "Voice", becomes: "Message consistency" },
              { label: "Journey", becomes: "Campaign flow" },
              { label: "Position", becomes: "Targeting focus" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 bg-background rounded">
                <span className="font-semibold">{item.label}</span>
                <span className="text-muted-foreground">→</span>
                <span className="text-sm">{item.becomes}</span>
              </div>
            ))}
          </div>

          <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
            <p className="font-semibold mb-3">You're ready for Workbook 2: Marketing Strategy Execution when you have:</p>
            <div className="space-y-2">
              {[
                "Clear brand foundation that energizes you",
                "Consistent visual and verbal identity",
                "Customer experience mapped",
                "Brand guide documented"
              ].map((item, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <span className="text-accent">✅</span>
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>
            <p className="text-sm mt-4 font-medium">
              Next step: Build a strategic marketing system that amplifies your brand and drives systematic growth.
            </p>
          </div>
        </Card>


        {/* Recommended Tech Stack */}
        <Collapsible>
          <Card className="p-8 mb-8 border-2 border-muted">
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                <h2 className="text-2xl font-bold">Recommended Tech Stack For Brand Building</h2>
                <ChevronDown className="h-6 w-6 transition-transform duration-200" />
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="mt-6 space-y-6">
                <div className="border-l-4 border-accent p-4 bg-accent/5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📧</span>
                    <h3 className="font-bold text-lg">Email & Social Management</h3>
                  </div>
                  <p className="font-semibold mb-1">Constant Contact</p>
                  <p className="text-sm text-muted-foreground mb-2">Launch your brand consistently across email and social media</p>
                  <p className="text-xs italic">Why it works: Schedule brand launch content in advance; build your email list from day one</p>
                </div>

                <div className="border-l-4 border-accent p-4 bg-accent/5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🎨</span>
                    <h3 className="font-bold text-lg">Design</h3>
                  </div>
                  <p className="font-semibold mb-1">Canva</p>
                  <p className="text-sm text-muted-foreground mb-2">Create professional brand assets without hiring a designer</p>
                  <p className="text-xs italic">Why it works: Templates for logos, social graphics, presentations, and more</p>
                </div>

                <div className="border-l-4 border-accent p-4 bg-accent/5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🌐</span>
                    <h3 className="font-bold text-lg">Web Presence</h3>
                  </div>
                  <p className="font-semibold mb-1">GoDaddy</p>
                  <p className="text-sm text-muted-foreground mb-2">Professional domain + business email</p>
                  <p className="text-xs italic">Why it works: Securing your domain early on websites and social media ensures your brand's name belongs to you. [yourname]@yourbusiness.com beats gmail most of the time.</p>
                </div>

                <div className="border-l-4 border-accent p-4 bg-accent/5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">📅</span>
                    <h3 className="font-bold text-lg">Client Onboarding</h3>
                  </div>
                  <p className="font-semibold mb-1">Calendly</p>
                  <p className="text-sm text-muted-foreground mb-2">Brand-consistent booking pages</p>
                  <p className="text-xs italic">Why it works: Customizable to match your brand colors and messaging</p>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Congratulations */}
        <Collapsible>
          <Card className="p-8 mb-8 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-2 border-primary">
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center gap-4 mb-4 justify-between hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-4">
                  <PartyPopper className="w-12 h-12 text-primary" />
                  <div className="text-left">
                    <h2 className="text-2xl font-bold">Congratulations! 🎉</h2>
                    <p className="text-muted-foreground">You've completed Workbook 1</p>
                  </div>
                </div>
                <ChevronDown className="h-6 w-6 transition-transform duration-200" />
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="space-y-4">
                <p className="text-lg">
                  You've built a brand foundation that guides every decision.
                </p>
                
                <div className="bg-background/50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">What You've Accomplished:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>Clarity on what you stand for</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>Consistency across touchpoints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>Connection with right people</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>Confidence to grow</span>
                    </li>
                  </ul>
                </div>

                <p className="text-muted-foreground">
                  Whether you're building a brick-and-mortar business, launching a service, or establishing thought leadership, your brand is no longer a mystery—it's a magnet.
                </p>

                <div className="bg-background/50 p-4 rounded-lg">
                  <p className="font-semibold mb-3">The Complete BLKBLD Journey Ahead:</p>
                  <ul className="space-y-2 text-sm">
                    <li>✅ <strong>WORKBOOK 0:</strong> Market opportunity validated</li>
                    <li>✅ <strong>WORKBOOK 1:</strong> Brand foundation built</li>
                    <li>→ <strong>WORKBOOK 2:</strong> Strategic marketing system aligned with your brand</li>
                    <li>→ <strong>WORKBOOK 3:</strong> Automated customer experience that builds loyalty</li>
                    <li>→ <strong>WORKBOOK 4:</strong> Data-driven optimization and systematic scaling</li>
                  </ul>
                </div>

                <p className="text-lg font-semibold mt-6 mb-2">Ready for Workbook 2: Marketing Strategy Execution!</p>

                <p className="text-sm text-muted-foreground italic">
                  This workbook works for brick-and-mortar brands, service brands, and personal brands. Same strategic foundation, different applications. You now have the clarity to build, market, and scale with confidence.
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

        <div className="flex justify-end">
          <Button variant="hero" size="lg" asChild>
            <a href="/workbook/2">Continue to Workbook 2: Marketing Strategy →</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
