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

      {/* Webinar Replay Info */}
      <section className="py-6 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-muted/50 border border-border rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2 text-foreground">
              📺 Your Webinar Access
            </h3>
            <p className="text-muted-foreground">
              This training is yours to keep. Watch as many times as you need. Bookmark this page to return anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 px-4 bg-muted/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-chatone text-center mb-8 text-foreground">
            Before You Go... Want to Complete Workbook 0 Faster with AI?
          </h2>
          
          <div className="bg-card rounded-lg overflow-hidden shadow-lg border border-border">
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
        </div>
      </section>

      {/* Webinar Offer Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Urgency Banner with Countdown */}
          {showDiscount && (
            <div className="bg-gradient-to-r from-yellow-500/20 via-yellow-400/20 to-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-8 text-center">
              <p className="text-foreground font-bold mb-2">
                ⏰ WEBINAR ATTENDEE SPECIAL: This exclusive 35% discount expires in:
              </p>
              <div className="flex justify-center gap-4 text-foreground">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold">{countdown.hours}</span>
                  <span className="text-xs">hours</span>
                </div>
                <span className="text-2xl font-bold">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold">{countdown.minutes}</span>
                  <span className="text-xs">minutes</span>
                </div>
                <span className="text-2xl font-bold">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold">{countdown.seconds}</span>
                  <span className="text-xs">seconds</span>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 text-foreground">
              Ready for the Complete Brand & Marketing System?
            </h2>
            <p className="text-xl text-muted-foreground">
              Get 20% off all workbooks as a webinar attendee
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Individual Workbook Cards */}
            {[
              { num: 1, title: "Brand Identity", original: 97, discounted: 63 },
              { num: 2, title: "Marketing Strategy", original: 97, discounted: 63 },
              { num: 3, title: "Customer Journey", original: 97, discounted: 63 },
              { num: 4, title: "Growth Systems", original: 97, discounted: 63 },
            ].map((workbook) => (
              <div key={workbook.num} className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2 text-foreground">
                  Workbook {workbook.num}
                </h3>
                <p className="text-muted-foreground mb-4">{workbook.title}</p>
                <div className="mb-4">
                  {showDiscount ? (
                    <>
                      <span className="text-lg text-muted-foreground line-through mr-2">
                        ${workbook.original}
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        ${workbook.discounted}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-foreground">
                      ${workbook.original}
                    </span>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleWorkbookPurchase(`workbook_${workbook.num}`)}
                >
                  Purchase
                </Button>
              </div>
            ))}
          </div>

          {/* Bundle Card */}
          <div className="bg-primary/5 border-2 border-primary rounded-lg p-8 relative">
            {showDiscount && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Best Value - Save $113+
              </div>
            )}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2 text-foreground">
                Complete Bundle (All 4)
              </h3>
              <div className="mb-4">
                {showDiscount ? (
                  <>
                    <span className="text-xl text-muted-foreground line-through mr-3">
                      $310
                    </span>
                    <span className="text-4xl font-bold text-primary">
                      $197
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-foreground">
                    $310
                  </span>
                )}
              </div>
              {showDiscount && (
                <p className="text-muted-foreground mb-6">
                  Save $113 + Get immediate access to all workbooks
                </p>
              )}
              <Button 
                size="lg" 
                className="px-12"
                onClick={() => handleWorkbookPurchase('bundle')}
              >
                Get Complete Bundle
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Workbook Access Section */}
      <section className="py-16 px-4 border-t border-border bg-muted/10">
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
