import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Target, Users, Lightbulb, Zap, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Landing = () => {
  const [purchasing, setPurchasing] = useState(false);
  const { toast } = useToast();

  const handlePurchase = async () => {
    try {
      setPurchasing(true);

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { 
          productType: 'workbook_0',
          discounted: false
        }
      });

      if (error) {
        console.error('Payment error:', error);
        toast({
          title: "Payment Error",
          description: error.message || "Unable to process payment. Please try again.",
          variant: "destructive"
        });
        setPurchasing(false);
        return;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        toast({
          title: "Error",
          description: "No checkout URL received",
          variant: "destructive"
        });
        setPurchasing(false);
      }
    } catch (err) {
      console.error('Error:', err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      setPurchasing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-black via-black to-black/90 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 51px)`,
          }} />
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full">
                <Zap className="w-4 h-4 text-gold" />
                <span className="text-sm font-sans font-light text-gold">MBA-Level Strategy, Battle-Tested Results</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-chatone mb-6 leading-tight">
              Stop Building on Hope. Start Building on Strategy.
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-4 max-w-3xl mx-auto leading-relaxed">
              Validate your business idea in 45 minutes using MBA-level frameworks powered by AI. Answer 3 questions. Find your white space. Build on strategy, not guesswork.
            </p>
            <p className="text-sm text-white/70 mb-8 max-w-2xl mx-auto">
              For entrepreneurs, service providers, and professionals ready to validate with strategy, not guesswork.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              <div className="relative">
                <div className="absolute -top-3 -right-3 bg-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                  $27
                </div>
                <Button 
                  onClick={handlePurchase}
                  size="lg"
                  className="bg-white text-black hover:bg-white/90"
                  disabled={purchasing}
                >
                  {purchasing ? "Processing..." : "START SYSTEMIZING SUCCESS ($27) →"}
                </Button>
              </div>
            </div>
            <p className="text-xs text-white/60">
              Interactive web app • DIY with AI • Works on any device
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Bonus Announcement */}
      <section className="py-12 px-4 bg-accent">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-accent-foreground">
              🎉 BONUS: FREE Live AI Masterclass
            </h2>
            <p className="text-lg font-bold mb-4 text-accent-foreground">
              Tuesday, November 18th, 7:00 PM CST
            </p>
            <p className="text-base md:text-lg mb-6 text-accent-foreground/90 leading-relaxed">
              Join me live to master ChatGPT, Claude & Perplexity. We'll build a real business together using Workbook 0 frameworks, see how all 4 workbooks connect, and answer your questions. Recording included.
            </p>
            <div className="inline-block bg-accent-foreground/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-accent-foreground/20">
              <p className="text-base font-semibold text-accent-foreground mb-2">
                🎁 Your exclusive buyer pricing:
              </p>
              <p className="text-sm text-accent-foreground/90">
                Complete 4-workbook bundle for $129 (save $168)
              </p>
              <p className="text-sm text-accent-foreground/90">
                Individual workbooks for $48 each (save 50%)
              </p>
              <p className="text-xs text-accent-foreground/80 mt-2">
                Available now through 72 hours after the webinar
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              You're Stuck in Chaos Instead of Strategy
            </h2>
            <div className="space-y-4 text-left max-w-2xl mx-auto mb-8">
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-destructive text-sm">✗</span>
                </div>
                <p className="text-muted-foreground">
                  Business ideas without validation, scattered tactics without systems
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-destructive text-sm">✗</span>
                </div>
                <p className="text-muted-foreground">
                  AI tools that give generic responses, resources that sit unfinished
                </p>
              </div>
              <div className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-destructive text-sm">✗</span>
                </div>
                <p className="text-muted-foreground">
                  Structure feels overwhelming, execution feels impossible
                </p>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4">
              Here's what changes everything:
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              You don't need more information. You need an interactive system that guides you from validation to execution in 45 minutes—not months. We replace blank pages with dynamic frameworks and generic AI with market-trained prompts.
            </p>
            
            <div className="flex justify-center">
              <Button 
                onClick={handlePurchase}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={purchasing}
              >
                {purchasing ? "Processing..." : "START SYSTEMIZING SUCCESS ($27) →"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What You'll Discover in Workbook 0
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Whether you're building a personal brand to claim your thought leadership or ready to launch your product or service—let's do it strategically with an MBA-level strategist and AI as your partners.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    1. Identify Your White Space in 45 Minutes
                  </h3>
                  <p className="text-muted-foreground">
                    → Discover the untapped opportunities where you can stand out without competition—whether that's your unique expertise or your business offering.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    2. Define Who Desperately Needs You
                  </h3>
                  <p className="text-muted-foreground">
                    → Learn exactly who needs your insights, solutions, or services most and what keeps them searching for answers.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    3. Position Yourself (or Your Offer) to Stand Out
                  </h3>
                  <p className="text-muted-foreground">
                    → Craft positioning so clear that your audience instantly understands why you're the only choice.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    4. 15 Market-Trained AI Prompts
                  </h3>
                  <p className="text-muted-foreground">
                    → Strategic insights designed to avoid hallucination, not generic fluff
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              You'll never stare at a blank page again. This interactive web app guides you through proven frameworks with AI that accelerates your thinking, not replaces it.
            </p>
          </div>
        </div>
      </section>

      {/* The Complete System */}
      <section className="py-16 px-4 bg-muted/10">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The Complete System: 4 Workbooks That Build on Each Other
            </h2>
          </div>

          <div className="space-y-6 mb-8">
            <div className="bg-primary/5 border-2 border-primary rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl font-bold text-primary">00</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">FIND YOUR WHITE SPACE ← Start here for $27</h3>
                  <p className="text-muted-foreground mb-2">Validate your market opportunity in 45 minutes with one clear positioning statement</p>
                  <p className="text-sm text-muted-foreground italic">Interactive: Dynamic Market Analysis, AI Competitor Insights, Positioning Generator</p>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl font-bold">01</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">BRAND STRATEGY FOUNDATION <span className="line-through">$97</span> $48</h3>
                  <p className="text-muted-foreground mb-2">Build the bulletproof brand foundation that makes marketing effortless</p>
                  <p className="text-sm text-muted-foreground italic">Interactive: Brand Personality Assessments, Voice Generator, Visual Style Builder</p>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl font-bold">02</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">MARKETING STRATEGY EXECUTION <span className="line-through">$97</span> $48</h3>
                  <p className="text-muted-foreground mb-2">Turn your brand into a revenue-generating machine with systematic campaigns</p>
                  <p className="text-sm text-muted-foreground italic">Interactive: Strategy Builder, Content Calendar Generator, Campaign Templates</p>
                </div>
              </div>
            </div>

            <div className="bg-card border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl font-bold">03</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">GROWTH & MEASUREMENT SYSTEMS <span className="line-through">$97</span> $48</h3>
                  <p className="text-muted-foreground mb-2">Transform data into decisions and scale what works with testing frameworks</p>
                  <p className="text-sm text-muted-foreground italic">Interactive: Dashboard Builder, Growth Calculator, Optimization Tracker</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center bg-card border rounded-lg p-8">
            <p className="text-lg mb-4">
              Each workbook builds systematically. Validation → Brand → Marketing → Growth. No scattered tactics. No random execution.
            </p>
            <p className="text-lg mb-2">
              <strong>Your pricing options:</strong>
            </p>
            <p className="text-lg mb-2">
              💰 Complete bundle: <span className="line-through">$297</span> <span className="font-bold text-primary">$129</span> <span className="text-muted-foreground">(best value - save $168)</span>
            </p>
            <p className="text-lg mb-4">
              📚 Individual workbooks: <span className="line-through">$97</span> <span className="font-bold text-primary">$48</span> each <span className="text-muted-foreground">(save 50%)</span>
            </p>
            <p className="text-sm text-muted-foreground italic">
              Exclusive pricing for Workbook 0 buyers - available until 72 hours after the webinar
            </p>
          </div>

          <div className="text-center mt-8">
            <Button 
              onClick={handlePurchase}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={purchasing}
            >
              {purchasing ? "Processing..." : "START SYSTEMIZING SUCCESS ($27) →"}
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-bold mb-2">Purchase Workbook 0 ($27) →</h3>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-bold mb-2">Access interactive app instantly →</h3>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-bold mb-2">Complete validation in 45 minutes →</h3>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="font-bold mb-2">Join FREE webinar November 18th →</h3>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                5
              </div>
              <h3 className="font-bold mb-2">Get bundle for $129 or individual workbooks for $48 each (your choice)</h3>
            </div>
          </div>

          <p className="text-center text-lg mt-10">
            <strong>No downloads. No PDFs sitting unfinished.</strong>
          </p>
          <p className="text-center text-lg text-muted-foreground">
            Just interactive frameworks, AI acceleration, and strategic clarity.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-muted/10">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Q: Is this really just $27?</h3>
              <p className="text-muted-foreground">
                A: Yes. One-time payment. $27 gets you Workbook 0 + free webinar + exclusive buyer pricing: complete bundle for $129 (save $168) or individual workbooks for $48 each (save 50%). Your discount is active from purchase through 72 hours after the webinar.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Q: What if I can't attend the webinar live?</h3>
              <p className="text-muted-foreground">
                A: You get the full recording + all materials within 24 hours. Your exclusive buyer pricing ($129 bundle or $48 individual workbooks) stays active for 72 hours after the webinar ends—whether you attend live or not.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Q: Do I need all 4 workbooks?</h3>
              <p className="text-muted-foreground">
                A: Workbook 0 validates your idea (stands alone). Workbooks 1-3 turn your validated idea into a complete strategic system. Buy the bundle for $129 (best value) or start with one workbook for $48 and add more later. All pricing available until 72 hours after the webinar.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Q: What if the AI gives me wrong information?</h3>
              <p className="text-muted-foreground">
                A: The prompts are designed to avoid hallucination using market-research principles. The webinar shows you how to fact-check AI responses. Always verify, never blindly trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-black via-black to-black/90 text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-lg md:text-xl mb-4 text-white/80 italic">
            The people who thrive bet on themselves strategically.
          </p>
          
          <p className="text-base md:text-lg mb-4 text-white/90 leading-relaxed">
            You have the vision and drive. Now add MBA-level strategy, AI-powered implementation, and battle-tested frameworks.
          </p>

          <p className="text-base md:text-lg mb-4 text-white/90 leading-relaxed">
            In this economy, there's never been a better opportunity to pour into yourself strategically.
          </p>

          <p className="text-lg md:text-xl mb-8 text-white font-semibold">
            Don't build your business on hope. Build it on strategy.
          </p>

          <Button 
            onClick={handlePurchase}
            size="lg"
            className="mb-4 bg-white text-black hover:bg-white/90"
            disabled={purchasing}
          >
            {purchasing ? "Processing..." : "GET WORKBOOK 0 + FREE WEBINAR ($27) →"}
          </Button>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
            <span>✅ Instant access</span>
            <span>✅ Works on any device</span>
            <span>✅ 30-day money-back guarantee</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Questions? <a href="mailto:web@blkbld.co" className="text-primary hover:underline">web@blkbld.co</a> | Response within 24 hours
          </p>
          <p className="text-sm text-muted-foreground mb-2">
            Joseline Nyinawabera, MBA | Founder, BlkBld & Co. | @JoselineBiz
          </p>
          <p className="text-xs text-muted-foreground">
            © 2025 BLKBLD. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
