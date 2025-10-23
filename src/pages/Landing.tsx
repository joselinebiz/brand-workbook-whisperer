import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Target, Users, Lightbulb } from "lucide-react";
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
      <section className="min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-chatone mb-6 text-foreground">
            Build Your Million-Dollar Brand Foundation in Under 2 Hours
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Get instant access to Workbook 0 - The Market Opportunity Framework
          </p>

          <div className="max-w-md mx-auto mb-8">
            <div className="bg-card border border-border rounded-lg p-6 mb-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-foreground mb-2">$27</div>
                <p className="text-muted-foreground">One-time payment • Instant access</p>
              </div>
            </div>
            
            <Button 
              onClick={handlePurchase}
              size="lg"
              className="w-full h-14 text-lg"
              disabled={purchasing}
            >
              {purchasing ? "Processing..." : "Get Instant Access"}
            </Button>
          </div>
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
                "The exercises in Workbook 0 are pure gold. I've used expensive consultants before, but this gave me more clarity at a fraction of the cost."
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
            Ready to Build Your Foundation?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get instant access to Workbook 0 for just $27
          </p>

          <div className="max-w-md mx-auto">
            <Button 
              onClick={handlePurchase}
              size="lg"
              className="w-full h-14 text-lg"
              disabled={purchasing}
            >
              {purchasing ? "Processing..." : "Get Instant Access - $27"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
