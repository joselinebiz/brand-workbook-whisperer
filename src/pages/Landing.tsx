import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Zap, Target, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Insert lead into database
      const { error: insertError } = await supabase
        .from('leads')
        .insert([{ email }]);

      if (insertError) {
        if (insertError.code === '23505') {
          // Email already exists
          navigate('/thank-you');
          return;
        }
        throw insertError;
      }

      // Send to Resend via edge function
      await supabase.functions.invoke('add-lead', {
        body: { email }
      });

      navigate('/thank-you');
    } catch (error) {
      console.error('Error capturing lead:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full">
              <Zap className="w-4 h-4 text-gold" />
              <span className="text-sm font-sans font-light text-gold">Free 45-Minute Sprint</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-chatone mb-6 leading-tight">
            FIND YOUR WHITE SPACE
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-4">
            The 45 Minute Market Opportunity Sprint
          </p>

          <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
            Validate your market opportunity with one clear sentence that defines your unique position. The same framework used by Fortune 500 companies—now yours free.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-16">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                required
              />
              <Button 
                type="submit" 
                variant="hero" 
                size="lg"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Get Free Access"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <p className="text-xs text-white/50 mt-3">
              No credit card required. Instant access.
            </p>
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-xl font-bold mb-2">Find Your Edge</h3>
            <p className="text-white/70 text-sm">
              Discover the one thing that makes you irreplaceable in your market
            </p>
          </div>

          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-xl font-bold mb-2">Battle-Tested Framework</h3>
            <p className="text-white/70 text-sm">
              The same strategy framework taught in top MBA programs
            </p>
          </div>

          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-gold" />
            </div>
            <h3 className="text-xl font-bold mb-2">45 Minutes</h3>
            <p className="text-white/70 text-sm">
              Complete clarity on your market position in under an hour
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-chatone mb-6">What You'll Get</h2>
          <ul className="text-left space-y-4 text-white/80">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-gold" />
              </div>
              <span>A validated market opportunity statement that clarifies exactly where you win</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-gold" />
              </div>
              <span>Step-by-step exercises to identify your competitive advantages</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-gold" />
              </div>
              <span>Visual frameworks used by Fortune 500 strategists</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-gold" />
              </div>
              <span>Instant digital access—start in the next 2 minutes</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Landing;
