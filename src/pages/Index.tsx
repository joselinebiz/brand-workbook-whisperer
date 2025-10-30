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
      subtitle: "The 45 Minute Market Opportunity Sprint",
      timeRequired: "45 min",
      description: "Validate your market opportunity with one clear sentence that defines your unique position.",
      path: "/workbook/0",
      productType: "workbook_0",
      price: 2700,
    },
    {
      number: "01",
      title: "BRAND STRATEGY FOUNDATION",
      subtitle: "Build the Foundation That Makes Marketing Easier",
      timeRequired: "2-4 hours",
      description: "Create a clear brand foundation that guides every decision with visual and verbal identity systems.",
      path: "/workbook/1",
      productType: "workbook_1",
      price: 9700,
    },
    {
      number: "02",
      title: "MARKETING STRATEGY EXECUTION",
      subtitle: "Turn Your Brand into a Revenue-Generating Machine",
      timeRequired: "5-10 hours",
      description: "Complete market analysis, positioning strategy, and 90-day content calendar ready to execute.",
      path: "/workbook/2",
      productType: "workbook_2",
      price: 9700,
    },
    {
      number: "03",
      title: "CUSTOMER JOURNEY & SYSTEMS",
      subtitle: "Turn Leads into Loyal Customers with Automation",
      timeRequired: "2-4 hours",
      description: "Map your customer journey and automate 80% of touchpoints with the proprietary 2-2-2 follow-up system.",
      path: "/workbook/3",
      productType: "workbook_3",
      price: 9700,
    },
    {
      number: "04",
      title: "MEASUREMENT, SCALING & GROWTH",
      subtitle: "Transform Data into Decisions and Scale What Works",
      timeRequired: "3-5 hours",
      description: "Build your custom performance dashboard and 90-day growth sprint plan with testing frameworks.",
      path: "/workbook/4",
      productType: "workbook_4",
      price: 9700,
    },
    {
      number: "01-04 📦",
      title: "COMPLETE BUNDLE",
      subtitle: "All Workbooks 1-4 - Save $91",
      timeRequired: "15-25 hours",
      description: "Get complete access to all four workbooks: Brand Strategy, Marketing Execution, Customer Journey, and Growth Scaling. The complete system to build and scale your business.",
      path: "/workbook/1",
      productType: "bundle",
      price: 29700,
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
              <h1 className="text-4xl font-chatone mb-4">The Complete Journey</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Five workbooks that take you from market validation to systematic scaling
              </p>
            </div>

            <div className="grid gap-6">
              {workbooks.map((workbook) => (
                <WorkbookCard key={workbook.number} {...workbook} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            You're not just learning concepts—you're implementing the same systems that generate six-figure consulting engagements.
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
