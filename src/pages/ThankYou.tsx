import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Play, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const [purchasing, setPurchasing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleWebinarPurchase = async () => {
    setPurchasing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { 
          priceId: 'price_1QWhbzCiT5IFDGi5x9YbIiSk',
          productType: 'webinar'
        }
      });

      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error",
        description: "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-black/90 text-white">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 51px)`,
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-chatone mb-4">
              CHECK YOUR EMAIL!
            </h1>
            <p className="text-xl text-white/80 mb-2">
              Your FREE workbook is on its way
            </p>
            <p className="text-white/60">
              Look for an email from BLKBLD with instant access to "Find Your White Space"
            </p>
          </div>

          {/* Webinar Offer */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-gold/30 p-8 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-sm font-light text-gold uppercase tracking-wide">Special Offer</span>
            </div>
            
            <h2 className="text-3xl font-chatone mb-4">
              Want Help Implementing This?
            </h2>
            
            <p className="text-lg text-white/80 mb-6">
              Join the <strong className="text-white">"How to Actually Complete Workbook 0 Using AI"</strong> webinar and get:
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                </div>
                <span className="text-white/90">Live walkthrough of the entire workbook with AI-powered shortcuts</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                </div>
                <span className="text-white/90">Custom AI prompts to speed up your market research by 10x</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                </div>
                <span className="text-white/90">Q&A session to refine your specific market position</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                </div>
                <span className="text-white/90">Lifetime access to the recording + bonus templates</span>
              </li>
            </ul>

            {/* Video Placeholder */}
            <div className="bg-black/40 rounded-lg aspect-video flex items-center justify-center mb-6 border border-white/10">
              <div className="text-center">
                <Play className="w-16 h-16 text-white/50 mx-auto mb-3" />
                <p className="text-white/60">Webinar Preview Video</p>
                <p className="text-sm text-white/40">(Add your video embed here)</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white/5 rounded-lg border border-white/10">
              <div>
                <p className="text-2xl font-bold mb-1">
                  <span className="line-through text-white/40 text-lg mr-2">$97</span>
                  <span className="text-gold">$27</span>
                </p>
                <p className="text-sm text-white/60">Limited time offer</p>
              </div>
              <Button 
                variant="hero" 
                size="lg"
                onClick={handleWebinarPurchase}
                disabled={purchasing}
              >
                {purchasing ? "Loading..." : "Join Webinar - $27"}
              </Button>
            </div>
          </div>

          {/* CTA to Dashboard */}
          <div className="text-center">
            <p className="text-white/60 mb-4">Or skip the webinar and</p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/auth')}
              className="bg-transparent border-white/20 text-white hover:bg-white/10"
            >
              Create Free Account to Access Workbook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
