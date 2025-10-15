import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Download, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useCountdown } from "@/hooks/useCountdown";

const Webinar = () => {
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [purchasedAt, setPurchasedAt] = useState<Date | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Calculate 72 hours from purchase time
  const expiryDate = purchasedAt ? new Date(purchasedAt.getTime() + 72 * 60 * 60 * 1000) : null;
  const countdown = useCountdown(expiryDate);
  const showDiscount = !countdown.expired;

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      // Check webinar_access table
      const { data, error } = await supabase
        .from('webinar_access')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setHasAccess(!!data);
      
      // Set purchase time for countdown
      if (data?.purchased_at) {
        setPurchasedAt(new Date(data.purchased_at));
      }
      
      // Update last_accessed_at if user has access
      if (data) {
        await supabase
          .from('webinar_access')
          .update({ last_accessed_at: new Date().toISOString() })
          .eq('user_id', session.user.id);
      }
    } catch (error) {
      console.error('Error checking access:', error);
      toast({
        title: "Error",
        description: "Failed to check webinar access",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    setPurchasing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { productType: 'webinar' }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
        setPurchasing(false);
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      toast({
        title: "Payment Error",
        description: "Unable to process payment. Please try again.",
        variant: "destructive",
      });
      setPurchasing(false);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  // PAYWALL STATE
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-muted-foreground" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            This Webinar is Exclusive to Purchasers
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Get instant access to the complete implementation workshop
          </p>

          <div className="bg-card border border-border rounded-lg p-8 mb-8">
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 text-left">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <p className="text-foreground">
                  Watch over-the-shoulder as I complete the entire workbook using AI prompts
                </p>
              </div>
              
              <div className="flex items-start gap-3 text-left">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <p className="text-foreground">
                  Get my exact ChatGPT prompts for each section
                </p>
              </div>
              
              <div className="flex items-start gap-3 text-left">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <p className="text-foreground">
                  Avoid the 3 biggest mistakes beginners make
                </p>
              </div>
              
              <div className="flex items-start gap-3 text-left">
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
              onClick={handlePurchase}
              size="lg"
              className="w-full h-14 text-lg"
              disabled={purchasing}
            >
              {purchasing ? "Processing..." : "Purchase Access Now"}
            </Button>
          </div>

          <Button 
            variant="outline"
            onClick={() => navigate('/')}
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // CONTENT STATE (user has access)
  return (
    <div className="min-h-screen bg-background">
      {/* Webinar Access Info Banner */}
      <div style={{ backgroundColor: '#9f774b' }} className="border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm text-white">
              📺 <span className="font-medium">Your Webinar Access:</span> This training is yours to keep. Watch as many times as you need.
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue to Workbooks
            </Button>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            How to Complete Workbook 0 Using AI
          </h1>
          <p className="text-muted-foreground mt-1">Watch this training as many times as you need</p>
        </div>
      </header>

      {/* Video Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-card rounded-lg overflow-hidden shadow-lg border border-border">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Workbook 0 AI Implementation Workshop"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-12 px-4 bg-muted/10">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Downloadable Resources</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Prompt Templates</h3>
                  <p className="text-sm text-muted-foreground">PDF Download</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">View Workbook 0</h3>
                  <p className="text-sm text-muted-foreground">Start your brand journey</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/workbook/0')}
              >
                View
              </Button>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button 
              size="lg"
              onClick={() => navigate('/')}
            >
              Continue to Workbooks
            </Button>
          </div>
        </div>
      </section>

      {/* Upsell Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
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
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              Special Webinar Attendee Discount
            </div>
            <h2 className="text-3xl font-bold mb-3 text-foreground">
              Ready for the Complete Brand & Marketing System?
            </h2>
            <p className="text-xl text-muted-foreground">
              Get 35% off all workbooks as a webinar attendee
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Workbook Cards */}
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
                  onClick={() => handleWorkbookPurchase(`workbook_${workbook.num}`)}
                  variant="outline"
                  className="w-full"
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
                      $297
                    </span>
                    <span className="text-4xl font-bold text-primary">
                      $197
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-foreground">
                    $297
                  </span>
                )}
              </div>
              {showDiscount && (
                <p className="text-muted-foreground mb-6">
                  Save $113 + Get immediate access to all workbooks
                </p>
              )}
              <Button 
                onClick={() => handleWorkbookPurchase('bundle')}
                size="lg"
                className="px-12"
              >
                Get Complete Bundle
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Webinar;
