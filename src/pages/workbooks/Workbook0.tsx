import { Link } from "react-router-dom";
import { WorkbookHeader } from "@/components/WorkbookHeader";
import { AIPromptCard } from "@/components/AIPromptCard";
import { ExampleBox } from "@/components/ExampleBox";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Target, Users, TrendingUp, ChevronDown, PartyPopper, Save, Download } from "lucide-react";
import { useWorkbook } from "@/contexts/WorkbookContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { generateWorkbook0Content, downloadWorkbook } from "@/utils/workbookDownload";

export default function Workbook0() {
  const { data, updateData } = useWorkbook();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  // Auto-grant free access to Workbook 0 for logged-in users
  useEffect(() => {
    const grantFreeAccess = async () => {
      if (!user) return;

      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 6);

      await supabase
        .from('purchases')
        .upsert({
          user_id: user.id,
          product_type: 'workbook_0',
          amount: 0,
          expires_at: expiresAt.toISOString(),
        }, {
          onConflict: 'user_id,product_type'
        });
    };

    if (user) {
      grantFreeAccess();
    }
  }, [user]);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);
  
  // Local state for fields not yet in WorkbookData - load from localStorage
  const [localData, setLocalData] = useState(() => {
    const saved = localStorage.getItem('workbook0LocalData');
    return saved ? JSON.parse(saved) : {
      cost: '',
      bandaid: '',
      competitors: Array(3).fill({ name: '', promise: '', price: '', miss: '' }),
      pattern: '',
      competitiveAnalysisResponse: '',
      opportunities: [] as string[],
      quickMathPrice: '',
      quickMathCost: '',
      quickMathRatio: '',
      businessModel: {
        who: '',
        problem: '',
        solution: '',
        delivery: '',
        discovery: '',
        price: '',
        costs: '',
        activities: '',
        partners: ''
      },
      pitch: '',
      gutCheck: { excitement: '', clarity: '', uniqueness: '', total: '' },
      coffeeTest: ['', '', ''],
      competitorsChase: '',
      yourWhitespace: '',
      specificAudience: ''
    };
  });

  // Save localData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('workbook0LocalData', JSON.stringify(localData));
  }, [localData]);

  // Show save indicator briefly when data changes
  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => setIsSaving(false), 1000);
    return () => clearTimeout(timer);
  }, [data, localData]);

  const handleManualSave = () => {
    localStorage.setItem('workbookData', JSON.stringify(data));
    localStorage.setItem('workbook0LocalData', JSON.stringify(localData));
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  const handleDownload = () => {
    const content = generateWorkbook0Content(localData);
    downloadWorkbook(content, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

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
            <h3 className="text-lg font-semibold mb-3">Why This Framework Works</h3>
            <p className="text-muted-foreground mb-4">
              This isn't theory from a textbook. This framework is built on:
            </p>
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

        {/* Why This Order */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-muted/50 to-muted/20 border-2 border-muted">
          <h2 className="text-2xl font-bold mb-4">Why This Order?</h2>
          <p className="text-muted-foreground leading-relaxed">
            We validate market demand first, before developing the idea or brand. Only after confirming real-world opportunity do we model the business and prepare for branding, marketing, and scaling.
          </p>
        </Card>

        {/* THE ONLY 3 QUESTIONS */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30">
          <h2 className="text-2xl font-bold mb-4">The Only 3 Questions That Matter</h2>
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

        {/* Part 1: The 15 Minute Market Scan */}
        <Collapsible>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <h2 className="text-2xl font-bold mb-6 pb-3 border-b flex items-center justify-between hover:text-primary transition-colors">
                <span>Step 1 of 3: Market Scan</span>
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
                  <Label htmlFor="cost">What this problem costs them</Label>
                  <Input 
                    id="cost" 
                    placeholder="e.g., $500/month or 10 hours/week"
                    value={localData.cost}
                    onChange={(e) => setLocalData(prev => ({ ...prev, cost: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="bandaid">Current band-aid solution</Label>
                  <Input 
                    id="bandaid" 
                    placeholder="e.g., DIY using Canva"
                    value={localData.bandaid}
                    onChange={(e) => setLocalData(prev => ({ ...prev, bandaid: e.target.value }))}
                  />
                </div>
              </div>

              <div className="bg-gold/10 border-l-4 border-gold p-4 rounded">
                <p className="text-sm font-medium text-gold">💡 Stuck? Stop. Call 3 to 5 potential customers today.</p>
              </div>

              <AIPromptCard
                title="AI Prompt: Customer Research"
                context="Use this after speaking with 5 potential customers"
                prompt={`I interviewed 5 [type of customers]. Here's what they said about [problem]:

[Paste quotes/notes]

Analyze this and tell me:
1. What's the #1 problem they ALL mentioned?
2. What's this problem costing them in time or money?
3. What band-aid solutions are they using now?

Format as: Problem / Cost / Current Solution`}
              />

              <div className="mt-4">
                <Label htmlFor="customer-research-response">AI Response</Label>
                <Textarea
                  id="customer-research-response"
                  rows={6}
                  placeholder="Add your AI Response"
                  className="mt-2"
                />
              </div>
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
              <p className="text-muted-foreground mb-6">
                Search: "[your solution] + [your city]" - List 3
              </p>

              {/* Quick Tip */}
              <div className="mb-6 p-4 bg-accent/10 border-l-4 border-accent rounded">
                <p className="font-semibold mb-1">Quick Tip:</p>
                <p className="text-sm text-muted-foreground">
                  Don't overthink—just name the first 3 competitors that show up in Google. Speed beats perfection. The goal is momentum, not exhaustive research.
                </p>
              </div>

              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4 bg-muted/30">
                  <p className="text-sm font-semibold mb-3">Competitor {i}</p>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor={`comp-name-${i}`} className="text-xs">Name</Label>
                      <Input 
                        id={`comp-name-${i}`} 
                        className="mt-1"
                        value={localData.competitors[i-1]?.name || ''}
                        onChange={(e) => {
                          const newComps = [...localData.competitors];
                          newComps[i-1] = { ...newComps[i-1], name: e.target.value };
                          setLocalData(prev => ({ ...prev, competitors: newComps }));
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`comp-promise-${i}`} className="text-xs">Promise</Label>
                      <Input 
                        id={`comp-promise-${i}`} 
                        className="mt-1"
                        value={localData.competitors[i-1]?.promise || ''}
                        onChange={(e) => {
                          const newComps = [...localData.competitors];
                          newComps[i-1] = { ...newComps[i-1], promise: e.target.value };
                          setLocalData(prev => ({ ...prev, competitors: newComps }));
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`comp-price-${i}`} className="text-xs">Price</Label>
                      <Input 
                        id={`comp-price-${i}`} 
                        className="mt-1" 
                        placeholder="$"
                        value={localData.competitors[i-1]?.price || ''}
                        onChange={(e) => {
                          const newComps = [...localData.competitors];
                          newComps[i-1] = { ...newComps[i-1], price: e.target.value };
                          setLocalData(prev => ({ ...prev, competitors: newComps }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 grid md:grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`comp-miss-${i}`} className="text-xs">What They Miss</Label>
                      <Input 
                        id={`comp-miss-${i}`} 
                        className="mt-1"
                        value={localData.competitors[i-1]?.miss || ''}
                        onChange={(e) => {
                          const newComps = [...localData.competitors];
                          newComps[i-1] = { ...newComps[i-1], miss: e.target.value };
                          setLocalData(prev => ({ ...prev, competitors: newComps }));
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`comp-good-${i}`} className="text-xs">What They Do Well</Label>
                      <Input 
                        id={`comp-good-${i}`} 
                        className="mt-1"
                        value={localData.competitors[i-1]?.goodAt || ''}
                        onChange={(e) => {
                          const newComps = [...localData.competitors];
                          newComps[i-1] = { ...newComps[i-1], goodAt: e.target.value };
                          setLocalData(prev => ({ ...prev, competitors: newComps }));
                        }}
                      />
                    </div>
                  </div>
                </Card>
              ))}

              <div>
                <Label htmlFor="pattern">The Pattern: What do ALL miss?</Label>
                <Textarea 
                  id="pattern" 
                  rows={2}
                  value={localData.pattern}
                  onChange={(e) => setLocalData(prev => ({ ...prev, pattern: e.target.value }))}
                />
              </div>

              <AIPromptCard
                title="AI Prompt: Competitive Analysis"
                context="Use this to identify market gaps"
                prompt={`Here are 3 competitors in [your market]:

1. [Name] - Promise: [W] - Price: $[X] - Missing: [Y] - Good at: [Z]
2. [Name] - Promise: [W] - Price: $[X] - Missing: [Y] - Good at: [Z]
3. [Name] - Promise: [W] - Price: $[X] - Missing: [Y] - Good at: [Z]

What gap do ALL three competitors miss? What could someone own that none of them address?

Give me 3 specific angles I could take.`}
              />

              <div className="mt-4">
                <Label htmlFor="competitive-analysis-response">AI Response</Label>
                <Textarea
                  id="competitive-analysis-response"
                  rows={6}
                  placeholder="Paste your AI response here..."
                  value={localData.competitiveAnalysisResponse || ''}
                  onChange={(e) => setLocalData(prev => ({ ...prev, competitiveAnalysisResponse: e.target.value }))}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          {/* Your Opportunity */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">
                3
              </span>
              Your Opportunity <span className="text-sm text-muted-foreground font-normal">(2 min)</span>
            </h3>

            <div className="space-y-4 pl-10">
              <p className="text-muted-foreground mb-6">Check boxes you can own:</p>
              
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

          {/* Your White Space */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm">
                4
              </span>
              Your White Space <span className="text-sm text-muted-foreground font-normal">(5 min)</span>
            </h3>

            <div className="space-y-4 pl-10">
              <Label htmlFor="white-space">I'm the only one who _______ for _______ because _______.</Label>
              <Textarea 
                id="white-space" 
                rows={3}
                placeholder="Complete this statement..."
              />
            </div>
          </div>

          {/* Section Complete Mini-Summary */}
          <div className="mt-8 p-4 bg-emerald/10 border-l-4 border-emerald rounded">
            <p className="font-semibold mb-1 text-emerald">Section Complete:</p>
            <p className="text-sm text-muted-foreground">
              You now have real competitors mapped and a first draft of your unique white space.
            </p>
          </div>
            </CollapsibleContent>
        </Card>
        </Collapsible>

        {/* Part 2: The 15-Minute Business Model */}
        <Collapsible>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <h2 className="text-2xl font-bold mb-6 pb-3 border-b flex items-center justify-between hover:text-primary transition-colors">
                <span>Step 2 of 3: Business Model</span>
                <ChevronDown className="h-6 w-6 transition-transform duration-200" />
              </h2>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <p className="text-muted-foreground mb-6">Fill each box in 90 seconds. First thought = best thought.</p>

              {/* Quick Tip */}
              <div className="mb-6 p-4 bg-accent/10 border-l-4 border-accent rounded">
                <p className="font-semibold mb-1">Quick Tip:</p>
                <p className="text-sm text-muted-foreground">
                  If you can't sketch a path to profit in 90 seconds, don't invest more time. Gut answers are often the most honest.
                </p>
              </div>

              {/* Why Rapid Business Modeling Matters */}
              <div className="mb-6 p-4 bg-muted/30 border-l-4 border-muted rounded">
                <p className="font-semibold mb-1">Why Rapid Business Modeling Matters:</p>
                <p className="text-sm text-muted-foreground">
                  Most ideas fail because they don't generate profit fast enough. Sketch your business in minutes—if the math and model work at a glance, you're ready!
                </p>
              </div>
              
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

              <div className="mt-6 p-4 bg-accent/10 border-l-4 border-accent rounded-lg">
                <p className="font-semibold mb-3">Quick Math:</p>
                <div className="grid md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <Label htmlFor="quick-math-price" className="text-xs">Price per sale ($)</Label>
                    <Input
                      id="quick-math-price"
                      type="number"
                      placeholder="0"
                      value={localData.quickMathPrice}
                      onChange={(e) => {
                        const price = e.target.value;
                        setLocalData(prev => {
                          const cost = parseFloat(prev.quickMathCost) || 0;
                          const priceNum = parseFloat(price) || 0;
                          const ratio = cost > 0 ? (priceNum / cost).toFixed(2) : '';
                          return { ...prev, quickMathPrice: price, quickMathRatio: ratio };
                        });
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quick-math-cost" className="text-xs">Cost per sale ($)</Label>
                    <Input
                      id="quick-math-cost"
                      type="number"
                      placeholder="0"
                      value={localData.quickMathCost}
                      onChange={(e) => {
                        const cost = e.target.value;
                        setLocalData(prev => {
                          const price = parseFloat(prev.quickMathPrice) || 0;
                          const costNum = parseFloat(cost) || 0;
                          const ratio = costNum > 0 ? (price / costNum).toFixed(2) : '';
                          return { ...prev, quickMathCost: cost, quickMathRatio: ratio };
                        });
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quick-math-ratio" className="text-xs">Ratio (must be ≥ 3)</Label>
                    <Input
                      id="quick-math-ratio"
                      value={localData.quickMathRatio}
                      readOnly
                      placeholder="—"
                      className={`mt-1 font-bold ${parseFloat(localData.quickMathRatio) >= 3 ? 'text-green-600' : parseFloat(localData.quickMathRatio) > 0 ? 'text-red-600' : ''}`}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic">Include recurring costs (software, ads, payment fees)</p>
              </div>

              <div className="mt-6 p-4 bg-background border-2 border-primary/20 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="font-semibold">✅ Reality Check: Could you serve a customer tomorrow?</span>
                </label>
                <p className="text-sm text-muted-foreground mt-2">
                  If no, either try again with different customers, problems, gaps or another angle until the answer is a yes.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Business Model Examples:</h3>
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

              <div className="mt-8">
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
              </div>

              {/* Section Complete Mini-Summary */}
              <div className="mt-8 p-4 bg-emerald/10 border-l-4 border-emerald rounded">
                <p className="font-semibold mb-1 text-emerald">Section Complete:</p>
                <p className="text-sm text-muted-foreground">
                  You've sketched a rapid business model and confirmed the math works. Time to validate!
                </p>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Part 3: The 5-Minute Validation */}
        <Collapsible>
          <Card className="p-8 mb-8">
            <CollapsibleTrigger className="w-full">
              <h2 className="text-2xl font-bold mb-6 pb-3 border-b flex items-center justify-between hover:text-primary transition-colors">
                <span>Step 3 of 3: Validation</span>
                <ChevronDown className="h-6 w-6 transition-transform duration-200" />
              </h2>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              {/* White Space Declaration */}
              <div className="mb-8 p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-primary">Craft Your White Space Declaration</h3>
                
                <p className="text-muted-foreground mb-6">
                  "While everyone else fights over [what competitors chase], I'll own [your white space] by being the only one who [unique approach] for [specific audience] who value [what matters to them]."
                </p>

                <div className="mb-6">
                  <Label htmlFor="white-space-write">Write Your White Space Declaration:</Label>
                  <Textarea 
                    id="white-space-write" 
                    className="mt-2"
                    rows={4}
                    placeholder="Write your white space declaration..."
                    value={data.whiteSpaceDeclaration}
                    onChange={(e) => updateData('whiteSpaceDeclaration', e.target.value)}
                  />
                </div>

                <div className="pt-6 border-t mb-6">
                  <h4 className="text-lg font-semibold mb-4">Validation Checklist</h4>
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded">
                      <input type="checkbox" className="w-5 h-5 mt-0.5" />
                      <span className="text-sm">Problem is real (customers confirm it—customers nodded)</span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded">
                      <input type="checkbox" className="w-5 h-5 mt-0.5" />
                      <span className="text-sm">Competition has gaps (you found white space—competitors miss it)</span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded">
                      <input type="checkbox" className="w-5 h-5 mt-0.5" />
                      <span className="text-sm">Business model works (math checks out—aim for at least 3:1 ratio)</span>
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-4">Examples Across Different Brand Types:</h4>
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

Give me a score out of 10 and suggest one improvement.

Cite your sources for each claim in your previous response. Flag any assumptions, inferences, or gaps you filled in without direct evidence.`}
                />
              </div>

              {/* 30-Second Pitch */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Your 30-Second Pitch</h3>
                <p className="text-muted-foreground mb-6">
                  Format: "I help [who] achieve [what] by [how] so they can [why it matters]."
                </p>
                
                <Label htmlFor="pitch">Write Your 30-Second Pitch:</Label>
                <Textarea 
                  id="pitch" 
                  rows={3} 
                  placeholder="I help..." 
                  className="mt-2 mb-6"
                  value={localData.pitch}
                  onChange={(e) => setLocalData(prev => ({ ...prev, pitch: e.target.value }))}
                />

                <div className="space-y-3">
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
              </div>

              {/* The Gut Check */}
              <div className="mb-8 p-6 bg-muted/30 rounded-lg">
                <h3 className="text-xl font-bold mb-4">The Gut Check</h3>
                <p className="text-muted-foreground mb-6">Rate 1-10:</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3">
                    <Label className="w-40">Excitement level:</Label>
                    <Input 
                      type="number" 
                      min="1" 
                      max="10" 
                      placeholder="___" 
                      className="w-20"
                      value={localData.gutCheck.excitement}
                      onChange={(e) => setLocalData(prev => ({ 
                        ...prev, 
                        gutCheck: { ...prev.gutCheck, excitement: e.target.value }
                      }))}
                    />
                    <span className="text-sm text-muted-foreground">/10</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Label className="w-40">Customer clarity:</Label>
                    <Input 
                      type="number" 
                      min="1" 
                      max="10" 
                      placeholder="___" 
                      className="w-20"
                      value={localData.gutCheck.clarity}
                      onChange={(e) => setLocalData(prev => ({ 
                        ...prev, 
                        gutCheck: { ...prev.gutCheck, clarity: e.target.value }
                      }))}
                    />
                    <span className="text-sm text-muted-foreground">/10</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Label className="w-40">Uniqueness:</Label>
                    <Input 
                      type="number" 
                      min="1" 
                      max="10" 
                      placeholder="___" 
                      className="w-20"
                      value={localData.gutCheck.uniqueness}
                      onChange={(e) => setLocalData(prev => ({ 
                        ...prev, 
                        gutCheck: { ...prev.gutCheck, uniqueness: e.target.value }
                      }))}
                    />
                    <span className="text-sm text-muted-foreground">/10</span>
                  </div>
                  <div className="flex items-center gap-3 pt-2 border-t">
                    <Label className="w-40 font-bold">Total:</Label>
                    <Input 
                      type="number" 
                      placeholder="___" 
                      className="w-20 font-bold"
                      value={(parseInt(localData.gutCheck.excitement || '0') + 
                              parseInt(localData.gutCheck.clarity || '0') + 
                              parseInt(localData.gutCheck.uniqueness || '0')) || ''}
                      readOnly
                    />
                    <span className="text-sm text-muted-foreground">/30</span>
                  </div>
                </div>

                <div className="bg-background p-4 rounded border-2 border-muted">
                  <p className="font-semibold mb-2">Decision:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• 25-30: Full speed → Workbook 1</li>
                    <li>• 20-24: Solid foundation</li>
                    <li>• Below 20: Pivot angle</li>
                  </ul>
                </div>
              </div>

              {/* The Coffee Shop Test */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">The Coffee Shop Test</h3>
                <p className="text-muted-foreground mb-6">
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

                <div className="bg-accent/10 border-l-4 border-accent p-4 rounded mb-4">
                  <p className="font-semibold mb-2">Response Cues:</p>
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

                <div className="bg-background p-4 rounded border-2 border-muted">
                  <p className="font-semibold mb-1">Success Metric:</p>
                  <p className="text-sm">Get at least 2 out of 3 coffee shop testers to say: "I need that!"</p>
                </div>
              </div>

              {/* Section Complete Mini-Summary */}
              <div className="mt-8 p-4 bg-emerald/10 border-l-4 border-emerald rounded">
                <p className="font-semibold mb-1 text-emerald">Section Complete:</p>
                <p className="text-sm text-muted-foreground">
                  You've validated your white space with real people. You're ready to build!
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
                  <h3 className="font-bold text-lg">EMAIL</h3>
                </div>
                <p className="font-semibold mb-1">Mailchimp</p>
                <p className="text-sm text-muted-foreground mb-2">Email marketing platform for building subscriber lists and sending campaigns</p>
                <p className="text-xs italic">Why it works: Free tier for up to 500 contacts; perfect for early customer research and validation</p>
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
                <p className="font-semibold mb-1"><a href="https://blkbld.host" target="_blank" rel="noopener noreferrer" className="hover:underline text-accent">BlkBld Host</a></p>
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
          <Button onClick={handleDownload} size="lg" variant="outline" className="gap-2">
            <Download className="w-5 h-5" />
            Download My Workbook
          </Button>
          <Button variant="hero" size="lg" asChild>
            <Link to="/workbook/1">Continue to Workbook 1: Brand Strategy →</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
