import { WorkbookHeader } from "@/components/WorkbookHeader";
import { AIPromptCard } from "@/components/AIPromptCard";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Target, Users, TrendingUp } from "lucide-react";

export default function Workbook0() {
  return (
    <div className="min-h-screen bg-background">
      <WorkbookHeader
        number="00"
        title="FIND YOUR WHITE SPACE"
        subtitle="The 45 Minute Market Opportunity Sprint"
      />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
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

          <div className="bg-accent/10 border-l-4 border-accent p-4 rounded">
            <p className="font-semibold mb-1">What You'll Walk Away With:</p>
            <p className="text-sm">
              One clear sentence: "I'm the only one who _______ for _______ because _______."
            </p>
          </div>
        </Card>

        {/* Part 1: The 10 Minute Market Scan */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 pb-3 border-b">
            PART 1: THE 10 MINUTE MARKET SCAN
          </h2>

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
                <Input id="customer" placeholder="e.g., Small business owners in Phoenix" />
              </div>

              <div>
                <Label htmlFor="problem">Their #1 problem</Label>
                <Input id="problem" placeholder="e.g., No time to create marketing content" />
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
        </Card>

        {/* White Space Declaration */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary">
          <h2 className="text-2xl font-bold mb-6">Your White Space Declaration</h2>
          
          <div className="space-y-4">
            <p className="text-lg font-medium mb-4">
              "I'm the only one who
            </p>
            
            <div className="space-y-3 pl-4">
              <div>
                <Label htmlFor="ws-action" className="text-base">What you do</Label>
                <Input 
                  id="ws-action" 
                  className="text-lg"
                  placeholder="guarantees healthy breakfast in under 5 minutes"
                />
              </div>

              <p className="text-lg font-medium">for</p>

              <div>
                <Label htmlFor="ws-who" className="text-base">Who you serve</Label>
                <Input 
                  id="ws-who" 
                  className="text-lg"
                  placeholder="busy Phoenix families"
                />
              </div>

              <p className="text-lg font-medium">because</p>

              <div>
                <Label htmlFor="ws-why" className="text-base">Your unique advantage</Label>
                <Textarea 
                  id="ws-why" 
                  className="text-lg"
                  rows={2}
                  placeholder="of our chef-made meals and dedicated pickup lane"
                />
              </div>
            </div>

            <p className="text-lg font-medium mt-4">"</p>
          </div>

          <div className="mt-8 pt-6 border-t">
            <h3 className="font-semibold mb-3">Examples:</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-background rounded">
                <p className="font-medium mb-1">💼 Consultant:</p>
                <p className="text-muted-foreground italic">
                  "I'm the only consultant who guarantees a clear Go-To-Market plan in 90 days for B2B SaaS founders because I've launched 12 products that hit $1M ARR."
                </p>
              </div>
              <div className="p-3 bg-background rounded">
                <p className="font-medium mb-1">🏪 Brick-and-Mortar:</p>
                <p className="text-muted-foreground italic">
                  "I'm the only café that guarantees healthy breakfast in under 5 minutes for busy Phoenix families because of our chef-made meals and dedicated pickup lane."
                </p>
              </div>
              <div className="p-3 bg-background rounded">
                <p className="font-medium mb-1">🎯 Service Brand:</p>
                <p className="text-muted-foreground italic">
                  "I'm the only business coach who helps overwhelmed solopreneurs build systems in 90 days because I've scaled 5 businesses myself without burning out."
                </p>
              </div>
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
        </Card>

        <div className="flex justify-end">
          <Button variant="hero" size="lg" asChild>
            <a href="/workbook/1">Save & Continue to Workbook 1 →</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
