import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshPurchases } = useAuth();
  const { toast } = useToast();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id');
      const productType = searchParams.get('product');

      if (!sessionId || !productType) {
        setVerifying(false);
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('verify-payment', {
          body: { sessionId, productType },
        });

        if (error) throw error;
        
        if (data.success) {
          setVerified(true);
          await refreshPurchases();
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setVerified(false);
        toast({
          title: "Verification Error",
          description: "Please contact support with your order confirmation.",
          variant: "destructive",
        });
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams, refreshPurchases]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        {verifying ? (
          <>
            <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-chatone mb-2">Verifying Payment...</h1>
            <p className="text-muted-foreground">Please wait while we confirm your purchase.</p>
          </>
        ) : verified ? (
          <>
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-chatone mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground mb-6">
              Your purchase has been confirmed. You now have access to your workbook(s).
            </p>
            <Button onClick={() => navigate('/')} className="w-full">
              Go to Workbooks
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-chatone mb-2">Payment Status Unknown</h1>
            <p className="text-muted-foreground mb-6">
              We couldn't verify your payment. Please check your email or contact support.
            </p>
            <Button onClick={() => navigate('/')} variant="outline" className="w-full">
              Return Home
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}