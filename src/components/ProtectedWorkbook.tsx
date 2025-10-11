import { useEffect, ReactNode } from 'react';
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
  const hasAccess = checkAccess(productType);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handlePurchase = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { productType },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create checkout session",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

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
            <Button onClick={handlePurchase} size="lg">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Purchase Now
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