import { useEffect, useState } from "react";
import { Play, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Webinar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkWebinarAccess();
  }, [user]);

  const checkWebinarAccess = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      const { data } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_type', 'webinar')
        .gte('expires_at', new Date().toISOString())
        .single();

      setHasAccess(!!data);
    } catch (error) {
      setHasAccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-black to-black/90 text-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-gold" />
          </div>
          <h1 className="text-3xl font-chatone mb-4">Webinar Access Required</h1>
          <p className="text-white/70 mb-6">
            You need to purchase the webinar to access this content.
          </p>
          <Button variant="hero" onClick={() => navigate('/thank-you')}>
            Get Webinar Access
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-chatone mb-2 text-center">
            How to Actually Complete Workbook 0 Using AI
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Implementation walkthrough with AI-powered shortcuts
          </p>

          {/* Video Player */}
          <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-12 border">
            <div className="text-center">
              <Play className="w-24 h-24 text-white/50 mx-auto mb-4" />
              <p className="text-white/70 text-lg">Webinar Recording</p>
              <p className="text-white/40 text-sm">(Embed your video player here)</p>
            </div>
          </div>

          {/* Resources */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-3">AI Prompts & Templates</h3>
              <p className="text-muted-foreground mb-4">
                Download the custom AI prompts used in this webinar to 10x your research speed.
              </p>
              <Button variant="outline">Download Resources</Button>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-3">Next Steps</h3>
              <p className="text-muted-foreground mb-4">
                Ready to build your complete brand and marketing system?
              </p>
              <Button variant="default" onClick={() => navigate('/')}>
                View Full Workbook Bundle
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Webinar;
