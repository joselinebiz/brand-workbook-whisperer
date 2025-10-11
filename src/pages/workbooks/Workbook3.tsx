import { useState, useEffect } from "react";
import { WorkbookHeader } from "@/components/WorkbookHeader";
import { SectionHeader } from "@/components/SectionHeader";
import { AIPromptCard } from "@/components/AIPromptCard";
import { ProtectedWorkbook } from "@/components/ProtectedWorkbook";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Users, Mail, Zap, FileText, ChevronDown, PartyPopper, Save, Target, TrendingUp } from "lucide-react";
import { useWorkbook } from "@/contexts/WorkbookContext";

export default function Workbook3() {
  const { data, updateData } = useWorkbook();
  const [isSaving, setIsSaving] = useState(false);
  const [preWorkScores, setPreWorkScores] = useState({
    followUp: 0,
    satisfaction: 0,
    repeatBusiness: 0,
    teamConsistency: 0,
    timeOnAdmin: 0
  });

  const totalScore = Object.values(preWorkScores).reduce((sum, score) => sum + score, 0);

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
    <ProtectedWorkbook
      productType="workbook_3"
      priceId="price_1SHBitAnYzcngRwoM3KUCNLK"
      price={19700}
      workbookTitle="Workbook 3 - Customer Journey & Systems"
    >
      <div className="min-h-screen bg-background">
        <WorkbookHeader
          number="03"
          title="CUSTOMER JOURNEY & SYSTEMS"
          subtitle="Turn Leads into Loyal Customers with Automated Systems"
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
          <p className="text-muted-foreground mb-6">
            Business owners getting leads from marketing, service providers ready to systematize client experience, and professionals building relationships for career advancement. Whether you're managing customers, clients, or professional connections, this automates your follow-up and builds long-term loyalty.
          </p>

          <h3 className="text-xl font-semibold mb-3">✅ Prerequisites</h3>
          <ul className="space-y-2 text-muted-foreground mb-6">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Completed Workbook 2 (marketing campaign running)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Getting regular leads/inquiries from marketing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>2-4 hours over 1-2 weeks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Basic email and calendar systems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Ready to automate repetitive tasks</span>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">What You'll Walk Away With</h3>
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
              <span>Standard Operating Procedures (SOPs) for consistency</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Customer retention and loyalty systems</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <span>Enhanced AI prompts for journey optimization</span>
            </li>
          </ul>

          <div className="bg-accent/10 border-l-4 border-accent p-4 rounded mb-6">
            <p className="font-semibold mb-1">🤖 AI Partner Evolution</p>
            <p className="text-sm">Our AI assistance grows with your expertise—from foundational clarity here in Workbook 1 to consultant-level analysis in advanced workbooks. You'll get exactly the depth you can handle at each stage.</p>
          </div>

          <div className="bg-primary/10 border-l-4 border-primary p-4 rounded mb-6">
            <p className="font-semibold mb-1">Success Metric:</p>
            <p className="text-sm">80% of customer touchpoints automated with 90%+ satisfaction scores</p>
          </div>

          <div className="bg-muted/50 border-l-4 border-muted-foreground p-4 rounded">
            <p className="font-semibold mb-2">🔗 Bridge to Success - The Complete BLKBLD Journey:</p>
            <ul className="text-sm space-y-1">
              <li>WORKBOOK 0: Market opportunity validated</li>
              <li>WORKBOOK 1: Brand foundation built</li>
              <li>WORKBOOK 2: Strategic marketing system aligned with brand</li>
              <li className="font-semibold text-primary">WORKBOOK 3: Automated customer experience that builds loyalty (you're here!)</li>
              <li>→ WORKBOOK 4: Data-driven optimization and systematic scaling</li>
            </ul>
          </div>
        </Card>

        {/* Why This Framework Works */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-accent/5">
          <h2 className="text-2xl font-bold mb-4">Why This Framework Works</h2>
          <p className="text-muted-foreground mb-4">
            This isn't theory from a textbook. This framework is built on:
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <div>
                <span className="font-semibold">MBA-Level Strategy:</span>
                <span className="text-muted-foreground"> Proven frameworks from top-tier business education, adapted for real-world application</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <div>
                <span className="font-semibold">Industry Battle-Tested:</span>
                <span className="text-muted-foreground"> Refined through years of building and scaling multiple businesses</span>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold mt-1">•</span>
              <div>
                <span className="font-semibold">Results-Driven:</span>
                <span className="text-muted-foreground"> Every exercise connects directly to revenue, customers, and sustainable growth</span>
              </div>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground mt-4 italic">
            You're not just learning concepts—you're implementing the same systems that generate six-figure consulting engagements, now available in a structured, self-paced format.
          </p>
        </Card>

        {/* Pre-Work Assessment */}
        <Card className="p-8 mb-8 bg-muted/20">
          <h2 className="text-2xl font-bold mb-4">Pre-Work: Customer Experience Assessment</h2>
          <p className="text-sm text-muted-foreground mb-4">Rate each area 1-3 points:</p>
          
          <div className="space-y-4">
            <div className="p-4 bg-background rounded-lg">
              <p className="font-semibold mb-2">Follow-Up System - Consistent communication after first contact?</p>
              <p className="text-sm text-muted-foreground mb-2">Automated (3) | Manual but consistent (2) | Random/none (1)</p>
              <Input 
                type="number" 
                min="1" 
                max="3" 
                placeholder="Score (1-3)" 
                className="w-24"
                value={preWorkScores.followUp || ""}
                onChange={(e) => setPreWorkScores({...preWorkScores, followUp: Number(e.target.value)})}
              />
            </div>

            <div className="p-4 bg-background rounded-lg">
              <p className="font-semibold mb-2">Customer Satisfaction - Do you regularly check satisfaction?</p>
              <p className="text-sm text-muted-foreground mb-2">Systematic (3) | Occasional (2) | Never (1)</p>
              <Input 
                type="number" 
                min="1" 
                max="3" 
                placeholder="Score (1-3)" 
                className="w-24"
                value={preWorkScores.satisfaction || ""}
                onChange={(e) => setPreWorkScores({...preWorkScores, satisfaction: Number(e.target.value)})}
              />
            </div>

            <div className="p-4 bg-background rounded-lg">
              <p className="font-semibold mb-2">Repeat Business - Customers return/refer others?</p>
              <p className="text-sm text-muted-foreground mb-2">Often (3) | Sometimes (2) | Rarely (1)</p>
              <Input 
                type="number" 
                min="1" 
                max="3" 
                placeholder="Score (1-3)" 
                className="w-24"
                value={preWorkScores.repeatBusiness || ""}
                onChange={(e) => setPreWorkScores({...preWorkScores, repeatBusiness: Number(e.target.value)})}
              />
            </div>

            <div className="p-4 bg-background rounded-lg">
              <p className="font-semibold mb-2">Team Consistency - Same experience regardless of who helps?</p>
              <p className="text-sm text-muted-foreground mb-2">Always (3) | Usually (2) | Depends on person (1)</p>
              <Input 
                type="number" 
                min="1" 
                max="3" 
                placeholder="Score (1-3)" 
                className="w-24"
                value={preWorkScores.teamConsistency || ""}
                onChange={(e) => setPreWorkScores({...preWorkScores, teamConsistency: Number(e.target.value)})}
              />
            </div>

            <div className="p-4 bg-background rounded-lg">
              <p className="font-semibold mb-2">Time on Admin - Hours weekly on follow-up/admin?</p>
              <p className="text-sm text-muted-foreground mb-2">&lt;2 hours (3) | 2-5 hours (2) | &gt;5 hours (1)</p>
              <Input 
                type="number" 
                min="1" 
                max="3" 
                placeholder="Score (1-3)" 
                className="w-24"
                value={preWorkScores.timeOnAdmin || ""}
                onChange={(e) => setPreWorkScores({...preWorkScores, timeOnAdmin: Number(e.target.value)})}
              />
            </div>

            <div className="p-4 bg-primary/10 rounded-lg border-2 border-primary">
              <p className="font-bold mb-2">Total Score: {totalScore}/15</p>
              <ul className="text-sm space-y-1">
                <li>13-15: Focus on optimization and automation</li>
                <li>9-12: Build systems first, then automate</li>
                <li>5-8: Start with basic follow-up only</li>
              </ul>
            </div>

            <div className="bg-destructive/10 border-l-4 border-destructive p-4 rounded">
              <p className="text-sm font-semibold">⚠️ Failure-Prevention Warning: Scaling broken customer experiences amplifies problems</p>
            </div>

            <p className="text-xs text-muted-foreground italic">📸 Screenshot this to compare later.</p>
          </div>
        </Card>

        {/* Section 1: Customer Journey Mapping */}
        <Collapsible defaultOpen={false}>
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
                <div className="bg-accent/5 border-l-4 border-accent p-4 rounded">
                  <p className="text-sm font-medium">
                    💡 <strong>Why This Matters:</strong> Your brand isn't just your marketing—it's every interaction. Mapping ensures each touchpoint reinforces your brand promise and moves people toward loyalty.
                  </p>
                </div>

                <div className="bg-muted/30 border-l-4 border-muted-foreground p-4 rounded">
                  <p className="text-sm font-medium">
                    💡 <strong>New to This?</strong> A customer journey is all the steps someone takes from first hearing about you to becoming a loyal advocate. Think of it like a relationship progression.
                  </p>
                </div>

                <h3 className="text-xl font-bold">Customer Journey Mapping Template</h3>
                <p className="text-sm text-muted-foreground mb-4">Define your customer journey stages and actions:</p>
                
                <div className="space-y-4">
                  {["Awareness", "Interest", "Consideration", "Purchase", "Delivery", "Post-Delivery", "Loyalty"].map((stageName, index) => {
                    const currentStage = data.journeyStages?.[index] || { stage: stageName, action: "", metric: "" };
                    
                    return (
                      <div key={index} className="p-4 bg-muted/30 rounded-lg border-l-4 border-accent">
                        <Label className="font-semibold text-base mb-2 block">{stageName}</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs text-muted-foreground">Action/Touchpoint</Label>
                            <Input
                              placeholder={`What happens during ${stageName.toLowerCase()}?`}
                              value={currentStage.action || ""}
                              onChange={(e) => {
                                const newStages = [...(data.journeyStages || [])];
                                newStages[index] = { ...currentStage, stage: stageName, action: e.target.value };
                                updateData('journeyStages', newStages);
                              }}
                            />
                          </div>
                          <div>
                            <Label className="text-xs text-muted-foreground">Success Metric (Optional)</Label>
                            <Input
                              placeholder="e.g., 40%+ open rate"
                              value={currentStage.metric || ""}
                              onChange={(e) => {
                                const newStages = [...(data.journeyStages || [])];
                                newStages[index] = { ...currentStage, stage: stageName, metric: e.target.value };
                                updateData('journeyStages', newStages);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-gold/10 border-l-4 border-gold p-4 rounded">
                  <p className="text-sm font-medium">
                    💡 <strong className="text-gold">Quick Win:</strong> In your content calendar from Workbook 2, you specifically requested that AI indicate which stage of the customer journey each piece of content targets. That was intentional and crucial because the goal is to deliver the right content to your audience at the right time.
                  </p>
                </div>

                {/* Examples */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Examples Across Three Brand Types:</h3>
                  
                  <Collapsible>
                    <Card className="p-6 mb-4 bg-muted/20">
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                          <h4 className="font-semibold flex items-center gap-2">
                            🏪 Brick-and-Mortar Brand - FreshStart Café Journey
                          </h4>
                          <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-4 space-y-2 text-sm">
                          <p><strong>Awareness:</strong> Social media discovery, walk-by visibility</p>
                          <p><strong>Interest:</strong> First visit experience, menu sampling</p>
                          <p><strong>Purchase:</strong> Quick ordering process, under 5-minute guarantee</p>
                          <p><strong>Loyalty:</strong> Loyalty program, family-friendly events, community building</p>
                        </div>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>

                  <Collapsible>
                    <Card className="p-6 mb-4 bg-muted/20">
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                          <h4 className="font-semibold flex items-center gap-2">
                            🎯 Service Brand - Business Coach Journey
                          </h4>
                          <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-4 space-y-2 text-sm">
                          <p><strong>Awareness:</strong> LinkedIn content, referrals, speaking</p>
                          <p><strong>Interest:</strong> Free assessment, valuable newsletter</p>
                          <p><strong>Purchase:</strong> Discovery call, clear program outline</p>
                          <p><strong>Loyalty:</strong> Alumni network, advanced programs, referral rewards</p>
                        </div>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>

                  <Collapsible>
                    <Card className="p-6 bg-muted/20">
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                          <h4 className="font-semibold flex items-center gap-2">
                            👤 Personal Brand - Marketing Executive Journey
                          </h4>
                          <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-4 space-y-2 text-sm">
                          <p><strong>Awareness:</strong> LinkedIn posts, conference speaking, industry networking</p>
                          <p><strong>Interest:</strong> Case study downloads, framework sharing</p>
                          <p><strong>Purchase:</strong> Consulting engagement, strategy sessions</p>
                          <p><strong>Loyalty:</strong> Long-term partnerships, industry recommendations, speaking referrals</p>
                        </div>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                </div>

                {/* The 2-2-2 Follow-Up System */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">The 2-2-2 Follow-Up System (Simple but powerful)</h3>
                  <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-2 border-accent/30 p-6 rounded-lg">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                        <div>
                          <p className="font-semibold">2 Days: Thank you + quick tip</p>
                          <p className="text-sm text-muted-foreground">(builds relationship)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                        <div>
                          <p className="font-semibold">2 Weeks: Check satisfaction + support offer</p>
                          <p className="text-sm text-muted-foreground">(shows you care)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="bg-accent text-accent-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">2</div>
                        <div>
                          <p className="font-semibold">2 Months: Success story request + next offer</p>
                          <p className="text-sm text-muted-foreground">(leverages success)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-muted/30 p-4 rounded">
                    <p className="font-semibold mb-2">Exercise (10 min): Template Your Follow-Up</p>
                    <p className="text-sm mb-2">Write these 3 emails now:</p>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Welcome and/or Thank You (warm, sets expectations)</li>
                      <li>• Check-in (helpful, no selling)</li>
                      <li>• Ask (review or referral request)</li>
                    </ul>
                  </div>

                  {/* 2-2-2 Follow-Up Completion Tracking */}
                  <div className="mt-6 bg-accent/10 border-2 border-accent/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-4">Track Your Follow-Up Sequence Completion</h4>
                    <p className="text-sm text-muted-foreground mb-4">Check off each follow-up as you write it:</p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="day2-followup"
                          checked={data.followUpSystem?.day2 || false}
                          onCheckedChange={(checked) => {
                            updateData('followUpSystem', {
                              ...data.followUpSystem,
                              day2: checked === true
                            });
                          }}
                        />
                        <Label htmlFor="day2-followup" className="cursor-pointer text-sm">
                          <strong>Day 2 Follow-Up:</strong> Thank you + quick tip email written
                        </Label>
                      </div>
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="week2-followup"
                          checked={data.followUpSystem?.week2 || false}
                          onCheckedChange={(checked) => {
                            updateData('followUpSystem', {
                              ...data.followUpSystem,
                              week2: checked === true
                            });
                          }}
                        />
                        <Label htmlFor="week2-followup" className="cursor-pointer text-sm">
                          <strong>Week 2 Follow-Up:</strong> Check satisfaction + support offer email written
                        </Label>
                      </div>
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id="month2-followup"
                          checked={data.followUpSystem?.month2 || false}
                          onCheckedChange={(checked) => {
                            updateData('followUpSystem', {
                              ...data.followUpSystem,
                              month2: checked === true
                            });
                          }}
                        />
                        <Label htmlFor="month2-followup" className="cursor-pointer text-sm">
                          <strong>Month 2 Follow-Up:</strong> Success story request + next offer email written
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Boost */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-xl font-bold mb-4">🤖 AI BOOST - Journey Designer</h3>
                  <AIPromptCard
                    title="Journey Designer"
                    prompt={`You are a customer experience strategist. Map my complete journey:

My customer stages: [list touchpoints] | Brand voice: [3 adjectives from Workbook 1] | Brand type: [Brick-and-Mortar/Service/Personal]

Create 5-email follow-up sequence:
1. Subject lines that get opened
2. Value in each email
3. Soft CTA (emails 1-4)
4. Clear ask (email 5)
Make them feel personal, not automated.`}
                  />
                </div>

                {/* Checkpoint */}
                <div className="mt-8 bg-primary/10 border-2 border-primary p-6 rounded-lg">
                  <h4 className="font-bold mb-3">SECTION 1 CHECKPOINT ✓</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Customer journey mapped with 7 stages</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>2-2-2 email templates written and ready</span>
                    </label>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Section 2: Automation & Systems */}
        <Collapsible defaultOpen={false}>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                <SectionHeader
                  number="2"
                  title="Automation & Systems"
                  description="Work smarter, not harder"
                  icon={<Zap className="w-8 h-8" />}
                />
                <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="space-y-6 mt-6">
                <div className="bg-accent/5 border-l-4 border-accent p-4 rounded">
                  <p className="text-sm font-medium">
                    💡 <strong>Why This Matters:</strong> Systems create consistency. Automation saves 10+ hours weekly. Together, they ensure quality at scale.
                  </p>
                </div>

                <div className="bg-muted/30 border-l-4 border-muted-foreground p-4 rounded">
                  <p className="text-sm font-medium">
                    💡 <strong>New to This?</strong><br />
                    Automation = Software doing tasks for you automatically<br />
                    SOP = Standard Operating Procedure = Step-by-step instructions so tasks get done the same way every time
                  </p>
                </div>

                <h3 className="text-xl font-bold">Quick Automation Wins - Save 10+ hours/week</h3>
                
                <div className="grid gap-4">
                  <Card className="p-6 bg-muted/20">
                    <h4 className="font-semibold mb-3">Email Automation (5 hrs/week saved):</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Welcome sequences</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Abandoned cart recovery</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Review requests</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Re-engagement campaigns</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Birthday/anniversary messages</span>
                      </label>
                    </div>
                  </Card>

                  <Card className="p-6 bg-muted/20">
                    <h4 className="font-semibold mb-3">Operations Automation (5 hrs/week saved):</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Calendar booking (Calendly)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Invoice generation</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Appointment reminders</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Task assignments</span>
                      </label>
                    </div>
                  </Card>

                  <Card className="p-6 bg-muted/20">
                    <h4 className="font-semibold mb-3">Marketing Automation (5 hrs/week saved):</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Social media posting</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Lead magnets delivery</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Content distribution</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" />
                        <span>Follow-up sequences</span>
                      </label>
                    </div>
                  </Card>
                </div>

                {/* Tool Recommendations */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Tool Recommendations (Free/Low-Cost)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border p-3 text-left font-semibold">Function</th>
                          <th className="border p-3 text-left font-semibold">Free Option</th>
                          <th className="border p-3 text-left font-semibold">Paid Upgrade</th>
                          <th className="border p-3 text-left font-semibold">Best For</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-muted/50">
                          <td className="border p-3 font-medium">Email</td>
                          <td className="border p-3">Mailchimp (2K contacts)</td>
                          <td className="border p-3">ConvertKit</td>
                          <td className="border p-3 text-muted-foreground">Service businesses</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="border p-3 font-medium">Scheduling</td>
                          <td className="border p-3">Calendly (1 calendar)</td>
                          <td className="border p-3">Acuity</td>
                          <td className="border p-3 text-muted-foreground">Consultants/coaches</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="border p-3 font-medium">Social Media</td>
                          <td className="border p-3">Later (30 posts); Meta</td>
                          <td className="border p-3">Buffer</td>
                          <td className="border p-3 text-muted-foreground">Content creators</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="border p-3 font-medium">Workflows</td>
                          <td className="border p-3">Zapier (5 zaps)</td>
                          <td className="border p-3">Make.com</td>
                          <td className="border p-3 text-muted-foreground">Tech-savvy users</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Essential SOPs */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Essential SOPs Every Business Needs</h3>
                  
                  <Card className="p-6 mb-4 bg-muted/20">
                    <h4 className="font-semibold mb-3">1. Customer Inquiry Response SOP</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Trigger:</strong> New inquiry received</p>
                      <p><strong>Timeline:</strong> Within 4 hours</p>
                      <p><strong>Steps:</strong> 1) Acknowledge within 1 hour 2) Ask qualifying questions 3) Provide relevant info 4) Schedule next step 5) Add to follow-up</p>
                      <p><strong>Quality Standard:</strong> Personal, helpful, professional</p>
                    </div>
                  </Card>

                  <Card className="p-6 mb-4 bg-muted/20">
                    <h4 className="font-semibold mb-3">2. Customer Onboarding SOP</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Trigger:</strong> New purchase completed</p>
                      <p><strong>Timeline:</strong> Within 24 hours</p>
                      <p><strong>Steps:</strong> 1) Send welcome email 2) Provide access 3) Schedule first interaction 4) Begin 2-2-2 sequence 5) Add to tracking</p>
                      <p><strong>Quality Standard:</strong> Customer feels excited and clear on next steps</p>
                    </div>
                  </Card>

                  <div className="bg-muted/30 p-6 rounded-lg">
                    <h4 className="font-semibold mb-3">SOP Template (Copy-Paste)</h4>
                    <div className="space-y-3">
                      <div>
                        <Label>PROCESS NAME:</Label>
                        <Input placeholder="Name of process" className="mt-1" />
                      </div>
                      <div>
                        <Label>TRIGGER: What starts this process?</Label>
                        <Input placeholder="e.g., New customer signs up" className="mt-1" />
                      </div>
                      <div>
                        <Label>TIMELINE: How long should this take?</Label>
                        <Input placeholder="e.g., Within 24 hours" className="mt-1" />
                      </div>
                      <div>
                        <Label>STEPS:</Label>
                        <Textarea rows={5} placeholder="1. First action with specifics&#10;2. Second action with specifics&#10;3. Continue..." className="mt-1" />
                      </div>
                      <div>
                        <Label>QUALITY STANDARD: What does "done well" look like?</Label>
                        <Input placeholder="e.g., Customer feels supported" className="mt-1" />
                      </div>
                      <div>
                        <Label>TOOLS NEEDED: Software, templates, resources</Label>
                        <Input placeholder="e.g., Email template, CRM, calendar" className="mt-1" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Troubleshooting */}
                <div className="mt-8 bg-muted/30 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3">🚨 Troubleshooting:</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>"Too complicated?"</strong> → Start with email automation only</li>
                    <li><strong>"Can't afford tools?"</strong> → Use free versions until revenue justifies upgrade</li>
                    <li><strong>"Don't know what to automate?"</strong> → Track tasks for 1 week, automate most repetitive</li>
                  </ul>
                </div>

                <div className="mt-4 bg-accent/10 border-l-4 border-accent p-4 rounded">
                  <p className="text-sm font-medium">
                    <strong>Solo Founder Priority Order:</strong><br />
                    1. Email welcome sequence (immediate ROI)<br />
                    2. Calendar booking (saves back-and-forth)<br />
                    3. Social media scheduling (consistency)<br />
                    4. Review requests (builds social proof)
                  </p>
                </div>

                {/* Examples */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Examples:</h3>
                  
                  <Collapsible>
                    <Card className="p-6 mb-4 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h4 className="font-semibold">🏪 FreshStart Café Automation</h4>
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                          </div>
                        </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-4 space-y-2 text-sm">
                          <p><strong>Email:</strong> Welcome sequence with menu highlights and pickup instructions</p>
                          <p><strong>Operations:</strong> Online ordering system with pickup time notifications</p>
                          <p><strong>Marketing:</strong> Social media posts showcasing daily specials and community events</p>
                        </div>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>

                  <Collapsible>
                    <Card className="p-6 mb-4 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h4 className="font-semibold">🎯 Business Coach Automation</h4>
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                          </div>
                        </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-4 space-y-2 text-sm">
                          <p><strong>Email:</strong> 5-part nurture sequence delivering free mini-training</p>
                          <p><strong>Operations:</strong> Calendly booking with intake form and session reminders</p>
                          <p><strong>Marketing:</strong> LinkedIn post scheduling with engagement monitoring</p>
                        </div>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>

                  <Collapsible>
                    <Card className="p-6 bg-muted/20">
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                          <h4 className="font-semibold">👤 Marketing Executive Automation</h4>
                          <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="mt-4 space-y-2 text-sm">
                          <p><strong>Email:</strong> Quarterly newsletter with industry insights and case studies</p>
                          <p><strong>Operations:</strong> Speaking inquiry form with automatic calendar booking</p>
                          <p><strong>Marketing:</strong> LinkedIn article publishing with cross-platform distribution</p>
                        </div>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                </div>

                {/* AI Boost */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-xl font-bold mb-4">🤖 AI BOOST - Automation Builder</h3>
                  <AIPromptCard
                    title="Automation Builder"
                    prompt={`You are an automation consultant. Help me prioritize and set up systems:

My repetitive tasks: [list top 5 time-wasters] | Tech comfort level: [low/medium/high] | Budget: $[max/month] | Business type: [describe] | Brand type: [Brick-and-Mortar/Service/Personal]

DON'T RECOMMEND:
- Complex workflows requiring coding
- Tools that lock me into long contracts

Recommend:
• TOP 3 AUTOMATIONS: [Which to implement first] + [Time saved each]
• TOOL RECOMMENDATIONS: [Specific software] + [Free vs paid options]
• SETUP SEQUENCE: [Order of implementation] + [Expected difficulty]
• WHAT TO KEEP MANUAL: [Tasks that need human touch] + [Why]`}
                  />
                </div>

                {/* Checkpoint */}
                <div className="mt-8 bg-primary/10 border-2 border-primary p-6 rounded-lg">
                  <h4 className="font-bold mb-3">SECTION 2 CHECKPOINT ✓</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>First email automation sequence created and active</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>2 essential SOPs documented and tested</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Automation tools selected and accounts created</span>
                    </label>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Section 3: Retention & Loyalty Systems */}
        <Collapsible defaultOpen={false}>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                <SectionHeader
                  number="3"
                  title="Retention & Loyalty Systems"
                  description="Turn customers into advocates"
                  icon={<Target className="w-8 h-8" />}
                />
                <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="space-y-6 mt-6">
                <h3 className="text-xl font-bold">3.1 Customer Success Tracking</h3>
                
                <div className="bg-accent/5 border-l-4 border-accent p-4 rounded">
                  <p className="text-sm font-medium">
                    💡 <strong>Why Track Success:</strong> Happy customers buy more and refer others. Systematic tracking ensures you know who's thriving and who needs attention before they become problems.
                  </p>
                </div>

                <div className="bg-muted/30 border-l-4 border-muted-foreground p-4 rounded">
                  <p className="text-sm font-medium">
                    💡 <strong>New to This?</strong> Customer success tracking is like taking the pulse of your relationships. You check in regularly to make sure people are getting value and staying happy.
                  </p>
                </div>

                <h4 className="font-semibold">Customer Health Score Framework</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-3 text-left font-semibold">Factor</th>
                        <th className="border p-3 text-left font-semibold">Weight</th>
                        <th className="border p-3 text-left font-semibold">Scoring</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-muted/50">
                        <td className="border p-3 font-medium">Satisfaction</td>
                        <td className="border p-3">40%</td>
                        <td className="border p-3 text-muted-foreground">Survey score 1-10</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="border p-3 font-medium">Engagement</td>
                        <td className="border p-3">30%</td>
                        <td className="border p-3 text-muted-foreground">Usage/interaction frequency</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="border p-3 font-medium">Results</td>
                        <td className="border p-3">20%</td>
                        <td className="border p-3 text-muted-foreground">Achievement of their goal</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="border p-3 font-medium">Advocacy</td>
                        <td className="border p-3">10%</td>
                        <td className="border p-3 text-muted-foreground">Referrals/testimonials given</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Total Score: ___ /10</p>
                  <ul className="text-sm space-y-1">
                    <li>8-10: Healthy (focus on upsell/referrals)</li>
                    <li>6-7: At risk (increase touch points)</li>
                    <li>Below 6: Urgent attention needed</li>
                  </ul>
                </div>

                <h4 className="font-semibold mt-6">Simple Tracking Template</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-3 text-left font-semibold">Customer</th>
                        <th className="border p-3 text-left font-semibold">Satisfaction</th>
                        <th className="border p-3 text-left font-semibold">Engagement</th>
                        <th className="border p-3 text-left font-semibold">Results</th>
                        <th className="border p-3 text-left font-semibold">Advocacy</th>
                        <th className="border p-3 text-left font-semibold">Total</th>
                        <th className="border p-3 text-left font-semibold">Action Needed</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-muted/50">
                        <td className="border p-3">Name 1</td>
                        <td className="border p-3 text-muted-foreground">8/10</td>
                        <td className="border p-3 text-muted-foreground">High</td>
                        <td className="border p-3 text-muted-foreground">Good</td>
                        <td className="border p-3 text-muted-foreground">1 referral</td>
                        <td className="border p-3 font-medium">8.2</td>
                        <td className="border p-3 text-muted-foreground">Ask for testimonial</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="border p-3">Name 2</td>
                        <td className="border p-3 text-muted-foreground">6/10</td>
                        <td className="border p-3 text-muted-foreground">Low</td>
                        <td className="border p-3 text-muted-foreground">Fair</td>
                        <td className="border p-3 text-muted-foreground">None</td>
                        <td className="border p-3 font-medium">6.1</td>
                        <td className="border p-3 text-muted-foreground">Schedule check-in</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Exercise (10 min): Score Your Last 10 Customers</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Rate each on the 4 factors</li>
                    <li>• Calculate health scores</li>
                    <li>• Identify who needs immediate attention</li>
                    <li>• Plan outreach for at-risk customers</li>
                  </ul>
                </div>

                {/* Loyalty & Referral Systems */}
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">3.2 Loyalty & Referral Systems</h3>
                  
                  <div className="bg-accent/5 border-l-4 border-accent p-4 rounded mb-4">
                    <p className="text-sm font-medium">
                      💡 <strong>Why Loyalty Systems Work:</strong> It costs 5x more to acquire a new customer than retain existing ones. Referrals convert 4x higher than cold leads and have higher lifetime value.
                    </p>
                  </div>

                  <div className="bg-muted/30 border-l-4 border-muted-foreground p-4 rounded mb-6">
                    <p className="text-sm font-medium">
                      💡 <strong>New to This?</strong> A loyalty system rewards customers for sticking with you and referring others. Think of it like a frequent flyer program - the more they engage, the better the perks.
                    </p>
                  </div>

                  <h4 className="font-semibold mb-3">The Loyalty Ladder (Ascending Value)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border p-3 text-left font-semibold">Level</th>
                          <th className="border p-3 text-left font-semibold">Customer Type</th>
                          <th className="border p-3 text-left font-semibold">Experience</th>
                          <th className="border p-3 text-left font-semibold">Reward/Benefit</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="hover:bg-muted/50">
                          <td className="border p-3 font-medium">1</td>
                          <td className="border p-3">First-time</td>
                          <td className="border p-3 text-muted-foreground">Standard service</td>
                          <td className="border p-3 text-muted-foreground">Welcome bonus</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="border p-3 font-medium">2</td>
                          <td className="border p-3">Repeat</td>
                          <td className="border p-3 text-muted-foreground">Preferred timing</td>
                          <td className="border p-3 text-muted-foreground">10% discount</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="border p-3 font-medium">3</td>
                          <td className="border p-3">Regular</td>
                          <td className="border p-3 text-muted-foreground">Priority access</td>
                          <td className="border p-3 text-muted-foreground">Exclusive content/events</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="border p-3 font-medium">4</td>
                          <td className="border p-3">VIP</td>
                          <td className="border p-3 text-muted-foreground">Personal touch</td>
                          <td className="border p-3 text-muted-foreground">Custom solutions</td>
                        </tr>
                        <tr className="hover:bg-muted/50">
                          <td className="border p-3 font-medium">5</td>
                          <td className="border p-3">Advocate</td>
                          <td className="border p-3 text-muted-foreground">Community</td>
                          <td className="border p-3 text-muted-foreground">Revenue sharing/special recognition</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="font-semibold mt-6 mb-3">Referral System Framework</h4>
                  <Card className="p-6 bg-muted/20">
                    <div className="space-y-3 text-sm">
                      <p><strong>The Ask:</strong> "Who else do you know who struggles with [problem you solve]?"</p>
                      <p><strong>The Incentive Structure:</strong></p>
                      <ul className="ml-6 space-y-1">
                        <li>• Referrer Gets: [Discount/credit/gift] for each successful referral</li>
                        <li>• Referee Gets: [Welcome bonus/discount] for being referred</li>
                        <li>• You Get: Higher-quality leads that convert better</li>
                      </ul>
                      <p><strong>Referral Timing (When to Ask):</strong></p>
                      <ul className="ml-6 space-y-1">
                        <li>✅ After positive feedback/testimonial</li>
                        <li>✅ When they achieve a key result</li>
                        <li>✅ During regular check-ins (2-month mark)</li>
                        <li>❌ During onboarding or problem resolution</li>
                      </ul>
                    </div>
                  </Card>

                  {/* Loyalty Examples */}
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Loyalty Examples:</h4>
                    
                    <Collapsible>
                      <Card className="p-6 mb-4 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h5 className="font-semibold">🏪 FreshStart Café Loyalty</h5>
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-4 space-y-2 text-sm">
                            <p><strong>Values:</strong> Quality (scratch-made daily), Community (know your name), Speed (under 5 min)</p>
                            <p><strong>Level 1:</strong> Welcome drink on first visit</p>
                            <p><strong>Level 2:</strong> Buy 9 breakfasts, get 10th free</p>
                            <p><strong>Level 3:</strong> Early access to seasonal menu items</p>
                            <p><strong>Level 4:</strong> Monthly coffee tasting events</p>
                            <p><strong>Level 5:</strong> Name on "Community Champions" wall + catering discounts</p>
                            <p><strong>Referral System:</strong> "Know a busy family who could use healthy mornings? Give them this card for 20% off their first week. When they visit, you get a free breakfast!"</p>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    <Collapsible>
                      <Card className="p-6 mb-4 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h5 className="font-semibold">🎯 Business Coach Loyalty</h5>
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-4 space-y-2 text-sm">
                            <p><strong>Level 1:</strong> Welcome kit with planning templates</p>
                            <p><strong>Level 2:</strong> Access to monthly group Q&A calls</p>
                            <p><strong>Level 3:</strong> Alumni network + advanced workshops</p>
                            <p><strong>Level 4:</strong> 1:1 quarterly strategy sessions</p>
                            <p><strong>Level 5:</strong> Revenue share on programs they help design</p>
                            <p><strong>Referral System:</strong> "Know an entrepreneur struggling with systems? Introduce us and you'll both get $200 credit when they join a program."</p>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>

                    <Collapsible>
                      <Card className="p-6 bg-muted/20">
                        <CollapsibleTrigger className="w-full">
                          <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                            <h5 className="font-semibold">👤 Marketing Executive Loyalty</h5>
                            <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200" />
                          </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-4 space-y-2 text-sm">
                            <p><strong>Level 1:</strong> Follow-up resources after consulting</p>
                            <p><strong>Level 2:</strong> Priority response to questions/requests</p>
                            <p><strong>Level 3:</strong> Invitation to exclusive industry roundtables</p>
                            <p><strong>Level 4:</strong> Co-creation opportunities for thought leadership</p>
                            <p><strong>Level 5:</strong> Partnership opportunities and revenue sharing</p>
                            <p><strong>Referral System:</strong> "Know a SaaS CEO struggling with predictable growth? I'd love an introduction. When we work together, I'll prioritize a strategy session for you."</p>
                          </div>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  </div>

                  <div className="mt-6 bg-muted/30 p-4 rounded-lg">
                    <p className="font-semibold mb-2">Exercise (10 min): Design Your Loyalty System</p>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Define 3-5 loyalty levels with specific benefits</li>
                      <li>• Create one simple referral incentive</li>
                      <li>• Identify 5 customers ready for referral asks</li>
                      <li>• Plan implementation over next 30 days</li>
                    </ul>
                  </div>
                </div>

                {/* AI Boost */}
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-xl font-bold mb-4">🤖 AI BOOST - Loyalty Designer</h3>
                  <AIPromptCard
                    title="Loyalty Designer"
                    prompt={`You are a customer retention specialist. Design my loyalty and referral systems:

My business: [description] | Average customer value: $[amount] | Repeat purchase rate: [%] | Current referral rate: [%] | Brand type: [Brick-and-Mortar/Service/Personal]

DESIGN:
• LOYALTY TIERS: [5 levels with specific benefits that increase retention]
• REFERRAL PROGRAM: [Incentive structure that motivates sharing]
• IMPLEMENTATION: [Which customers to start with]
• SUCCESS METRICS: [What to track]
• COST ANALYSIS: [What this will cost vs expected return]`}
                  />
                </div>

                {/* Checkpoint */}
                <div className="mt-8 bg-primary/10 border-2 border-primary p-6 rounded-lg">
                  <h4 className="font-bold mb-3">SECTION 3 CHECKPOINT ✓</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Customer health scores calculated for recent customers</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Loyalty system designed with 3-5 tiers</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Referral program created with clear incentives</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Implementation plan for next 30 days</span>
                    </label>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* 30-Day Implementation */}
        <Collapsible defaultOpen={false}>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between hover:opacity-80 transition-opacity">
                <SectionHeader
                  number="4"
                  title="Your 30-Day System Implementation"
                  description="Week-by-week action plan"
                  icon={<TrendingUp className="w-8 h-8" />}
                />
                <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
              </div>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="space-y-6 mt-6">
                <Card className="p-6 bg-muted/20">
                  <h4 className="font-semibold mb-3">Week 1: Journey Foundation</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Complete customer journey mapping</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Write and test 2-2-2 follow-up emails</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Set up basic email automation account</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Create first SOP for most common task</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 bg-muted/20">
                  <h4 className="font-semibold mb-3">Week 2: Automation Setup</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Build welcome email sequence (5 emails)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Test automation with small group</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Document 2 more SOPs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Begin customer health score tracking</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 bg-muted/20">
                  <h4 className="font-semibold mb-3">Week 3: Retention Focus</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Calculate health scores for all active customers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Reach out to at-risk customers personally</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Design loyalty program structure</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Write referral request templates</span>
                    </li>
                  </ul>
                </Card>

                <Card className="p-6 bg-muted/20">
                  <h4 className="font-semibold mb-3">Week 4: Launch & Optimize</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Launch loyalty program to existing customers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Begin systematic referral asks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Review automation performance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>Plan month 2 improvements based on data</span>
                    </li>
                  </ul>
                </Card>

                <div className="bg-primary/10 border-2 border-primary p-6 rounded-lg">
                  <h4 className="font-bold mb-3">Success Metrics:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>80% of touchpoints automated</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>90% customer satisfaction scores</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>25% increase in repeat business</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" />
                      <span>10% referral rate from active customers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Troubleshooting Guide */}
        <Card className="p-8 mb-8 bg-muted/20">
          <h2 className="text-2xl font-bold mb-4">Troubleshooting Guide</h2>
          <div className="space-y-4">
            <div className="p-4 bg-background rounded-lg">
              <p className="font-semibold mb-2">"Email automation feels impersonal"</p>
              <p className="text-sm text-muted-foreground">→ Use customer's name, reference specific purchases, share personal stories</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="font-semibold mb-2">"Customers not responding to follow-up"</p>
              <p className="text-sm text-muted-foreground">→ Lead with value, not selling. Ask questions, don't just broadcast</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="font-semibold mb-2">"Too much manual work still"</p>
              <p className="text-sm text-muted-foreground">→ Focus on automating only your top 3 most repetitive tasks first</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="font-semibold mb-2">"Don't know what to track"</p>
              <p className="text-sm text-muted-foreground">→ Start with just satisfaction scores and repeat purchase rates</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="font-semibold mb-2">"Loyalty program too complex"</p>
              <p className="text-sm text-muted-foreground">→ Simplify to just 3 levels: New, Regular, VIP with clear benefits each</p>
            </div>
            <div className="p-4 bg-background rounded-lg">
              <p className="font-semibold mb-2">"Not getting referrals"</p>
              <p className="text-sm text-muted-foreground">→ Make sure you ask within 30 days of customer success, not at random times</p>
            </div>
          </div>
        </Card>

        {/* Bridge to Workbook 4 */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-accent/10 to-primary/10">
          <h2 className="text-2xl font-bold mb-4">🔗 Bridge to Workbook 4</h2>
          <p className="mb-4">Your customer systems are automated and working! Now scale what's successful.</p>
          <p className="font-semibold mb-2">You're ready for Workbook 4: Measurement, Scaling & Growth when:</p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center gap-2">
              <span>✅ Customer journey mapped and automated</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✅ Consistent follow-up system running</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✅ Customer satisfaction scores tracked</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✅ Some loyal customers referring others</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✅ Ready to optimize and expand successful systems</span>
            </li>
          </ul>
          <p className="text-sm text-muted-foreground">
            Workbook 4 covers: Advanced analytics, A/B testing, scaling successful campaigns, team building, and systematic growth.
          </p>
        </Card>

        {/* Congratulations */}
        <Collapsible>
          <Card className="p-8 mb-8 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-2 border-primary">
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center gap-4 mb-4 justify-between hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-4">
                  <PartyPopper className="w-12 h-12 text-primary" />
                  <div className="text-left">
                    <h2 className="text-2xl font-bold">Congratulations! 🎉</h2>
                    <p className="text-muted-foreground">You've completed Workbook 3</p>
                  </div>
                </div>
                <ChevronDown className="h-6 w-6 transition-transform duration-200" />
              </div>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="space-y-4">
                <p className="text-lg">
                  You've built a complete customer success system that runs automatically.
                </p>
                
                <div className="bg-background/50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">What You've Accomplished:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✅</span>
                      <span><strong>Consistency:</strong> Every customer gets the same high-quality experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✅</span>
                      <span><strong>Automation:</strong> Systems work while you focus on high-value activities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✅</span>
                      <span><strong>Retention:</strong> Customers stay longer and buy more</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">✅</span>
                      <span><strong>Growth:</strong> Satisfied customers bring referrals systematically</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-background/50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Key Systems Now Running:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Automated welcome and follow-up sequences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Customer health monitoring and intervention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Loyalty program that increases retention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Referral system that drives quality growth</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-accent/10 border-l-4 border-accent p-4 rounded">
                  <p className="font-semibold mb-2">The Compound Effect:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Happy customers buy more (higher LTV)</li>
                    <li>• Referrals convert better and cost less (lower CAC)</li>
                    <li>• Systems create predictable growth (scalable business)</li>
                    <li>• Your reputation builds through consistent experience</li>
                  </ul>
                </div>

                <p className="text-sm font-semibold">
                  Ready for Workbook 4: Measurement, Scaling & Growth to optimize and expand what works!
                </p>

                <p className="text-sm text-muted-foreground italic">
                  You now have automated systems that create loyal customers and generate referrals predictably. This systematic approach to customer success sets you apart from competitors who treat customer service as an afterthought.
                </p>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Recommended Tech Stack */}
        <Collapsible defaultOpen={false}>
          <Card className="p-8 mb-8 bg-muted/20">
            <CollapsibleTrigger className="w-full text-left flex items-center justify-between group">
              <h2 className="text-2xl font-bold">Recommended Tech Stack For Customer Systems</h2>
              <ChevronDown 
                className="transition-transform duration-200 group-data-[state=open]:rotate-180"
                size={24}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="space-y-4">
                <div className="p-4 bg-background rounded-lg">
                  <h3 className="font-semibold mb-2">📧 CRM & AUTOMATION</h3>
                  <p className="text-sm mb-1"><strong>Constant Contact</strong> – Centralize customer data, automate follow-ups, track engagement</p>
                  <p className="text-xs text-muted-foreground">Why it works: CRM + email marketing + social = complete customer view</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <h3 className="font-semibold mb-2">📅 SEAMLESS SCHEDULING</h3>
                  <p className="text-sm mb-1"><strong>Calendly</strong> – Automate booking, reminders, and follow-ups</p>
                  <p className="text-xs text-muted-foreground">Why it works: Reduces no-shows; integrates with your CRM for full customer journey</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <h3 className="font-semibold mb-2">💻 CUSTOMER COMMUNICATION</h3>
                  <p className="text-sm mb-1"><strong>Zoom</strong> – Professional video calls with recording for training/onboarding</p>
                  <p className="text-xs text-muted-foreground">Why it works: Face-to-face builds trust; recordings create reusable content</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <h3 className="font-semibold mb-2">💳 SUBSCRIPTION MANAGEMENT</h3>
                  <p className="text-sm mb-1"><strong>Stripe</strong> – Recurring billing for retainers, memberships, and service packages</p>
                  <p className="text-xs text-muted-foreground">Why it works: Automate monthly revenue; reduce payment collection friction</p>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Blueprint Call-to-Action */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-3">📋 Ready to see your complete blueprint?</h3>
            <p className="text-muted-foreground mb-6">
              View your auto-filled Master Blueprint with all your strategic work from Workbooks 0-3, 
              plus AI-powered validation to ensure everything aligns.
            </p>
            <Button variant="default" size="lg" asChild className="bg-accent hover:bg-accent/90">
              <a href="/blueprint">View Your Master Blueprint →</a>
            </Button>
          </div>
        </Card>

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
            <a href="/workbook/2">← Back to Workbook 2</a>
          </Button>
          <Button variant="hero" size="lg" asChild>
            <a href="/workbook/4">Continue to Workbook 4: Growth & Scaling →</a>
          </Button>
        </div>
      </div>
      </div>
    </ProtectedWorkbook>
  );
}
