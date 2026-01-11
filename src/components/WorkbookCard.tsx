import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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
  
  const hasAccess = checkAccess(productType || '');

  const handlePurchase = async () => {
    if (!productType) return;
    if (!user) {
      navigate('/auth');
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { productType },
      });

      if (error) throw error;

      if (data?.url) {
        // IMPORTANT: Use window.location.href, not window.open
        window.location.href = data.url;
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
    if (!user) {
      return (
        <Button variant="outline" className="w-full group/btn" onClick={() => navigate('/auth')}>
          Sign In to Purchase
          <Lock className="w-4 h-4" />
        </Button>
      );
    }

    if (hasAccess) {
      return (
        <Link to={path} className="w-full">
          <Button variant="outline" className="w-full group/btn">
            Continue to Workbook {number}
            <CheckCircle2 className="w-4 h-4 text-accent" />
          </Button>
        </Link>
      );
    }

    return (
      <Button 
        variant="outline" 
        className="w-full group/btn"
        onClick={handlePurchase}
        disabled={loading}
      >
        {loading ? 'Processing...' : `Continue to Workbook ${number} - $${(price || 0) / 100}`}
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </Button>
    );
  };

  return (
    <Card className="group relative overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-[var(--shadow-elegant)] bg-card">
      <div className="absolute top-0 left-0 w-2 h-full bg-primary transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
      
      <div className="p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-primary">{number}</span>
            {hasAccess && <CheckCircle2 className="w-6 h-6 text-accent" />}
            {!hasAccess && <Lock className="w-6 h-6 text-muted-foreground" />}
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-2xl font-bold text-foreground">${(price || 0) / 100}</span>
            <span className="text-sm text-muted-foreground px-3 py-1 bg-muted rounded-full">
              {timeRequired}
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-chatone mb-2 group-hover:text-primary transition-colors">
          {title}
        </h1>
        <p className="text-muted-foreground font-medium mb-4">{subtitle}</p>
        <p className="text-sm text-foreground/80 mb-6 leading-relaxed">{description}</p>

      {getButtonContent()}
    </div>
  </Card>
  );
};
