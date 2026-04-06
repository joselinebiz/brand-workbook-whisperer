import { useEffect, ReactNode, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, ShoppingCart, Ticket } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProtectedWorkbookProps {
  children: ReactNode;
  productType: string;
  priceId: string;
  price: number;
  workbookTitle: string;
}

export const ProtectedWorkbook = ({ 
  children, 
  productType, 
  priceId, 
  price, 
  workbookTitle 
}: ProtectedWorkbookProps) => {
  const { user, checkAccess, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [serverVerified, setServerVerified] = useState<boolean | null>(null);
  const [verifying, setVerifying] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [eventCode, setEventCode] = useState('');
  const [redeemingCode, setRedeemingCode] = useState(false);
  const clientHasAccess = checkAccess(productType);

  // Read code from URL param
  const urlParams = new URLSearchParams(window.location.search);
  const urlCode = urlParams.get('code');

  // Redirect to auth if not logged in, preserving the code param
  useEffect(() => {
    if (!loading && !user) {
      const currentPath = window.location.pathname;
      const redirectPath = urlCode ? `${currentPath}?code=${urlCode}` : currentPath;
      navigate(`/auth?redirectTo=${encodeURIComponent(redirectPath)}`);
    }
  }, [user, loading, navigate, urlCode]);

  // Server-side access verification
  useEffect(() => {
    const verifyAccess = async () => {
      if (!user || loading) return;

      try {
        setVerifying(true);
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setServerVerified(false);
          return;
        }

        const { data, error } = await supabase.functions.invoke('verify-workbook-access', {
          body: { productType },
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (error) {
          if (import.meta.env.DEV) {
            console.error('Server verification error:', error);
          }
          setServerVerified(false);
          toast({
            title: "Verification Failed",
            description: "Unable to verify access. Please try again.",
            variant: "destructive",
          });
          return;
        }

        setServerVerified(data?.hasAccess || false);
      } catch (error: any) {
        if (import.meta.env.DEV) {
          console.error('Error verifying access:', error);
        }
        setServerVerified(false);
      } finally {
        setVerifying(false);
      }
    };

    verifyAccess();
  }, [user, loading, productType, toast]);

  const handlePurchase = async () => {
    if (!productType) return;
    
    setPurchasing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { productType },
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create checkout session",
        variant: "destructive",
      });
      setPurchasing(false);
    }
  };

  const handleRedeemCode = async () => {
    if (!eventCode.trim()) return;
    
    setRedeemingCode(true);
    
    try {
      // Refresh the session first to avoid stale tokens
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        // Try refreshing
        const { data: refreshData } = await supabase.auth.refreshSession();
        if (!refreshData.session) {
          toast({ 
            title: "Session Expired", 
            description: "Please sign out and sign back in, then try your code again.", 
            variant: "destructive" 
          });
          setRedeemingCode(false);
          return;
        }
      }

      const activeSession = (await supabase.auth.getSession()).data.session;
      if (!activeSession) {
        toast({ title: "Error", description: "Please log in first.", variant: "destructive" });
        setRedeemingCode(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('redeem-event-code', {
        body: { code: eventCode.trim() },
        headers: { Authorization: `Bearer ${activeSession.access_token}` },
      });

      // supabase.functions.invoke wraps non-2xx as error, but also check data
      if (error) {
        // Try to extract a useful message from the error
        const errorMsg = typeof error === 'object' && error.message 
          ? error.message 
          : 'Something went wrong. Please try again.';
        toast({ title: "Error", description: errorMsg, variant: "destructive" });
        return;
      }

      if (data?.success) {
        toast({ title: "Success!", description: data.message || "Access granted!" });
        // Re-verify access
        setVerifying(true);
        setServerVerified(null);
        const { data: verifyData } = await supabase.functions.invoke('verify-workbook-access', {
          body: { productType },
          headers: { Authorization: `Bearer ${activeSession.access_token}` },
        });
        setServerVerified(verifyData?.hasAccess || false);
        setVerifying(false);
      } else {
        toast({ 
          title: "Invalid Code", 
          description: data?.error || "That code didn't work. Double-check and try again.", 
          variant: "destructive" 
        });
      }
    } catch (error: any) {
      console.error('Redeem code error:', error);
      toast({ 
        title: "Something went wrong", 
        description: "Please try again. If it still doesn't work, refresh the page and re-enter your code.", 
        variant: "destructive" 
      });
    } finally {
      setRedeemingCode(false);
    }
  };

  if (loading || verifying) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {loading ? 'Loading...' : 'Verifying access...'}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const hasAccess = serverVerified === true;

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl p-8 text-center">
          <Lock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-3xl font-chatone mb-2">Access Required</h1>
          <p className="text-muted-foreground mb-6">
            You need to purchase {workbookTitle} to access this content.
          </p>
          <div className="bg-muted p-6 rounded-lg mb-6">
            <p className="text-2xl font-bold mb-2">${price / 100}</p>
            <p className="text-sm text-muted-foreground">6 months access</p>
          </div>
          <div className="flex gap-4 justify-center mb-8">
            <Button onClick={handlePurchase} size="lg" disabled={purchasing}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              {purchasing ? 'Processing...' : 'Purchase Now'}
            </Button>
            <Button variant="outline" onClick={() => navigate('/')} size="lg">
              Back to Home
            </Button>
          </div>

          {/* Event Access Code */}
          <div className="border-t pt-6">
            <div className="flex items-center gap-2 justify-center mb-3">
              <Ticket className="w-5 h-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground font-medium">Have an event access code?</p>
            </div>
            <div className="flex gap-2 max-w-sm mx-auto">
              <Input
                placeholder="Enter code"
                value={eventCode}
                onChange={(e) => setEventCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleRedeemCode()}
                className="text-center tracking-widest font-mono"
              />
              <Button 
                onClick={handleRedeemCode} 
                disabled={redeemingCode || !eventCode.trim()}
                variant="secondary"
              >
                {redeemingCode ? 'Checking...' : 'Redeem'}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
