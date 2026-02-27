import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { WorkbookHeader } from "@/components/WorkbookHeader";
import { AIPromptCard } from "@/components/AIPromptCard";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Save, Download, Heart, Users, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function WorkbookICP() {
  const { user, loading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const [localData, setLocalData] = useState(() => {
    const saved = localStorage.getItem('workbookICPData');
    const defaultData = {
      // Section 1
      clientName: '',
      clientAge: '',
      clientGender: '',
      clientLocation: '',
      clientRelationship: '',
      clientKids: '',
      clientEducation: '',
      clientJobTitle: '',
      clientIncome: '',
      threeWords: '',
      inspires: '',
      coreDesire: '',
      aiConsumerPsychologist: '',
      // Section 2
      goal1: '',
      goal2: '',
      goal3: '',
      keepsUpAtNight: '',
      costDollars: '',
      costHours: '',
      happyWithStatus: '',
      whatWouldChange: '',
      aiEmpathyMap: '',
      // Section 3
      socialMedia: '',
      podcasts: '',
      booksBlogs: '',
      onlineCommunities: '',
      inPersonEvents: '',
      influencers: '',
      appsDaily: '',
      weekendActivities: '',
      // Section 4
      beforeFeels: '',
      beforeStruggles: '',
      beforeBelieves: '',
      beforeDayLooksLike: '',
      afterFeels: '',
      afterStruggles: '',
      afterBelieves: '',
      afterDayLooksLike: '',
      premiumOffer: '',
      aiTransformation: '',
      // Section 5
      snapshotName: '',
      snapshotLocation: '',
      snapshotIncome: '',
      snapshotPersonality: '',
      snapshotDesire: '',
      snapshotPainPoint: '',
      snapshotCostOfProblem: '',
      snapshotWhereTheyHangOut: '',
      snapshotTransformation: '',
      highPain: false,
      hasBudget: false,
      realisticPayOneTime: '',
      realisticPayMonthly: '',
      // Success Checkpoint
      checkName: false,
      checkPainPoint: false,
      checkChannels: false,
      checkTransformation: false,
      checkBudget: false,
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

  useEffect(() => {
    localStorage.setItem('workbookICPData', JSON.stringify(localData));
  }, [localData]);

  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => setIsSaving(false), 1000);
    return () => clearTimeout(timer);
  }, [localData]);

  const handleManualSave = () => {
    localStorage.setItem('workbookICPData', JSON.stringify(localData));
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  const update = (field: string, value: any) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const lifeForce8Options = [
    "Survival / health (fitness, medical, safety)",
    "Food / comfort (restaurants, lifestyle, convenience)",
    "Freedom from fear (insurance, security, coaching)",
    "Sexual companionship (dating, beauty, confidence)",
    "Comfortable living (home, finance, time-saving)",
    "Superiority / status (luxury, education, achievement)",
    "Care for loved ones (family, pets, gifts)",
    "Social approval (fashion, social media, networking)",
  ];

  return (
    <div className="min-h-screen bg-background">
      <WorkbookHeader
        number="FREE"
        title="THE IDEAL CLIENT WORKBOOK"
        subtitle="Know Exactly Who You Serve — So They Come to You"
      />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Save Indicator */}
        {isSaving && (
          <div className="fixed top-4 right-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2 z-50">
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
          <h2 className="text-2xl font-bold mb-4">Why This Workbook Exists</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            You can have the best offer in the world. But if you're talking to the wrong people, or talking to the right people the wrong way, nothing lands.
          </p>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Your Ideal Client Profile (ICP) is the foundation everything else sits on: your offers, your pricing, your brand voice, your marketing, your sales conversations. Get this right and business gets easier. Get it wrong and you'll keep wondering why your good work isn't landing.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
              <Heart className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-medium">Time Required</p>
                <p className="text-xs text-muted-foreground">30 minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
              <Users className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-medium">Tools Needed</p>
                <p className="text-xs text-muted-foreground">This workbook + AI</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-background rounded-lg">
              <Sparkles className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-medium">Level</p>
                <p className="text-xs text-muted-foreground">Beginner-friendly</p>
              </div>
            </div>
          </div>

          <div className="bg-accent/10 border-l-4 border-accent p-4 rounded mb-6">
            <p className="font-semibold mb-1">What You'll Walk Away With:</p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>1. A named, vivid Ideal Client Profile you can reference for every business decision</li>
              <li>2. A map of where to find them (online and offline)</li>
              <li>3. Their exact pain points, goals, and buying triggers</li>
              <li>4. A clear Before & After transformation picture that connects your work to their life</li>
            </ul>
          </div>

          <div className="bg-gold/10 border-l-4 border-gold p-4 rounded mb-6">
            <p className="text-sm font-medium text-gold">💡 Quick Win: If you already have paying clients, base this profile on your BEST one — the person you'd clone if you could.</p>
          </div>

          <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
            <p className="font-semibold mb-2">🔗 How This Fits the BLKBLD System</p>
            <p className="text-sm text-muted-foreground mb-3">
              This free workbook is Step 1. Once you've nailed your ideal client, you're ready for the full journey:
            </p>
            <div className="text-sm space-y-1 text-muted-foreground">
              <p>⭐ <strong>You Are Here</strong> → Ideal Client Workbook (Free) — Know who you serve</p>
              <p>Next → WB 0: Find Your White Space — Validate your market opportunity</p>
              <p>Then → WB 1: Brand Foundation — Build your brand identity</p>
              <p>Then → WB 2: Marketing Execution — Create a marketing engine</p>
              <p>Finally → WB 3–4: Growth & Scale — Measure, optimize, grow</p>
            </div>
          </div>
        </Card>

        {/* SECTION 1: Give Your Ideal Client a Name */}
        <Collapsible defaultOpen>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <h2 className="text-2xl font-bold mb-6 pb-3 border-b flex items-center justify-between hover:text-primary transition-colors">
                <span>Step 1 of 5: Give Your Ideal Client a Name</span>
                <ChevronDown className="h-6 w-6 transition-transform duration-200" />
              </h2>
            </CollapsibleTrigger>
            <p className="text-sm text-muted-foreground mb-6">Build a vivid profile of your dream client</p>
            <CollapsibleContent>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  You're about to create a real person — not a demographic spreadsheet. Give them a name, a life, a personality. The more vivid they are, the better every business decision becomes.
                </p>

                <div className="bg-accent/10 border-l-4 border-accent p-4 rounded">
                  <p className="font-semibold mb-1">Why a specific person, not a group?</p>
                  <p className="text-sm text-muted-foreground">
                    When you write to "women 25–45," you write to nobody. When you write to "Joseline, a 34-year-old nursing director who's exhausted from putting out fires and wondering if she should just quit," you write something Joseline feels in her chest. That's the difference.
                  </p>
                </div>

                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                  Build the Bio <span className="text-sm text-muted-foreground font-normal">(10 min)</span>
                </h3>

                <div className="space-y-4 pl-10">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Their Name</Label>
                      <Input placeholder="e.g., Joseline" value={localData.clientName} onChange={e => update('clientName', e.target.value)} />
                    </div>
                    <div>
                      <Label>Age</Label>
                      <Input placeholder="e.g., 34" value={localData.clientAge} onChange={e => update('clientAge', e.target.value)} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Gender</Label>
                      <Input placeholder="e.g., Female" value={localData.clientGender} onChange={e => update('clientGender', e.target.value)} />
                    </div>
                    <div>
                      <Label>Location (city, state)</Label>
                      <Input placeholder="e.g., Atlanta, GA" value={localData.clientLocation} onChange={e => update('clientLocation', e.target.value)} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Relationship Status</Label>
                      <Input value={localData.clientRelationship} onChange={e => update('clientRelationship', e.target.value)} />
                    </div>
                    <div>
                      <Label>Kids? Ages?</Label>
                      <Input value={localData.clientKids} onChange={e => update('clientKids', e.target.value)} />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Education Level</Label>
                      <Input value={localData.clientEducation} onChange={e => update('clientEducation', e.target.value)} />
                    </div>
                    <div>
                      <Label>Job Title / Occupation</Label>
                      <Input placeholder="e.g., Nursing Director" value={localData.clientJobTitle} onChange={e => update('clientJobTitle', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <Label>Household Income Range</Label>
                    <Input placeholder="e.g., $80,000–$120,000" value={localData.clientIncome} onChange={e => update('clientIncome', e.target.value)} />
                  </div>
                </div>

                <h3 className="text-xl font-bold mt-8">Now make them real:</h3>
                <div className="space-y-4 pl-10">
                  <div>
                    <Label>How would their best friend describe them in 3 words?</Label>
                    <Input value={localData.threeWords} onChange={e => update('threeWords', e.target.value)} />
                  </div>
                  <div>
                    <Label>Who or what inspires them? (people, brands, movements)</Label>
                    <Input value={localData.inspires} onChange={e => update('inspires', e.target.value)} />
                  </div>
                </div>

                <h3 className="text-xl font-bold mt-8">Which core human desire does your business help them satisfy?</h3>
                <p className="text-sm text-muted-foreground mb-4">Pick ONE primary desire. This drives your Emotional Trigger copy in Workbook 2.</p>
                <div className="space-y-2 pl-10">
                  {lifeForce8Options.map(opt => (
                    <label key={opt} className="flex items-center gap-2 p-2 hover:bg-muted/50 rounded cursor-pointer">
                      <input
                        type="radio"
                        name="coreDesire"
                        className="w-4 h-4"
                        checked={localData.coreDesire === opt}
                        onChange={() => update('coreDesire', opt)}
                      />
                      <span className="text-sm">{opt}</span>
                    </label>
                  ))}
                </div>

                <div className="bg-gold/10 border-l-4 border-gold p-4 rounded mt-6">
                  <p className="text-sm font-medium text-gold">💡 This is who you're building your business around — the person you serve, sell to, and create for. Pick someone you genuinely want to work with, because this ICP shapes your offers, your pricing, your operations, everything.</p>
                </div>

                <AIPromptCard
                  title="🤖 AI Boost — The Consumer Psychologist"
                  context="Copy and paste this prompt into ChatGPT, Claude, or your favorite AI tool"
                  prompt={`Act as a senior consumer psychologist. I am building an Ideal Client Profile for my [type of business]. My best customers are [paste your bio build answers here — age, role, situation, etc.].

Their ONE primary desire is: [paste from Life Force 8 above]
Their best friend describes them in 3 words: [paste from above]
Who or what inspires them: [paste from above]
My business helps them by: [briefly describe what you do]

Flesh out a vivid profile for '[Name]'.

REQUIREMENTS:
1. Include name, age, job, and income.
2. Identify their 'Inner Monologue': One sentence they say to themselves at 2 AM about their problem.
3. Identify their 'Surface Desire' vs. 'Deep Emotional Need.'
4. Describe a 'Day in the Life' paragraph showing where their frustration shows up most — morning, midday, and evening.

TONE: Realistic, unsentimental, and actionable.

Cite your sources for each claim in your response. Flag any assumptions, inferences, or gaps you filled in without direct evidence.`}
                />

                <div className="mt-4">
                  <Label>AI Response</Label>
                  <Textarea
                    rows={6}
                    placeholder="Paste your AI response here..."
                    value={localData.aiConsumerPsychologist}
                    onChange={e => update('aiConsumerPsychologist', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* SECTION 2: Understand Their Inner World */}
        <Collapsible>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <h2 className="text-2xl font-bold mb-6 pb-3 border-b flex items-center justify-between hover:text-primary transition-colors">
                <span>Step 2 of 5: Understand Their Inner World</span>
                <ChevronDown className="h-6 w-6 transition-transform duration-200" />
              </h2>
            </CollapsibleTrigger>
            <p className="text-sm text-muted-foreground mb-6">Get inside their head — fears, goals, frustrations, and the cost of staying stuck</p>
            <CollapsibleContent>
              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                  The Emotional Map <span className="text-sm text-muted-foreground font-normal">(10 min)</span>
                </h3>

                <div className="space-y-4 pl-10">
                  <div>
                    <Label>What are their top 3 goals?</Label>
                    <p className="text-xs text-muted-foreground mb-2">Career, financial, personal, health, relationship — what are they chasing?</p>
                    <div className="space-y-2">
                      <Input placeholder="Goal 1" value={localData.goal1} onChange={e => update('goal1', e.target.value)} />
                      <Input placeholder="Goal 2" value={localData.goal2} onChange={e => update('goal2', e.target.value)} />
                      <Input placeholder="Goal 3" value={localData.goal3} onChange={e => update('goal3', e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <Label>What keeps them up at night?</Label>
                    <p className="text-xs text-muted-foreground mb-2">Their #1 frustration, fear, or pain point related to what you solve</p>
                    <Textarea rows={3} value={localData.keepsUpAtNight} onChange={e => update('keepsUpAtNight', e.target.value)} />
                  </div>

                  <div>
                    <Label>What is this problem costing them? Quantify it.</Label>
                    <p className="text-xs text-muted-foreground mb-2">Example: A burned-out healthcare director might lose $5,000/month in staff turnover costs, or spend 10+ hours/week managing crises instead of leading.</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs">$ per month</Label>
                        <Input placeholder="$___/month" value={localData.costDollars} onChange={e => update('costDollars', e.target.value)} />
                      </div>
                      <div>
                        <Label className="text-xs">Hours per week</Label>
                        <Input placeholder="___hours/week" value={localData.costHours} onChange={e => update('costHours', e.target.value)} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Are they happy with where they are right now? Why or why not?</Label>
                    <Textarea rows={3} value={localData.happyWithStatus} onChange={e => update('happyWithStatus', e.target.value)} />
                  </div>

                  <div>
                    <Label>What would change in their life if this problem was solved?</Label>
                    <p className="text-xs text-muted-foreground mb-2">Be specific: More time? More money? More confidence? Less stress? Better relationships?</p>
                    <Textarea rows={3} value={localData.whatWouldChange} onChange={e => update('whatWouldChange', e.target.value)} />
                  </div>

                  <div className="bg-gold/10 border-l-4 border-gold p-4 rounded">
                    <p className="text-sm font-medium text-gold">💡 Pro Tip: The language your ideal client uses to describe their problem is the language your marketing should use. When they see their own words reflected back, trust forms instantly.</p>
                  </div>
                </div>

                <AIPromptCard
                  title="🤖 AI Boost — The Empathy Map"
                  context="Copy and paste this prompt into ChatGPT, Claude, or your favorite AI tool"
                  prompt={`Act as my ideal customer, [ICP name, age, role].

My business: [briefly describe what you do]
Their #1 problem: [paste from "what keeps them up at night"]
What solving it would mean: [paste from "what would change"]

OUTPUT:
1. The 'Coffee Shop' Rant: Write 100 words as this person venting to a friend in everyday, messy language (no jargon) about why this problem is ruining their week.
2. The Emotional Cost: Describe how this problem makes them FEEL about themselves — their confidence, their identity, their future.
3. The Tipping Point: What is the one specific event that would make them finally decide to invest in a solution?

RULES: Use raw emotion. Avoid 'marketing-speak.'

Cite your sources for each claim in your response. Flag any assumptions, inferences, or gaps you filled in without direct evidence.`}
                />

                <div className="mt-4">
                  <Label>AI Response</Label>
                  <Textarea
                    rows={6}
                    placeholder="Paste your AI response here..."
                    value={localData.aiEmpathyMap}
                    onChange={e => update('aiEmpathyMap', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* SECTION 3: Where Do They Hang Out? */}
        <Collapsible>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <h2 className="text-2xl font-bold mb-6 pb-3 border-b flex items-center justify-between hover:text-primary transition-colors">
                <span>Step 3 of 5: Where Do They Hang Out?</span>
                <ChevronDown className="h-6 w-6 transition-transform duration-200" />
              </h2>
            </CollapsibleTrigger>
            <p className="text-sm text-muted-foreground mb-6">Map their media diet and daily habits so you show up where they already are</p>
            <CollapsibleContent>
              <div className="space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                  The Attention Map <span className="text-sm text-muted-foreground font-normal">(5 min)</span>
                </h3>

                <p className="text-muted-foreground pl-10">Be specific — not just "Instagram" but "Instagram Reels about leadership and self-care."</p>

                <div className="space-y-4 pl-10">
                  <div>
                    <Label>Social media platforms</Label>
                    <Input value={localData.socialMedia} onChange={e => update('socialMedia', e.target.value)} />
                  </div>
                  <div>
                    <Label>Podcasts they listen to</Label>
                    <Input value={localData.podcasts} onChange={e => update('podcasts', e.target.value)} />
                  </div>
                  <div>
                    <Label>Books or blogs they read</Label>
                    <Input value={localData.booksBlogs} onChange={e => update('booksBlogs', e.target.value)} />
                  </div>
                  <div>
                    <Label>Online communities / groups</Label>
                    <Input value={localData.onlineCommunities} onChange={e => update('onlineCommunities', e.target.value)} />
                  </div>
                  <div>
                    <Label>In-person events or spaces</Label>
                    <Input value={localData.inPersonEvents} onChange={e => update('inPersonEvents', e.target.value)} />
                  </div>
                  <div>
                    <Label>Influencers / thought leaders they follow</Label>
                    <Input value={localData.influencers} onChange={e => update('influencers', e.target.value)} />
                  </div>
                  <div>
                    <Label>Apps they use daily</Label>
                    <Input value={localData.appsDaily} onChange={e => update('appsDaily', e.target.value)} />
                  </div>
                  <div>
                    <Label>What do they like to do on weekends / in their free time?</Label>
                    <Textarea rows={2} value={localData.weekendActivities} onChange={e => update('weekendActivities', e.target.value)} />
                  </div>
                </div>

                <div className="bg-gold/10 border-l-4 border-gold p-4 rounded">
                  <p className="text-sm font-medium text-gold">💡 Stuck? Google "[your industry] + [your city] + groups" or search Facebook/LinkedIn for communities where your ICP gathers. Note the language they use in those spaces.</p>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* SECTION 4: The Transformation You Deliver */}
        <Collapsible>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <h2 className="text-2xl font-bold mb-6 pb-3 border-b flex items-center justify-between hover:text-primary transition-colors">
                <span>Step 4 of 5: The Transformation You Deliver</span>
                <ChevronDown className="h-6 w-6 transition-transform duration-200" />
              </h2>
            </CollapsibleTrigger>
            <p className="text-sm text-muted-foreground mb-6">Connect your ideal client's pain to your solution</p>
            <CollapsibleContent>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Business isn't about what you sell. It's about the result your client gets. The clearer you can paint this picture, the faster prospects say "that's exactly what I need."
                </p>

                <h3 className="text-xl font-bold">The Before & After</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-muted/30 border-destructive/20">
                    <h4 className="font-bold mb-4 text-center">BEFORE (Their Current State)</h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs">Feels:</Label>
                        <Input value={localData.beforeFeels} onChange={e => update('beforeFeels', e.target.value)} />
                      </div>
                      <div>
                        <Label className="text-xs">Struggles with:</Label>
                        <Input value={localData.beforeStruggles} onChange={e => update('beforeStruggles', e.target.value)} />
                      </div>
                      <div>
                        <Label className="text-xs">Believes:</Label>
                        <Input value={localData.beforeBelieves} onChange={e => update('beforeBelieves', e.target.value)} />
                      </div>
                      <div>
                        <Label className="text-xs">Day looks like:</Label>
                        <Input value={localData.beforeDayLooksLike} onChange={e => update('beforeDayLooksLike', e.target.value)} />
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-accent/10 border-accent/20">
                    <h4 className="font-bold mb-4 text-center">AFTER (Working With You)</h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs">Feels:</Label>
                        <Input value={localData.afterFeels} onChange={e => update('afterFeels', e.target.value)} />
                      </div>
                      <div>
                        <Label className="text-xs">Struggles with:</Label>
                        <Input value={localData.afterStruggles} onChange={e => update('afterStruggles', e.target.value)} />
                      </div>
                      <div>
                        <Label className="text-xs">Believes:</Label>
                        <Input value={localData.afterBelieves} onChange={e => update('afterBelieves', e.target.value)} />
                      </div>
                      <div>
                        <Label className="text-xs">Day looks like:</Label>
                        <Input value={localData.afterDayLooksLike} onChange={e => update('afterDayLooksLike', e.target.value)} />
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="bg-gold/10 border-l-4 border-gold p-4 rounded">
                  <p className="text-sm font-medium text-gold">💡 Speed Tip: Stuck on the "AFTER" column? Run the AI prompt below first — use the 'Success Snapshot' it generates to fill it in.</p>
                </div>

                <div>
                  <Label>If your ideal client would pay you anything to get their desired result, what would you do to guarantee their success?</Label>
                  <p className="text-xs text-muted-foreground mb-2">(This is your premium offer in disguise.)</p>
                  <Textarea rows={3} value={localData.premiumOffer} onChange={e => update('premiumOffer', e.target.value)} />
                </div>

                <AIPromptCard
                  title="🤖 AI Boost — The Transformation Strategist"
                  context="Copy and paste this prompt into ChatGPT, Claude, or your favorite AI tool"
                  prompt={`Act as a brand strategist. My ideal client is [Name], a [age] [role] who struggles with [pain point — paste from Section 2].

Their life BEFORE my solution: [paste your "Before" column notes]
What solving it would mean to them: [paste from Section 2]

TASK:
1. Write a 'Success Snapshot': A 75-word story of [Name] 30 days after working with me. Focus on the emotional shift (e.g., from 'overwhelmed' to 'in control'). Make it specific and vivid.
2. Identify the #1 thing [Name] would tell a friend about the transformation — in their own casual language.
3. Name the single biggest objection [Name] probably has about investing in a solution like mine, and write one sentence that addresses it honestly.

TONE: Confident, warm, no fluff.

Cite your sources for each claim in your response. Flag any assumptions, inferences, or gaps you filled in without direct evidence.`}
                />

                <div className="mt-4">
                  <Label>AI Response</Label>
                  <Textarea
                    rows={6}
                    placeholder="Paste your AI response here..."
                    value={localData.aiTransformation}
                    onChange={e => update('aiTransformation', e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* SECTION 5: Your ICP Snapshot */}
        <Collapsible>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <h2 className="text-2xl font-bold mb-6 pb-3 border-b flex items-center justify-between hover:text-primary transition-colors">
                <span>Step 5 of 5: Your ICP Snapshot</span>
                <ChevronDown className="h-6 w-6 transition-transform duration-200" />
              </h2>
            </CollapsibleTrigger>
            <p className="text-sm text-muted-foreground mb-6">Your one-page reference card for every business decision</p>
            <CollapsibleContent>
              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  Pull everything together. This is your cheat sheet for every offer, every conversation, every decision.
                </p>

                <Card className="p-6 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
                  <h3 className="text-xl font-bold mb-4 text-center">My Ideal Client — Profile Snapshot</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Name & Age</Label>
                      <Input value={localData.snapshotName} onChange={e => update('snapshotName', e.target.value)} />
                    </div>
                    <div>
                      <Label className="text-xs">Location & Role</Label>
                      <Input value={localData.snapshotLocation} onChange={e => update('snapshotLocation', e.target.value)} />
                    </div>
                    <div>
                      <Label className="text-xs">Income Range</Label>
                      <Input value={localData.snapshotIncome} onChange={e => update('snapshotIncome', e.target.value)} />
                    </div>
                    <div>
                      <Label className="text-xs">Personality (3 words)</Label>
                      <Input value={localData.snapshotPersonality} onChange={e => update('snapshotPersonality', e.target.value)} />
                    </div>
                    <div>
                      <Label className="text-xs">Core Desire (Life Force 8)</Label>
                      <Input value={localData.snapshotDesire} onChange={e => update('snapshotDesire', e.target.value)} />
                    </div>
                    <div>
                      <Label className="text-xs">Top Pain Point (their words)</Label>
                      <Input value={localData.snapshotPainPoint} onChange={e => update('snapshotPainPoint', e.target.value)} />
                    </div>
                    <div>
                      <Label className="text-xs">Cost of Problem ($/mo or hrs/wk)</Label>
                      <Input value={localData.snapshotCostOfProblem} onChange={e => update('snapshotCostOfProblem', e.target.value)} />
                    </div>
                    <div>
                      <Label className="text-xs">Where They Hang Out (top 3)</Label>
                      <Input value={localData.snapshotWhereTheyHangOut} onChange={e => update('snapshotWhereTheyHangOut', e.target.value)} />
                    </div>
                    <div>
                      <Label className="text-xs">The Transformation (Before → After)</Label>
                      <Input value={localData.snapshotTransformation} onChange={e => update('snapshotTransformation', e.target.value)} />
                    </div>
                  </div>
                </Card>

                <h3 className="text-xl font-bold mt-8">Primary Segment Check</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Before you move on, gut-check your ICP against these two filters. If you can't check both boxes, you may be building for someone who won't buy.
                </p>

                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50">
                    <input type="checkbox" className="w-5 h-5" checked={localData.highPain} onChange={e => update('highPain', e.target.checked)} />
                    <div>
                      <span className="font-semibold">HIGH PAIN</span>
                      <span className="text-sm text-muted-foreground"> — the problem is urgent, costly, or emotionally draining</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg cursor-pointer hover:bg-muted/50">
                    <input type="checkbox" className="w-5 h-5" checked={localData.hasBudget} onChange={e => update('hasBudget', e.target.checked)} />
                    <div>
                      <span className="font-semibold">HAS BUDGET</span>
                      <span className="text-sm text-muted-foreground"> — this person can realistically afford to pay for my solution</span>
                    </div>
                  </label>
                </div>

                <div>
                  <Label>What could they realistically pay to solve this problem?</Label>
                  <div className="grid md:grid-cols-2 gap-4 mt-2">
                    <Input placeholder="$______ (one-time)" value={localData.realisticPayOneTime} onChange={e => update('realisticPayOneTime', e.target.value)} />
                    <Input placeholder="$______/month" value={localData.realisticPayMonthly} onChange={e => update('realisticPayMonthly', e.target.value)} />
                  </div>
                </div>

                <div className="bg-gold/10 border-l-4 border-gold p-4 rounded">
                  <p className="text-sm font-medium text-gold">💡 Reality check: If your dream client has high pain but no budget, you don't have an ideal client — you have a fan. Go back and adjust the role, income, or problem until both boxes check.</p>
                </div>

                <div className="bg-gold/10 border-l-4 border-gold p-4 rounded">
                  <p className="text-sm font-medium text-gold">💡 Quick Win: Screenshot or print this snapshot. Tape it near your workspace. Before making any business decision, glance at it and ask: "Would [Name] want this? Would [Name] pay for this?"</p>
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Success Checkpoint */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-8 h-8 text-accent" />
            <h2 className="text-2xl font-bold">Success Checkpoint</h2>
          </div>
          <p className="text-muted-foreground mb-4">You're done with this workbook if you can say yes to all five:</p>
          <div className="space-y-2">
            {[
              { key: 'checkName', label: 'I can name my ideal client and describe their daily life' },
              { key: 'checkPainPoint', label: 'I know their #1 pain point in their own words AND what it costs them' },
              { key: 'checkChannels', label: 'I know where to find them (at least 3 channels)' },
              { key: 'checkTransformation', label: 'I can clearly describe their Before & After transformation' },
              { key: 'checkBudget', label: 'This person has high pain AND the budget to pay me' },
            ].map(item => (
              <label key={item.key} className="flex items-center gap-3 p-3 bg-background rounded-lg cursor-pointer hover:bg-muted/50">
                <input type="checkbox" className="w-5 h-5" checked={localData[item.key as keyof typeof localData] as boolean} onChange={e => update(item.key, e.target.checked)} />
                <span className="text-sm">{item.label}</span>
              </label>
            ))}
          </div>

          <div className="bg-primary/10 border-l-4 border-primary p-4 rounded mt-6">
            <p className="font-semibold mb-2">🔗 What's Next?</p>
            <p className="text-sm text-muted-foreground">
              Your ICP becomes the "Your Customer" section in Workbook 0. You just completed the hardest part of that sprint.{' '}
              <Link to="/workbook/0" className="text-primary underline hover:text-primary/80">
                Continue to Workbook 0: Find Your White Space →
              </Link>
            </p>
          </div>
        </Card>

        {/* Bottom Save Button */}
        <div className="flex justify-center gap-4 mb-12">
          <Button onClick={handleManualSave} className="gap-2" size="lg">
            <Save className="w-5 h-5" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
