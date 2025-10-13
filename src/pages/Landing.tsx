import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target, Users, Lightbulb, FlaskConical } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { TestModeModal } from "@/components/TestModeModal";
import { Badge } from "@/components/ui/badge";

const Landing = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [testModalOpen, setTestModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Store email in localStorage for pre-filling later
      localStorage.setItem('leadEmail', email);

      // Insert lead into database
      const { error: insertError } = await supabase
        .from('leads')
        .insert([{ email, source: 'landing_page' }]);

      if (insertError) {
        if (insertError.code === '23505') {
          // Email already exists - still redirect to thank you
          localStorage.setItem('leadEmail', email);
          navigate('/thank-you');
          return;
        }
        throw insertError;
      }

      // Send to Resend via edge function
      await supabase.functions.invoke('add-lead', {
        body: { email }
      });

      navigate('/thank-you');
    } catch (error) {
      console.error('Error capturing lead:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Test Mode Badge (Development Only) */}
      {import.meta.env.DEV && (
        <div className="fixed top-4 right-4 z-50">
          <Badge 
            variant="destructive" 
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setTestModalOpen(true)}
          >
            <FlaskConical className="w-3 h-3 mr-1" />
            TEST MODE
          </Badge>
        </div>
      )}

      <TestModeModal open={testModalOpen} onOpenChange={setTestModalOpen} />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-chatone mb-6 text-foreground">
            Build Your Million-Dollar Brand Foundation in Under 2 Hours
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12">
            Get instant access to Workbook 0 - The Market Opportunity Framework (FREE)
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 text-lg"
                required
                aria-label="Email address"
              />
              <Button 
                type="submit" 
                size="lg"
                className="h-14 text-lg"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Get Free Access"}
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-chatone text-center mb-16 text-foreground">
            What You'll Discover in Workbook 0
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Identify Your White Space in 30 Minutes
              </h3>
              <p className="text-muted-foreground">
                Discover the untapped market opportunities where your business can thrive without competition.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Define Your Ideal Customer's #1 Problem
              </h3>
              <p className="text-muted-foreground">
                Learn exactly who needs your solution most and what keeps them up at night.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Craft a Solution That Sells Itself
              </h3>
              <p className="text-muted-foreground">
                Position your offering in a way that makes the buying decision obvious for your customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-chatone text-center mb-16 text-foreground">
            Join Founders Who've Built Their Brand Foundation
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg border border-border">
              <p className="text-muted-foreground mb-6 italic">
                "This framework helped me finally understand where my product fits in the market. I went from confused to confident in under an hour."
              </p>
              <div>
                <p className="font-semibold text-foreground">Sarah Chen</p>
                <p className="text-sm text-muted-foreground">Founder, TechStart Co</p>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <p className="text-muted-foreground mb-6 italic">
                "The exercises in Workbook 0 are pure gold. I've used expensive consultants before, but this gave me more clarity for free."
              </p>
              <div>
                <p className="font-semibold text-foreground">Michael Rodriguez</p>
                <p className="text-sm text-muted-foreground">CEO, Growth Labs</p>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <p className="text-muted-foreground mb-6 italic">
                "I was ready to give up on my idea until I worked through this framework. Now I have a clear path forward and paying customers."
              </p>
              <div>
                <p className="font-semibold text-foreground">Emma Williams</p>
                <p className="text-sm text-muted-foreground">Founder, Creative Studio</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-muted/10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-chatone mb-6 text-foreground">
            Ready to start?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Enter your email below to get instant access to Workbook 0
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-14 text-lg"
                required
                aria-label="Email address"
              />
              <Button 
                type="submit" 
                size="lg"
                className="h-14 text-lg"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Get Free Access"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Landing;
