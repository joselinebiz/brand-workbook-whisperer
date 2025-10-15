import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { authSchema } from '@/lib/validation';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshPurchases } = useAuth();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [needsAccount, setNeedsAccount] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [signingUp, setSigningUp] = useState(false);

  const productType = searchParams.get('product');
  const isWebinar = searchParams.get('type') === 'webinar';

  const verifyPayment = async () => {
    const urlSessionId = searchParams.get('session_id');
    
    if (!urlSessionId) {
      setError('No session ID found');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // For webinar purchases, use special verification flow
      if (isWebinar) {
        const { data, error: verifyError } = await supabase.functions.invoke('verify-webinar-payment', {
          body: { sessionId: urlSessionId }
        });

        if (verifyError) throw verifyError;

        if (data?.needsAccount) {
          // User needs to create an account
          setNeedsAccount(true);
          setCustomerEmail(data.email);
          setSessionId(data.sessionId);
        } else if (data?.success && data?.verified) {
          // Success! Access granted
          setVerified(true);
          await refreshPurchases();
          toast({
            title: "Payment Confirmed!",
            description: "You now have access to the webinar.",
          });
        } else {
          setError(data?.error || 'Verification failed');
        }
      } else {
        // Regular workbook verification
        if (!productType) {
          setError('No product type found');
          setLoading(false);
          return;
        }

        const { data, error: verifyError } = await supabase.functions.invoke('verify-payment', {
          body: { sessionId: urlSessionId, productType },
        });

        if (verifyError) throw verifyError;
        
        if (data?.success) {
          setVerified(true);
          await refreshPurchases();
          toast({
            title: "Purchase Confirmed!",
            description: "Your access has been activated.",
          });
        } else {
          setError('Verification failed');
        }
      }
    } catch (err) {
      console.error('Error verifying payment:', err);
      setError(err instanceof Error ? err.message : 'Verification failed. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password using shared validation schema
    const validation = authSchema.safeParse({ 
      email: customerEmail, 
      password 
    });
    
    if (!validation.success) {
      const passwordError = validation.error.errors.find(e => e.path.includes('password'));
      toast({
        title: "Invalid Password",
        description: passwordError?.message || "Password does not meet requirements.",
        variant: "destructive"
      });
      return;
    }

    setSigningUp(true);

    try {
      // Create the account
      const { error: signUpError } = await supabase.auth.signUp({
        email: customerEmail,
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (signUpError) throw signUpError;

      // Wait a moment for the account to be created
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Now verify the payment again to grant access
      await verifyPayment();
      
      setNeedsAccount(false);
    } catch (err) {
      console.error('Error creating account:', err);
      toast({
        title: "Signup Error",
        description: err instanceof Error ? err.message : 'Failed to create account. Please contact support.',
        variant: "destructive"
      });
    } finally {
      setSigningUp(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        {loading ? (
          <>
            <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-chatone mb-2">Verifying Payment...</h1>
            <p className="text-muted-foreground">Please wait while we confirm your purchase.</p>
          </>
        ) : needsAccount ? (
          <>
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-chatone mb-2">Payment Successful!</h1>
            <p className="text-muted-foreground mb-6">
              Create your account to access the webinar
            </p>
            
            <form onSubmit={handleSignup} className="space-y-4 text-left">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerEmail}
                  readOnly
                  className="bg-muted"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password (min 6 characters)"
                  required
                  minLength={6}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={signingUp}
              >
                {signingUp ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account & Access Webinar'
                )}
              </Button>
            </form>
          </>
        ) : verified ? (
          <>
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-chatone mb-2">Payment Confirmed!</h1>
            <p className="text-muted-foreground mb-6">
              {isWebinar 
                ? "You now have access to the webinar." 
                : "Your purchase has been confirmed. You now have access to your workbook(s)."
              }
            </p>
            
            <div className="space-y-3">
              {isWebinar && (
                <Button onClick={() => navigate('/webinar')} className="w-full">
                  Watch Webinar Now
                </Button>
              )}
              <Button 
                onClick={() => navigate('/')} 
                variant={isWebinar ? "outline" : "default"}
                className="w-full"
              >
                {isWebinar ? 'Continue to Workbooks' : 'Go to Workbooks'}
              </Button>
            </div>
          </>
        ) : error ? (
          <>
            <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-2xl font-chatone mb-2">Verification Error</h1>
            <p className="text-muted-foreground mb-6">
              {error}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Please contact support at support@blkbld.co with your order confirmation.
            </p>
            <Button onClick={() => navigate('/')} variant="outline" className="w-full">
              Return Home
            </Button>
          </>
        ) : (
          <>
            <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
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
