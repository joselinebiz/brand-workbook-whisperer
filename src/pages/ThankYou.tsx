import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useCountdown } from "@/hooks/useCountdown";

const ThankYou = () => {
  const [purchasing, setPurchasing] = useState(false);
  const [purchasedAt, setPurchasedAt] = useState<Date | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Set purchase time to current time (assuming they just purchased)
  useEffect(() => {
    setPurchasedAt(new Date());
  }, []);
  
  // Calculate 72 hours from now
  const expiryDate = purchasedAt ? new Date(purchasedAt.getTime() + 72 * 60 * 60 * 1000) : null;
  const countdown = useCountdown(expiryDate);
  const showDiscount = !countdown.expired;

  const handleWebinarPurchase = async () => {
    try {
      setPurchasing(true);

      // Guest checkout is supported - no login required
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { productType: 'webinar' }
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

  const handleWorkbookAccess = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      navigate('/workbook/0');
    } else {
      const savedEmail = localStorage.getItem('leadEmail') || '';
      navigate(`/auth?email=${encodeURIComponent(savedEmail)}&redirectTo=/workbook/0`);
    }
  };

  const handleWorkbookPurchase = async (productType: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { 
          productType,
          discounted: showDiscount // Pass discount flag based on timer
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      toast({
        title: "Payment Error",
        description: "Unable to process payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Confirmation Section */}
      <section className="py-12 px-4 text-center border-b border-border">
        <div className="max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-chatone mb-4 text-foreground">
            Check Your Email! 📧
          </h1>
          <p className="text-xl text-muted-foreground mb-3">
            We just sent you instant access to Workbook 0
          </p>
          <p className="text-sm text-muted-foreground">
            Can't find it? Check your spam folder and mark us as safe.
          </p>
        </div>
      </section>


      {/* Video + Webinar Offer Section */}
      <section className="py-16 px-4 bg-muted/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-chatone text-center mb-8 text-foreground">
            Before You Go... Want to Complete Workbook 0 Faster with AI?
          </h2>
          
          <div className="bg-card rounded-lg overflow-hidden shadow-lg border border-border mb-12">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Workbook 0 AI Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Join: "How to Actually Complete Workbook 0 Using AI"
            </h3>
            
            <p className="text-xl text-muted-foreground mb-8">
              Implementation support, not theory. Watch over my shoulder as I complete the entire workbook using AI.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <p className="text-foreground">
                  Watch over-the-shoulder as I complete the entire workbook using AI prompts
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <p className="text-foreground">
                  Get my exact ChatGPT prompts for each section
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <p className="text-foreground">
                  Avoid the 3 biggest mistakes beginners make
                </p>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <p className="text-foreground">
                  Lifetime access + downloadable AI prompt templates
                </p>
              </div>
            </div>

            <div className="mb-8">
              <div className="text-5xl font-bold text-foreground mb-2">$27</div>
              <p className="text-muted-foreground">One-time payment • Lifetime access</p>
            </div>

            <Button 
              onClick={handleWebinarPurchase}
              size="lg"
              className="w-full h-14 text-lg"
              disabled={purchasing}
            >
              {purchasing ? "Processing..." : "Get Instant Access to Webinar"}
            </Button>
          </div>
        </div>
      </section>

      {/* Workbook Access Section */}
      <section className="py-16 px-4 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-chatone mb-4 text-foreground">
            Ready to Start Workbook 0?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Access your free workbook and begin building your brand foundation
          </p>
          
          <Button 
            onClick={handleWorkbookAccess}
            variant="outline"
            size="lg"
            className="h-14 text-lg"
          >
            Access Workbook 0 Now →
          </Button>
        </div>
      </section>

    </div>
  );
};

export default ThankYou;
