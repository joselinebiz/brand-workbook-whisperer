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
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please sign in to verify your purchase.",
          variant: "destructive",
        });
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { sessionId, productType }
      });

      if (error) throw error;

      if (data.success) {
        setVerified(true);
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error: any) {
      console.error('Payment verification error:', error);
      toast({
        title: "Verification failed",
        description: error.message || "Could not verify your payment",
        variant: "destructive",
      });
      navigate('/');
    } finally {
      setLoading(false);
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

  if (!verified) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
            <CheckCircle2 className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Thank You for Purchasing Workbook 0!
          </h1>
          <p className="text-xl text-muted-foreground">
            You're registered for our live webinar
          </p>
        </div>

        {/* Webinar Section */}
        <div className="bg-card border border-border rounded-lg p-8 mb-8">
          {isBeforeWebinar ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Live Webinar Coming Soon</h2>
              <p className="text-muted-foreground mb-6">
                November 18, 2024 at 6:00 PM CST
              </p>
              
              {/* Countdown Timer */}
              <div className="grid grid-cols-3 gap-4 mb-6">
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

              <div className="bg-secondary/50 rounded-lg p-6">
                <h3 className="font-semibold mb-3">What You'll Learn</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                    <span>How to complete Workbook 0 efficiently using AI</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                    <span>Advanced strategies for market opportunity analysis</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                    <span>Live Q&A with brand strategy experts</span>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-4">Watch the Webinar Replay</h2>
              <div className="aspect-video bg-secondary/20 rounded-lg mb-4">
                {/* Video player will be embedded here */}
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Video player coming soon
                </div>
              </div>
            </>
          )}
        </div>

        {/* Special Offer */}
        {isDiscountActive && (
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20 rounded-lg p-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Special Offer: Complete Bundle</h2>
            </div>
            
            <p className="text-lg mb-6">
              Get all 4 workbooks at <span className="font-bold text-primary">35% discount</span>
            </p>
            
            <div className="bg-card/50 rounded-lg p-6 mb-6">
              <p className="text-muted-foreground mb-4">
                This exclusive discount is available from now until 72 hours after the webinar ends. 
                Use it now or wait until after the session—your choice.
              </p>
              
              {/* Discount Countdown Timer */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">
                    {String(discountCountdown.hours).padStart(2, '0')}
                  </div>
                  <div className="text-sm text-muted-foreground">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">
                    {String(discountCountdown.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">
                    {String(discountCountdown.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-sm text-muted-foreground">Seconds</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-card rounded-lg">
                <div>
                  <h3 className="font-semibold">Complete Brand & Marketing System</h3>
                  <p className="text-sm text-muted-foreground">All 4 Workbooks</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground line-through">$310</div>
                  <div className="text-2xl font-bold text-primary">$197</div>
                </div>
              </div>

              <Button 
                onClick={handleBundlePurchase}
                disabled={purchasing}
                className="w-full"
                size="lg"
              >
                {purchasing ? "Processing..." : "Get the Complete Bundle"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/workbook/0')}
            className="mr-4"
          >
            Access Workbook 0
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WebinarRegistrationSuccess;
