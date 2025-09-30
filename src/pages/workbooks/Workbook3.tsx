import { WorkbookHeader } from "@/components/WorkbookHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { AIPromptCard } from "@/components/AIPromptCard";
import { BlueprintSection } from "@/components/BlueprintSection";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Users, Mail, Zap, FileText, ChevronDown, PartyPopper } from "lucide-react";

export default function Workbook3() {
  return (
    <div className="min-h-screen bg-background">
      <WorkbookHeader
        number="03"
        title="CUSTOMER JOURNEY & SYSTEMS"
        subtitle="Turn Leads into Loyal Customers with Automated Systems"
      />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Introduction */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-card to-muted/20">
          <h2 className="text-2xl font-bold mb-4">What You'll Walk Away With</h2>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Complete customer journey mapping</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>The 2-2-2 follow-up system (proprietary)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Email automation sequences that convert</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>SOPs for consistency and retention systems</span>
            </li>
          </ul>

          <div className="bg-accent/10 border-l-4 border-accent p-4 rounded">
            <p className="font-semibold mb-1">Success Metric:</p>
            <p className="text-sm">80% of customer touchpoints automated with 90% satisfaction scores</p>
          </div>
        </Card>

        {/* Section 1: Customer Journey Mapping */}
        <Collapsible defaultOpen>
        <Card className="p-8 mb-8">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
              <SectionHeader
            number="1"
            title="Customer Journey Mapping"
                description="From stranger to advocate"
                icon={<Users className="w-8 h-8" />}
              />
              <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
          <div className="space-y-6 mt-6">
            <div className="bg-accent/5 border-l-4 border-accent p-4 rounded mb-6">
              <p className="text-sm font-medium">
                💡 A customer journey is all the steps someone takes from first hearing about you to becoming a loyal advocate. Think of it like a relationship progression.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="border p-3 text-left text-sm font-semibold">Stage</th>
                    <th className="border p-3 text-left text-sm font-semibold">Touchpoint</th>
                    <th className="border p-3 text-left text-sm font-semibold">Action</th>
                    <th className="border p-3 text-left text-sm font-semibold">Timing</th>
                    <th className="border p-3 text-left text-sm font-semibold">Success Metric</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { stage: "Awareness", touchpoint: "First visit/interaction", timing: "0-24hr", metric: "40% open rate" },
                    { stage: "Interest", touchpoint: "Download/inquiry", timing: "Day 2", metric: "25% click rate" },
                    { stage: "Consideration", touchpoint: "Engagement", timing: "Day 7", metric: "15% reply rate" },
                    { stage: "Purchase", touchpoint: "Transaction", timing: "Day 14", metric: "10% conversion" },
                    { stage: "Onboarding", touchpoint: "First use", timing: "Day 1 post-purchase", metric: "80% activation" },
                    { stage: "Success", touchpoint: "Value delivered", timing: "Week 2-4", metric: "90% satisfaction" },
                    { stage: "Loyalty", touchpoint: "Repeat/refer", timing: "Month 2+", metric: "30% repeat rate" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-muted/50">
                      <td className="border p-3 font-medium">{row.stage}</td>
                      <td className="border p-3">
                        <Input placeholder={row.touchpoint} className="h-8" />
                      </td>
                      <td className="border p-3">
                        <Input placeholder="What happens?" className="h-8" />
                      </td>
                      <td className="border p-3 text-sm">{row.timing}</td>
                      <td className="border p-3 text-sm text-muted-foreground">{row.metric}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Boost */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-bold mb-4">🤖 AI BOOST</h3>
            <AIPromptCard
              title="Journey Optimization"
              prompt={`Analyze my customer journey:

[Paste your 7-stage journey map]

For each stage:
1. Identify potential friction points
2. Suggest one improvement
3. Recommend automation opportunity
4. Provide benchmark metrics

Focus on stages with lowest conversion.`}
            />
          </div>
          </CollapsibleContent>
        </Card>
        </Collapsible>

        {/* Section 2: The 2-2-2 Follow-Up System */}
        <Collapsible defaultOpen>
        <Card className="p-8 mb-8">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
              <SectionHeader
            number="2"
            title="The 2-2-2 Follow-Up System"
                description="Proprietary framework that builds loyalty automatically"
                icon={<Zap className="w-8 h-8" />}
              />
              <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
          <div className="space-y-6 mt-6">
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-2 border-accent/30 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">The 2-2-2 System</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <p className="font-semibold">Day 2 - Thank You + Tip</p>
                    <p className="text-sm text-muted-foreground">Show appreciation and provide immediate value</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <p className="font-semibold">Week 2 - Satisfaction Check</p>
                    <p className="text-sm text-muted-foreground">Catch problems early, show you care</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <p className="font-semibold">Month 2 - Success Story Request</p>
                    <p className="text-sm text-muted-foreground">Build social proof, deepen relationship</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-muted/20">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-accent" />
                  Day 2 Email
                </h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="day2-subject">Subject Line</Label>
                    <Input id="day2-subject" placeholder="e.g., Quick thank you + your first tip" />
                  </div>
                  <div>
                    <Label htmlFor="day2-body">Email Body</Label>
                    <Textarea
                      id="day2-body"
                      rows={6}
                      placeholder="Thank them, acknowledge their decision, provide 1 quick win tip, set expectations..."
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-muted/20">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-accent" />
                  Week 2 Email
                </h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="week2-subject">Subject Line</Label>
                    <Input id="week2-subject" placeholder="e.g., How's it going? (Quick check-in)" />
                  </div>
                  <div>
                    <Label htmlFor="week2-body">Email Body</Label>
                    <Textarea
                      id="week2-body"
                      rows={6}
                      placeholder="Check satisfaction, ask for feedback, offer help, provide additional resource..."
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-muted/20">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-accent" />
                  Month 2 Email
                </h4>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="month2-subject">Subject Line</Label>
                    <Input id="month2-subject" placeholder="e.g., Your success story could help others" />
                  </div>
                  <div>
                    <Label htmlFor="month2-body">Email Body</Label>
                    <Textarea
                      id="month2-body"
                      rows={6}
                      placeholder="Acknowledge their progress, request testimonial/case study, make it easy (3 questions), incentivize if appropriate..."
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* AI Boost */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-bold mb-4">🤖 AI BOOST</h3>
            <div className="space-y-4">
              <AIPromptCard
                title="Email Sequence Writer"
                prompt={`Write my 2-2-2 email sequence:

Brand voice: [from Workbook 1]
Customer: [target audience]
Product/Service: [what they bought]
Brand promise: [from Workbook 1]

For each email (Day 2, Week 2, Month 2):
1. Subject line (3 options)
2. Email body (150 words max)
3. CTA
4. P.S. line

Match my brand voice. Make it human, not robotic.`}
              />
            </div>
          </div>
          </CollapsibleContent>
        </Card>
        </Collapsible>

        {/* Section 3: Standard Operating Procedures */}
        <Collapsible defaultOpen>
        <Card className="p-8 mb-8">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
              <SectionHeader
            number="3"
            title="Standard Operating Procedures (SOPs)"
                description="Ensure consistency regardless of who delivers"
                icon={<FileText className="w-8 h-8" />}
              />
              <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
          <div className="space-y-6 mt-6">
            <div className="bg-accent/5 border-l-4 border-accent p-4 rounded mb-6">
              <p className="text-sm font-medium">
                SOPs ensure your brand promise is delivered consistently. They're not bureaucracy—they're brand protection.
              </p>
            </div>

            {[
              { title: "Customer Inquiry Response", description: "How to handle initial contact within 24 hours" },
              { title: "Onboarding Process", description: "Steps from payment to first value delivery" },
              { title: "Problem Resolution", description: "How to handle complaints and issues" },
              { title: "Customer Success Check-in", description: "Regular touchpoints to ensure satisfaction" },
            ].map((sop, i) => (
              <Card key={i} className="p-6 bg-muted/20">
                <h4 className="font-semibold mb-3">{sop.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{sop.description}</p>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor={`sop-${i}-steps`}>Key Steps (numbered list)</Label>
                    <Textarea
                      id={`sop-${i}-steps`}
                      rows={4}
                      placeholder="1. Step one&#10;2. Step two&#10;3. Step three..."
                    />
                  </div>
                  <div>
                    <Label htmlFor={`sop-${i}-tools`}>Tools/Templates Needed</Label>
                    <Input id={`sop-${i}-tools`} placeholder="e.g., Email template, checklist, CRM" />
                  </div>
                  <div>
                    <Label htmlFor={`sop-${i}-time`}>Time to Complete</Label>
                    <Input id={`sop-${i}-time`} placeholder="e.g., 15 minutes" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* AI Boost */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-bold mb-4">🤖 AI BOOST</h3>
            <AIPromptCard
              title="SOP Development"
              prompt={`Create a detailed SOP for: [process name]

Context:
- Brand promise: [from Workbook 1]
- Customer expectation: [what they expect]
- Current pain point: [what goes wrong now]

Provide:
1. Step-by-step process (numbered)
2. Time estimate for each step
3. Required tools/templates
4. Quality checkpoints
5. Common mistakes to avoid

Make it simple enough for someone new to follow.`}
            />
          </div>
          </CollapsibleContent>
        </Card>
        </Collapsible>

        {/* Section 4: Retention & Loyalty */}
        <Collapsible defaultOpen>
        <Card className="p-8 mb-8">
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
              <SectionHeader
            number="4"
                title="Retention & Loyalty Systems"
                description="Turn customers into advocates"
              />
              <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
          <div className="space-y-6 mt-6">
            <div>
              <h3 className="text-lg font-bold mb-4">Loyalty Program Design</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="loyalty-name">Program Name</Label>
                  <Input id="loyalty-name" placeholder="e.g., Builder's Circle, VIP Club" />
                </div>
                <div>
                  <Label htmlFor="loyalty-rewards">Rewards & Benefits</Label>
                  <Textarea
                    id="loyalty-rewards"
                    rows={4}
                    placeholder="List rewards: early access, discounts, exclusive content, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="loyalty-tiers">Tier Structure (if applicable)</Label>
                  <Textarea id="loyalty-tiers" rows={3} placeholder="Bronze, Silver, Gold levels and criteria" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Referral System</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="referral-incentive">Referral Incentive</Label>
                  <Input id="referral-incentive" placeholder="What do they get for referring?" />
                </div>
                <div>
                  <Label htmlFor="referral-process">How to Refer</Label>
                  <Textarea id="referral-process" rows={2} placeholder="Make it simple - 1-2 steps max" />
                </div>
              </div>
            </div>
          </div>

          {/* AI Boost */}
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-xl font-bold mb-4">🤖 AI BOOST</h3>
            <AIPromptCard
              title="Loyalty Program Design"
              prompt={`Design a loyalty program for:

Business type: [your business]
Customer lifetime value: [estimated $]
Purchase frequency: [how often]
Brand values: [from Workbook 1]

Create:
1. Program name (on-brand)
2. 5 tiered rewards (escalating value)
3. Point/credit system mechanics
4. Referral bonus structure
5. Launch campaign messaging

Make it simple to understand and exciting to join.`}
            />
          </div>
          </CollapsibleContent>
        </Card>
        </Collapsible>

        {/* Congratulations Section */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-2 border-primary">
          <div className="flex items-center gap-4 mb-4">
            <PartyPopper className="w-12 h-12 text-primary" />
            <div>
              <h2 className="text-2xl font-bold">Congratulations! 🎉</h2>
              <p className="text-muted-foreground">You've completed Workbook 3</p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-lg">
              Your <strong>customer systems</strong> are ready! You now have automated processes that deliver consistent experiences and build loyalty.
            </p>
            <div className="bg-background/50 p-4 rounded-lg">
              <p className="font-semibold mb-2">What You've Accomplished:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Mapped complete customer journey from awareness to loyalty</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Created the 2-2-2 follow-up system for automated relationship building</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Developed SOPs for consistency across all touchpoints</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">✓</span>
                  <span>Designed retention and loyalty systems to turn customers into advocates</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground italic">
              Next up: Workbook 4 will help you measure performance, optimize what works, and scale systematically.
            </p>
          </div>
        </Card>

        {/* Foundational Blueprint */}
        <BlueprintSection
          title="📋 Your Foundational Blueprint"
          description="Execute your brand and marketing strategy with this complete reference (Workbooks 0-3)"
          sections={[
            {
              title: "MARKET OPPORTUNITY (Workbook 0)",
              items: [
                "White Space Declaration: Your unique market position",
                "Target Customer: Who you serve and their #1 problem",
                "Competitive Analysis: What gaps your competitors miss",
                "Your Unique Advantage: Why customers choose you"
              ]
            },
            {
              title: "BRAND FOUNDATION (Workbook 1)",
              items: [
                "Mission, Vision & BHAG: Your purpose and direction",
                "Core Values & Brand Promise: What you stand for",
                "Visual & Verbal Identity: How you look and sound",
                "Brand Story & Positioning: Your narrative in the market"
              ]
            },
            {
              title: "MARKETING STRATEGY (Workbook 2)",
              items: [
                "Business Model Canvas: How you create and capture value",
                "5C Market Analysis: Company, Category, Customer, Competition, Context",
                "4P Marketing Mix: Product, Price, Place, Promotion",
                "90-Day Campaign Plan: Your execution roadmap"
              ]
            },
            {
              title: "CUSTOMER SYSTEMS (Workbook 3)",
              items: [
                "Customer Journey Map: 7 stages from awareness to loyalty",
                "2-2-2 Follow-Up System: Automated relationship building",
                "Standard Operating Procedures: Consistent delivery",
                "Retention & Loyalty Programs: Turn customers into advocates"
              ]
            }
          ]}
          downloadText="Download Foundational Blueprint (WB 0-3)"
        />

        <div className="flex justify-between">
          <Button variant="outline" size="lg" asChild>
            <a href="/workbook/2">← Back to Workbook 2</a>
          </Button>
          <Button variant="hero" size="lg" asChild>
            <a href="/workbook/4">Continue to Workbook 4: Growth & Scaling →</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
