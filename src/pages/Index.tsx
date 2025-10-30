import { WorkbookCard } from "@/components/WorkbookCard";
import { Button } from "@/components/ui/button";
import { BookOpen, Target, Zap, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();


  const workbooks = [
    {
      number: "00",
      title: "FIND YOUR WHITE SPACE",
      subtitle: "← Start here for $27",
      timeRequired: "45 min",
      description: "Validate your market opportunity in 45 minutes with one clear positioning statement. Interactive: Dynamic Market Analysis, AI Competitor Insights, Positioning Generator",
      path: "/workbook/0",
      productType: "workbook_0",
      price: 2700,
    },
    {
      number: "01",
      title: "BRAND STRATEGY FOUNDATION",
      subtitle: "($97)",
      timeRequired: "2-4 hours",
      description: "Build the bulletproof brand foundation that makes marketing effortless. Interactive: Brand Personality Assessments, Voice Generator, Visual Style Builder",
      path: "/workbook/1",
      productType: "workbook_1",
      price: 9700,
    },
    {
      number: "02",
      title: "MARKETING STRATEGY EXECUTION",
      subtitle: "($97)",
      timeRequired: "5-10 hours",
      description: "Turn your brand into a revenue-generating machine with systematic campaigns. Interactive: Strategy Builder, Content Calendar Generator, Campaign Templates",
      path: "/workbook/2",
      productType: "workbook_2",
      price: 9700,
    },
    {
      number: "03",
      title: "GROWTH & MEASUREMENT SYSTEMS",
      subtitle: "($97)",
      timeRequired: "2-4 hours",
      description: "Transform data into decisions and scale what works with testing frameworks. Interactive: Dashboard Builder, Growth Calculator, Optimization Tracker",
      path: "/workbook/3",
      productType: "workbook_3",
      price: 9700,
    },
  ];

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
          <div className="absolute top-4 right-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-white/80">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <Button variant="outline" size="sm" onClick={signOut} className="bg-transparent border-white/20 text-white hover:bg-white/10">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => navigate('/auth')} className="bg-transparent border-white/20 text-white hover:bg-white/10">
                Sign In
              </Button>
            )}
          </div>

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
                <Button variant="hero" size="lg" asChild>
                  <a href="#workbooks">
                    START SYSTEMIZING SUCCESS ($27) →
                  </a>
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
              <p className="text-base font-semibold text-accent-foreground">
                🎁 Attendee-only pricing: Complete 4-workbook system for $129 (save $168)
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
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              You don't need more information. You need an interactive system that guides you from validation to execution in 45 minutes—not months. We replace blank pages with dynamic frameworks and generic AI with market-trained prompts.
            </p>
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
                  <User className="w-5 h-5 text-primary" />
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

      {/* Value Props */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">MBA-Level Strategy</h3>
              <p className="text-muted-foreground text-sm">
                Proven frameworks from top-tier business education, adapted for real-world application
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Battle-Tested</h3>
              <p className="text-muted-foreground text-sm">
                Refined through years of building and scaling multiple businesses
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Results-Driven</h3>
              <p className="text-muted-foreground text-sm">
                Every exercise connects directly to revenue, customers, and sustainable growth
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workbooks Section */}
      <section id="workbooks" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-chatone mb-4">The Complete System: 4 Workbooks That Build on Each Other</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Each workbook builds systematically. Validation → Brand → Marketing → Growth. No scattered tactics. No random execution.
              </p>
            </div>

            <div className="grid gap-6 mb-8">
              {workbooks.map((workbook) => (
                <WorkbookCard key={workbook.number} {...workbook} />
              ))}
            </div>

            <div className="text-center bg-muted/30 border rounded-lg p-8">
              <p className="text-lg mb-4">
                Get all 4 workbooks: <span className="font-bold line-through">$297 regular</span> | <span className="font-bold text-primary">$129 webinar attendee pricing</span> <span className="text-muted-foreground">(save $168)</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/10">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-bold mb-2">Purchase Workbook 0</h3>
              <p className="text-sm text-muted-foreground">($27)</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-bold mb-2">Access interactive app</h3>
              <p className="text-sm text-muted-foreground">instantly</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-bold mb-2">Complete validation</h3>
              <p className="text-sm text-muted-foreground">in 45 minutes</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="font-bold mb-2">Join FREE webinar</h3>
              <p className="text-sm text-muted-foreground">November 18th</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                5
              </div>
              <h3 className="font-bold mb-2">Decide on complete system</h3>
              <p className="text-sm text-muted-foreground">($129)</p>
            </div>
          </div>

          <p className="text-center text-lg text-muted-foreground mt-10">
            No downloads. No PDFs sitting unfinished. Just interactive frameworks, AI acceleration, and strategic clarity.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-2">Q: Is this really just $27?</h3>
              <p className="text-muted-foreground">
                A: Yes. One-time payment. $27 gets you Workbook 0 + free webinar + option to get the complete system for $129 (save $168).
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Q: What if the AI gives me wrong information?</h3>
              <p className="text-muted-foreground">
                A: The prompts are designed to avoid hallucination using market-research principles. The webinar shows you how to fact-check AI responses. Always verify, never blindly trust.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Q: What if I can't attend the webinar live?</h3>
              <p className="text-muted-foreground">
                A: You get the full recording + all materials within 24 hours. Your $129 bundle discount stays active for 72 hours after the webinar ends.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Q: Do I need all 4 workbooks?</h3>
              <p className="text-muted-foreground">
                A: Workbook 0 validates your idea (stands alone). Workbooks 1-3 turn your validated idea into a complete strategic system. Buy individually ($97 each) or as bundle ($297, or $129 for webinar attendees).
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

          <Button variant="hero" size="lg" asChild className="mb-4">
            <a href="#workbooks">
              GET WORKBOOK 0 + FREE WEBINAR ($27) →
            </a>
          </Button>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80">
            <span>✅ Instant access</span>
            <span>✅ Works on any device</span>
            <span>✅ 30-day money-back guarantee</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
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

export default Index;
