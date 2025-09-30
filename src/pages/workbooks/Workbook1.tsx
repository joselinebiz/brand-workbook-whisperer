import { WorkbookHeader } from "@/components/WorkbookHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { AIPromptCard } from "@/components/AIPromptCard";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lightbulb, Target, Eye, Award } from "lucide-react";

export default function Workbook1() {
  return (
    <div className="min-h-screen bg-background">
      <WorkbookHeader
        number="01"
        title="BRAND STRATEGY FOUNDATION"
        subtitle="Build the Foundation That Makes Marketing Easier and More Effective"
      />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Introduction */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-card to-muted/20">
          <h2 className="text-2xl font-bold mb-4">What You'll Walk Away With</h2>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Clear brand foundation that guides every decision</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Visual and verbal identity system</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Customer experience blueprint</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Ready-to-use templates with AI prompts</span>
            </li>
          </ul>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-background rounded-lg border">
              <p className="text-sm font-medium mb-1">Prerequisites</p>
              <p className="text-xs text-muted-foreground">Completed Workbook 0</p>
            </div>
            <div className="p-4 bg-background rounded-lg border">
              <p className="text-sm font-medium mb-1">Time Required</p>
              <p className="text-xs text-muted-foreground">2-4 hours</p>
            </div>
          </div>
        </Card>

        {/* Section 1: Brand Purpose & Mission */}
        <Card className="p-8 mb-8">
          <SectionHeader
            number="1"
            title="Brand Purpose & Mission"
            description="Why you exist beyond profit"
            icon={<Target className="w-8 h-8" />}
          />

          <div className="space-y-6">
            <div className="bg-muted/30 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-3">Quick Definitions:</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Mission:</strong> What you do daily</p>
                <p><strong>Vision:</strong> Where you're headed in 5 years</p>
                <p><strong>BHAG:</strong> Your 10-year moonshot (Big Hairy Audacious Goal)</p>
              </div>
            </div>

            <div>
              <Label htmlFor="mission" className="text-base mb-2 block">
                Your Mission Statement
              </Label>
              <p className="text-sm text-muted-foreground mb-3">
                "We exist to [verb] [audience] achieve [outcome] so that [impact]."
              </p>
              <Textarea
                id="mission"
                rows={3}
                placeholder="e.g., We exist to help small business owners build strategic brands so that they can compete with larger competitors and win their market."
              />
            </div>

            <div>
              <Label htmlFor="vision" className="text-base mb-2 block">
                Your Vision (5-year)
              </Label>
              <p className="text-sm text-muted-foreground mb-3">
                "In [timeframe], [specific change in the world]."
              </p>
              <Textarea
                id="vision"
                rows={2}
                placeholder="e.g., In 5 years, 10,000 entrepreneurs will have built profitable brands using our frameworks."
              />
            </div>

            <div>
              <Label htmlFor="bhag" className="text-base mb-2 block">
                Your BHAG (10-year)
              </Label>
              <p className="text-sm text-muted-foreground mb-3">
                "[Measurable goal] that [transforms industry/community]."
              </p>
              <Textarea
                id="bhag"
                rows={2}
                placeholder="e.g., Build 100,000 strategic brands that transform their industries."
              />
            </div>
          </div>

          {/* AI Boost Section */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-accent" />
              🤖 AI BOOST
            </h3>
            <div className="space-y-4">
              <AIPromptCard
                title="Prompt 1 - Mission Refinement"
                context="Use this after you've written your first draft"
                prompt={`Review my mission statement: [paste your mission]

Evaluate:
1. Is the verb action-oriented and specific?
2. Is the audience clearly defined?
3. Is the outcome tangible and measurable?
4. Does the impact statement inspire?

Provide 3 improved versions with explanations.`}
              />

              <AIPromptCard
                title="Prompt 2 - BHAG Reality Check"
                context="Test if your goal is audacious enough"
                prompt={`My BHAG is: [paste your BHAG]

Assess:
1. Is it 10+ years to achieve?
2. Would it fundamentally transform the industry?
3. Is it measurable and specific?
4. Does it inspire action today?

If not audacious enough, suggest 3 bolder versions.`}
              />
            </div>
          </div>
        </Card>

        {/* Section 2: Core Values */}
        <Card className="p-8 mb-8">
          <SectionHeader
            number="2"
            title="Core Values & Brand Pillars"
            description="3-5 non-negotiable principles that guide every decision"
            icon={<Award className="w-8 h-8" />}
          />

          <div className="space-y-6">
            <div className="bg-accent/5 border-l-4 border-accent p-4 rounded">
              <p className="text-sm font-medium">
                Core values aren't marketing fluff—they're decision filters. If a value doesn't help you make hard choices, it's not a real value.
              </p>
            </div>

            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="p-6 bg-muted/20">
                <h4 className="font-semibold mb-4">Core Value {i}</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`value-name-${i}`}>Value Name</Label>
                    <Input
                      id={`value-name-${i}`}
                      placeholder="e.g., Radical Transparency"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`value-shows-${i}`}>How it shows up in daily operations</Label>
                    <Textarea
                      id={`value-shows-${i}`}
                      rows={2}
                      placeholder="e.g., We share our financials publicly, admit mistakes before clients ask, and never sugarcoat bad news."
                    />
                  </div>
                  <div>
                    <Label htmlFor={`value-proof-${i}`}>Proof point / Example</Label>
                    <Input
                      id={`value-proof-${i}`}
                      placeholder="e.g., Last quarter we told a client to fire us because we weren't the right fit"
                    />
                  </div>
                </div>
              </Card>
            ))}

            <div className="pt-6 border-t">
              <h3 className="text-xl font-bold mb-4">Brand Promise</h3>
              <p className="text-sm text-muted-foreground mb-3">
                "Every time you work with [brand], you can count on _______"
              </p>
              <Textarea
                rows={2}
                placeholder="e.g., Every time you work with BLKBLD, you can count on strategic frameworks that actually work in the real world, not just in theory."
              />
            </div>
          </div>

          {/* AI Boost */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-accent" />
              🤖 AI BOOST
            </h3>
            <div className="space-y-4">
              <AIPromptCard
                title="Prompt - Values Stress Test"
                prompt={`My core values are:
1. [Value 1]: Shows up as [behavior]
2. [Value 2]: Shows up as [behavior]
3. [Value 3]: Shows up as [behavior]

For each value:
1. Give me a difficult scenario that tests it
2. Show me what living this value looks like vs. compromising
3. Suggest a proof point I could create

Challenge me if any value feels generic or marketing-speak.`}
              />
            </div>
          </div>
        </Card>

        {/* Section 3: Visual & Verbal Identity */}
        <Card className="p-8 mb-8">
          <SectionHeader
            number="3"
            title="Visual & Verbal Identity"
            description="How you look and sound across all touchpoints"
            icon={<Eye className="w-8 h-8" />}
          />

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold mb-4">Brand Voice</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="voice-are">We ARE (3 words)</Label>
                  <Input id="voice-are" placeholder="e.g., Direct, Strategic, Empowering" />
                </div>
                <div>
                  <Label htmlFor="voice-not">We are NOT (3 words)</Label>
                  <Input id="voice-not" placeholder="e.g., Corporate, Jargon-heavy, Passive" />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="tagline">Tagline (7 words or less)</Label>
              <Input id="tagline" placeholder="e.g., MBA Strategy. Battle-Tested Results." />
            </div>

            <div>
              <Label htmlFor="oneliner">One-Liner</Label>
              <p className="text-sm text-muted-foreground mb-3">
                "We help [who] achieve [what] through [how] so they can [benefit]."
              </p>
              <Textarea
                id="oneliner"
                rows={2}
                placeholder="e.g., We help entrepreneurs build strategic brands through proven MBA frameworks so they can compete with industry leaders and win."
              />
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Visual Identity</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="color-primary">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input id="color-primary" placeholder="#000000" />
                    <input type="color" className="w-12 h-10 rounded border" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Psychology: Trust, Power</p>
                </div>
                <div>
                  <Label htmlFor="color-secondary">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input id="color-secondary" placeholder="#FFFFFF" />
                    <input type="color" className="w-12 h-10 rounded border" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="color-accent">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input id="color-accent" placeholder="#FFCC00" />
                    <input type="color" className="w-12 h-10 rounded border" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="font-heading">Heading Font</Label>
                <Input id="font-heading" placeholder="e.g., Inter Bold" />
              </div>
              <div>
                <Label htmlFor="font-body">Body Font</Label>
                <Input id="font-body" placeholder="e.g., Inter Regular" />
              </div>
            </div>
          </div>

          {/* AI Boost */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-accent" />
              🤖 AI BOOST
            </h3>
            <div className="space-y-4">
              <AIPromptCard
                title="Prompt - Brand Voice Testing"
                prompt={`My brand voice is: [ARE words] and NOT [NOT words]

Write 3 sample social posts about [topic]:
1. In my brand voice
2. In the opposite voice (what to avoid)
3. A better version that strengthens the voice

Show me the difference so I can train my team.`}
              />

              <AIPromptCard
                title="Prompt - Tagline Generator"
                prompt={`Based on my brand foundation:
- White Space: [from Workbook 0]
- Mission: [your mission]
- Brand Promise: [your promise]

Generate 10 tagline options (7 words max) that:
1. Capture my unique positioning
2. Are memorable and actionable
3. Avoid clichés

Rank them by impact.`}
              />
            </div>
          </div>
        </Card>

        {/* Section 4: Brand Story */}
        <Card className="p-8 mb-8">
          <SectionHeader
            number="4"
            title="Brand Story & Positioning"
            description="The narrative that connects with your audience"
          />

          <div className="space-y-6">
            <div>
              <Label htmlFor="story">Brand Story (150 words)</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Include: Where you started, the problem you discovered, your "aha" moment, what you're building now
              </p>
              <Textarea id="story" rows={6} placeholder="Tell your origin story..." />
            </div>

            <div>
              <Label htmlFor="positioning">Positioning Statement</Label>
              <p className="text-sm text-muted-foreground mb-3">
                "For [target] who [need], [brand] is the [category] that [unique benefit] because [proof]."
              </p>
              <Textarea
                id="positioning"
                rows={3}
                placeholder="e.g., For entrepreneurs who need strategic clarity, BLKBLD is the brand strategy system that delivers MBA-level frameworks in digestible workbooks because we've built and scaled multiple businesses ourselves."
              />
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Target Audience</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="demographics">Demographics</Label>
                  <Input id="demographics" placeholder="Age, location, income, role, industry" />
                </div>
                <div>
                  <Label htmlFor="pain-points">Top 3 Pain Points</Label>
                  <Textarea id="pain-points" rows={3} placeholder="What keeps them up at night?" />
                </div>
                <div>
                  <Label htmlFor="where-find">Where to Find Them</Label>
                  <Input id="where-find" placeholder="Platforms, communities, events" />
                </div>
              </div>
            </div>
          </div>

          {/* AI Boost */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-accent" />
              🤖 AI BOOST
            </h3>
            <div className="space-y-4">
              <AIPromptCard
                title="Prompt - Story Structure"
                prompt={`Help me structure my brand story using the hero's journey:

My background: [brief background]
Problem I discovered: [the gap in the market]
My transformation: [what changed]
What I'm building: [current mission]

Rewrite this as a compelling 150-word brand story that:
1. Shows vulnerability (the struggle)
2. Demonstrates expertise (the solution)
3. Invites others to join (the mission)

Make it human, not corporate.`}
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" size="lg" asChild>
            <a href="/workbook/0">← Back to Workbook 0</a>
          </Button>
          <Button variant="hero" size="lg" asChild>
            <a href="/workbook/2">Continue to Workbook 2 →</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
