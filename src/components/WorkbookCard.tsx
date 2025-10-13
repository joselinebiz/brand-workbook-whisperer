import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Lock, Tag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WorkbookCardProps {
  number: string;
  title: string;
  subtitle: string;
  timeRequired: string;
  description: string;
  completed?: boolean;
  path: string;
  productType?: string;
  price?: number;
}

export const WorkbookCard = ({
  number,
  title,
  subtitle,
  timeRequired,
  description,
  completed = false,
  path,
  productType,
  price,
}: WorkbookCardProps) => {
  const { user, checkAccess } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showCouponDialog, setShowCouponDialog] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  
  const hasAccess = checkAccess(productType || '');
  
  console.log('[WorkbookCard] Rendering:', { 
    productType, 
    hasAccess, 
    user: user?.id, 
    title 
  });

  const handlePurchaseClick = () => {
    console.log('Purchase clicked, showing coupon dialog');
    if (!user) {
      navigate('/auth');
      return;
    }
    setShowCouponDialog(true);
    console.log('Coupon dialog state set to true');
  };

  const handlePurchase = async () => {
    console.log('Processing purchase with coupon:', couponCode);
    if (!productType) return;

    setLoading(true);
    setShowCouponDialog(false);
    
    try {
      const body: { productType: string; couponCode?: string } = { productType };
      if (couponCode.trim()) {
        body.couponCode = couponCode.trim();
      }

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body,
      });

      if (error) throw error;

      if (data?.url) {
        // IMPORTANT: Use window.location.href, not window.open
        window.location.href = data.url;
        setCouponCode("");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create checkout session",
        variant: "destructive",
      });
      setLoading(false); // Re-enable button on error
    }
    // Note: Don't set loading to false on success because we're navigating away
  };

  const getButtonContent = () => {
    console.log('[WorkbookCard] getButtonContent:', { user: !!user, hasAccess, productType });
    
    if (!user) {
      return (
        <Button variant="outline" className="w-full group/btn" onClick={() => navigate('/auth')}>
          {productType === 'workbook_0' ? 'Sign In to Start for Free' : 'Sign In to Purchase'}
          <Lock className="w-4 h-4" />
        </Button>
      );
    }

    if (hasAccess) {
      console.log('[WorkbookCard] Showing access button for:', productType);
      return (
        <Link to={path} className="w-full">
          <Button variant="outline" className="w-full group/btn">
            {productType === 'workbook_0' ? 'Start Workbook' : 'Access Workbook'}
            {productType === 'workbook_0' ? (
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-accent" />
            )}
          </Button>
        </Link>
      );
    }

    if (productType === 'workbook_0') {
      // User is signed in but hasn't "registered" for workbook 0 yet
      return (
        <Link to={path} className="w-full">
          <Button variant="outline" className="w-full group/btn">
            Start for Free
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      );
    }

    return (
      <Button 
        variant="outline" 
        className="w-full group/btn"
        onClick={handlePurchaseClick}
        disabled={loading}
      >
        {loading ? 'Processing...' : `Purchase - $${(price || 0) / 100}`}
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </Button>
    );
  };

  return (
    <>
      <Dialog open={showCouponDialog} onOpenChange={setShowCouponDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
            <DialogDescription>
              Enter a coupon code if you have one, or proceed without one.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="coupon">Coupon Code (Optional)</Label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="coupon"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCouponDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handlePurchase} disabled={loading}>
              {loading ? 'Processing...' : 'Continue to Checkout'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="group relative overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-[var(--shadow-elegant)] bg-card">
      <div className="absolute top-0 left-0 w-2 h-full bg-primary transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
      
      <div className="p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-primary">{number}</span>
            {hasAccess && productType !== 'workbook_0' && <CheckCircle2 className="w-6 h-6 text-accent" />}
            {!hasAccess && productType !== 'workbook_0' && <Lock className="w-6 h-6 text-muted-foreground" />}
          </div>
          <span className="text-sm text-muted-foreground px-3 py-1 bg-muted rounded-full">
            {timeRequired}
          </span>
        </div>

        <h1 className="text-2xl font-chatone mb-2 group-hover:text-primary transition-colors">
          {title}
        </h1>
        <p className="text-muted-foreground font-medium mb-4">{subtitle}</p>
        <p className="text-sm text-foreground/80 mb-6 leading-relaxed">{description}</p>

        {getButtonContent()}
      </div>
    </Card>
    </>
  );
};
