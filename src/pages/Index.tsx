import { WorkbookCard } from "@/components/WorkbookCard";
import { Button } from "@/components/ui/button";
import { BookOpen, Target, Zap, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const createPromoCode = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-promo-code');
      if (error) throw error;
      toast({
        title: "Success!",
        description: `Promotion code created: ${data.code}`,
      });
    } catch (error: any) {
      toast({
        title: "Note",
        description: error.message || "Code may already exist",
        variant: "destructive",
      });
    }
  };

  const workbooks = [
    {
      number: "00",
      title: "FIND YOUR WHITE SPACE",
      subtitle: "The 45 Minute Market Opportunity Sprint",
      timeRequired: "45 min",
      description: "Validate your market opportunity with one clear sentence that defines your unique position.",
      path: "/workbook/0",
      productType: "workbook_0",
      price: 0,
    },
    {
      number: "01",
      title: "BRAND STRATEGY FOUNDATION",
      subtitle: "Build the Foundation That Makes Marketing Easier",
      timeRequired: "2-4 hours",
      description: "Create a clear brand foundation that guides every decision with visual and verbal identity systems.",
      path: "/workbook/1",
      productType: "workbook_1",
      price: 19700,
    },
    {
      number: "02",
      title: "MARKETING STRATEGY EXECUTION",
      subtitle: "Turn Your Brand into a Revenue-Generating Machine",
      timeRequired: "5-10 hours",
      description: "Complete market analysis, positioning strategy, and 90-day content calendar ready to execute.",
      path: "/workbook/2",
      productType: "workbook_2",
      price: 19700,
    },
    {
      number: "03",
      title: "CUSTOMER JOURNEY & SYSTEMS",
      subtitle: "Turn Leads into Loyal Customers with Automation",
      timeRequired: "2-4 hours",
      description: "Map your customer journey and automate 80% of touchpoints with the proprietary 2-2-2 follow-up system.",
      path: "/workbook/3",
      productType: "workbook_3",
      price: 19700,
    },
    {
      number: "04",
      title: "MEASUREMENT, SCALING & GROWTH",
      subtitle: "Transform Data into Decisions and Scale What Works",
      timeRequired: "3-5 hours",
      description: "Build your custom performance dashboard and 90-day growth sprint plan with testing frameworks.",
      path: "/workbook/4",
      productType: "workbook_4",
      price: 19700,
    },
    {
      number: "01-04 📦",
      title: "COMPLETE BUNDLE",
      subtitle: "All Workbooks 1-4 - Save $391",
      timeRequired: "15-25 hours",
      description: "Get complete access to all four workbooks: Brand Strategy, Marketing Execution, Customer Journey, and Growth Scaling. The complete system to build and scale your business.",
      path: "/workbook/1",
      productType: "bundle",
      price: 39700,
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
              <Button variant="outline" size="sm" onClick={createPromoCode} className="bg-transparent border-white/20 text-white hover:bg-white/10">
                Create Test Promo Code
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
