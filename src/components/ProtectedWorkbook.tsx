import { useEffect, ReactNode, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, ShoppingCart } from 'lucide-react';
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
  const clientHasAccess = checkAccess(productType);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // Server-side access verification
  useEffect(() => {
    const verifyAccess = async () => {
      if (!user || loading) return;

      try {
        setVerifying(true);
        
        // Get the current session to pass the auth token
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
        // Use window.location.href to redirect in same window
        window.location.href = data.url;
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create checkout session",
        variant: "destructive",
      });
      setPurchasing(false); // Only re-enable on error, since we navigate away on success
    }
    // Note: Don't set purchasing to false on success because we're navigating away
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
    return null; // Will redirect in useEffect
  }

  // SECURITY: Only trust server verification. Never fall back to client-side check.
  // If server hasn't verified yet, deny access (handled by verifying state above).
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
          <div className="flex gap-4 justify-center">
            <Button onClick={handlePurchase} size="lg" disabled={purchasing}>
              <ShoppingCart className="w-5 h-5 mr-2" />
              {purchasing ? 'Processing...' : 'Purchase Now'}
            </Button>
            <Button variant="outline" onClick={() => navigate('/')} size="lg">
              Back to Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};
