import { WorkbookCard } from "@/components/WorkbookCard";
import { Button } from "@/components/ui/button";
import { BookOpen, Target, Zap } from "lucide-react";

const Index = () => {
  const workbooks = [
    {
      number: "00",
      title: "FIND YOUR WHITE SPACE",
      subtitle: "The 45 Minute Market Opportunity Sprint",
      timeRequired: "45 min",
      description: "Validate your market opportunity with one clear sentence that defines your unique position.",
      path: "/workbook/0",
    },
    {
      number: "01",
      title: "BRAND STRATEGY FOUNDATION",
      subtitle: "Build the Foundation That Makes Marketing Easier",
      timeRequired: "2-4 hours",
      description: "Create a clear brand foundation that guides every decision with visual and verbal identity systems.",
      path: "/workbook/1",
    },
    {
      number: "02",
      title: "MARKETING STRATEGY EXECUTION",
      subtitle: "Turn Your Brand into a Revenue-Generating Machine",
      timeRequired: "5-10 hours",
      description: "Complete market analysis, positioning strategy, and 90-day content calendar ready to execute.",
      path: "/workbook/2",
    },
    {
      number: "03",
      title: "CUSTOMER JOURNEY & SYSTEMS",
      subtitle: "Turn Leads into Loyal Customers with Automation",
      timeRequired: "2-4 hours",
      description: "Map your customer journey and automate 80% of touchpoints with the proprietary 2-2-2 follow-up system.",
      path: "/workbook/3",
    },
    {
      number: "04",
      title: "MEASUREMENT, SCALING & GROWTH",
      subtitle: "Transform Data into Decisions and Scale What Works",
      timeRequired: "3-5 hours",
      description: "Build your custom performance dashboard and 90-day growth sprint plan with testing frameworks.",
      path: "/workbook/4",
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
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">MBA-Level Strategy, Battle-Tested Results</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-chatone mb-4">
              BRAND & MARKETING MASTER BLUEPRINT
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Your Complete Strategic Foundation - From Market Validation to Systematic Scaling
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="lg" asChild>
                <a href="#workbooks">
                  <BookOpen className="w-5 h-5" />
                  Start Your Journey
                </a>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-2 border-white hover:bg-black hover:text-white hover:border-white" asChild>
                <a href="/blueprint">
                  <Target className="w-5 h-5" />
                  View Master Blueprint
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
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
