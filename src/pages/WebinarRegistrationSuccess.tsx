import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useCountdown } from '@/hooks/useCountdown';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WebinarRegistrationSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [needsAccount, setNeedsAccount] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');

  // Webinar date: November 18, 2024 at 6:00 PM CST
  const webinarDate = new Date('2024-11-18T18:00:00-06:00');
  
  // Discount expires 72 hours after webinar ends
  const discountExpiryDate = new Date(webinarDate.getTime() + (72 * 60 * 60 * 1000));
  
  const webinarCountdown = useCountdown(webinarDate);
  const discountCountdown = useCountdown(discountExpiryDate);
  
  const isBeforeWebinar = !webinarCountdown.expired;
  const isDiscountActive = !discountCountdown.expired;

  useEffect(() => {
    verifyPayment();
  }, []);

  const verifyPayment = async () => {
    const sessionId = searchParams.get('session_id');
    const productType = searchParams.get('product');

    if (!sessionId || productType !== 'workbook_0') {
      navigate('/');
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      // Allow viewing the page without authentication, but verify payment if logged in
      if (session) {
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { sessionId, productType }
        });

        if (error) throw error;

        if (data.success) {
          setVerified(true);
        }
      } else {
        // Guest user - verify the payment succeeded via Stripe
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { sessionId, productType }
        });

        if (error) {
          console.error('Verification error:', error);
        }

        if (data?.needsAccount) {
          setNeedsAccount(true);
          setCustomerEmail(data.email || '');
        } else if (data?.success) {
          setVerified(true);
        } else {
          // Show page anyway for guest users to see the offer
          setNeedsAccount(true);
        }
      }
    } catch (error: any) {
      console.error('Payment verification error:', error);
      // Don't redirect, let them see the page
      setNeedsAccount(true);
    } finally {
      setLoading(false);
    }
  };

  const handleWorkbookPurchase = async (workbookNum: number) => {
    setPurchasing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { 
          productType: `workbook_${workbookNum}`,
          discounted: isDiscountActive
        }
      });

      if (error) throw error;

      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      console.error('Error creating payment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create payment session",
        variant: "destructive",
      });
    } finally {
      setPurchasing(false);
    }
  };

  const handleBundlePurchase = async () => {
    setPurchasing(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { 
          productType: 'bundle',
          discounted: isDiscountActive
        }
      });

      if (error) throw error;

      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      console.error('Error creating payment:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create payment session",
        variant: "destructive",
      });
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying your purchase...</p>
        </div>
      </div>
    );
  }

  // Show page for both verified users and guests who need accounts

  return (
    <div className="min-h-screen bg-background">
      {/* Success Banner */}
      <div style={{ backgroundColor: '#9f774b' }} className="border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm text-white">
              🎉 <span className="font-medium">Thank you for purchasing Workbook 0!</span> You're registered for our live webinar.
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
              <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
              Back to Home
            </Button>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {isBeforeWebinar ? "You're Registered for Our Live Webinar" : "Watch the Webinar Replay"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isBeforeWebinar ? "November 18, 2024 at 6:00 PM CST" : "Access your exclusive training"}
          </p>
        </div>
      </header>

      {/* Webinar Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {isBeforeWebinar ? (
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Live Webinar Coming Soon</h2>
                <p className="text-muted-foreground mb-6">
                  November 18, 2024 at 6:00 PM CST
                </p>
                
                {/* Countdown Timer */}
                <div className="flex justify-center gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-1">
                      {String(webinarCountdown.hours).padStart(2, '0')}
                    </div>
                    <div className="text-sm text-muted-foreground">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-1">
                      {String(webinarCountdown.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-sm text-muted-foreground">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-1">
                      {String(webinarCountdown.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-sm text-muted-foreground">Seconds</div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-semibold mb-4 text-foreground">What You'll Learn</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-foreground">How to complete Workbook 0 efficiently using AI</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-foreground">Advanced strategies for market opportunity analysis</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-foreground">Live Q&A with brand strategy experts</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-lg overflow-hidden shadow-lg border border-border">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Workbook 0 Webinar Replay"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Special Offer Section */}
      {isDiscountActive && (
        <section className="py-16 px-4 bg-muted/10">
          <div className="container mx-auto max-w-6xl">
            {/* Urgency Banner with Countdown */}
            <div className="bg-gradient-to-r from-yellow-500/20 via-yellow-400/20 to-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-8 text-center">
              <p className="text-foreground font-bold mb-2">
                ⏰ SPECIAL OFFER: This exclusive 35% discount expires in:
              </p>
              <div className="flex justify-center gap-4 text-foreground">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold">{String(discountCountdown.hours).padStart(2, '0')}</span>
                  <span className="text-xs">hours</span>
                </div>
                <span className="text-2xl font-bold">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold">{String(discountCountdown.minutes).padStart(2, '0')}</span>
                  <span className="text-xs">minutes</span>
                </div>
                <span className="text-2xl font-bold">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold">{String(discountCountdown.seconds).padStart(2, '0')}</span>
                  <span className="text-xs">seconds</span>
                </div>
              </div>
            </div>

            <div className="text-center mb-12">
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                Special Webinar Attendee Discount
              </div>
              <h2 className="text-3xl font-bold mb-3 text-foreground">
                Get All 4 Workbooks at 35% Discount
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                This discount is available from now until 72 hours after the webinar ends. 
                Use it now or wait until after the session—your choice.
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
                    <span className="text-lg text-muted-foreground line-through mr-2">
                      ${workbook.original}
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      ${workbook.discounted}
                    </span>
                  </div>
                  <Button 
                    onClick={() => handleWorkbookPurchase(workbook.num)}
                    variant="outline"
                    className="w-full"
                    disabled={purchasing}
                  >
                    Purchase
                  </Button>
                </div>
              ))}
            </div>

            {/* Bundle Card */}
            <div className="bg-primary/5 border-2 border-primary rounded-lg p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                Best Value - Save $100+
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  Complete Bundle (All 4)
                </h3>
                <div className="mb-4">
                  <span className="text-xl text-muted-foreground line-through mr-3">
                    $310
                  </span>
                  <span className="text-4xl font-bold text-primary">
                    $197
                  </span>
                </div>
                <p className="text-muted-foreground mb-6">
                  Save $113 + Get immediate access to all workbooks
                </p>
                <Button 
                  onClick={handleBundlePurchase}
                  size="lg"
                  className="px-12"
                  disabled={purchasing}
                >
                  {purchasing ? "Processing..." : "Get Complete Bundle"}
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Navigation Section */}
      <section className="py-12 px-4 bg-card">
        <div className="container mx-auto max-w-5xl text-center">
          {verified ? (
            <Button 
              size="lg"
              onClick={() => navigate('/workbook/0')}
            >
              Access Workbook 0
            </Button>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground mb-4">
                Create an account to access your workbook and webinar
              </p>
              <Button 
                size="lg"
                onClick={() => navigate('/auth')}
              >
                Create Account to Access Workbook 0
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default WebinarRegistrationSuccess;
