import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Zap, RotateCcw, Database, Mail, Clock, Send } from "lucide-react";

interface TestModeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TestModeModal = ({ open, onOpenChange }: TestModeModalProps) => {
  const [loading, setLoading] = useState(false);
  const [showData, setShowData] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [webinarAccess, setWebinarAccess] = useState<any[]>([]);
  const [emailSchedules, setEmailSchedules] = useState<any[]>([]);
  const [emailLogs, setEmailLogs] = useState<any[]>([]);
  const { toast } = useToast();

  const handleClearTestData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Not authenticated",
          description: "Please log in first",
          variant: "destructive",
        });
        return;
      }

      // Delete user's leads and purchases
      await supabase.from('leads').delete().eq('user_id', user.id);
      await supabase.from('purchases').delete().eq('user_id', user.id);

      toast({
        title: "Test data cleared",
        description: "Your test leads and purchases have been deleted",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateWebinarPurchase = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Not authenticated",
          description: "Please log in first",
          variant: "destructive",
        });
        return;
      }

      await supabase.from('webinar_access').upsert({
        user_id: user.id,
        stripe_session_id: 'test_session_' + Date.now(),
      });

      toast({
        title: "Webinar access granted",
        description: "You now have access to the webinar",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetWebinarAccess = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Not authenticated",
          description: "Please log in first",
          variant: "destructive",
        });
        return;
      }

      await supabase.from('webinar_access').delete().eq('user_id', user.id);

      toast({
        title: "Webinar access removed",
        description: "Your webinar access has been reset",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTriggerTestEmail = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Not authenticated",
          description: "Please log in first",
          variant: "destructive",
        });
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', user.id)
        .single();

      if (!profile?.email) {
        toast({
          title: "No email found",
          description: "Please ensure your profile has an email",
          variant: "destructive",
        });
        return;
      }

      // Trigger the schedule-webinar-emails function
      const { data, error } = await supabase.functions.invoke('schedule-webinar-emails', {
        body: {
          userId: user.id,
          email: profile.email,
          productType: 'workbook_0'
        }
      });

      if (error) throw error;

      toast({
        title: "Test emails scheduled!",
        description: `Scheduled ${data.scheduled_count} emails. Check "View Email Schedules" to see them.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewEmailSchedules = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Not authenticated",
          description: "Please log in first",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('email_schedules')
        .select('*')
        .eq('user_id', user.id)
        .order('scheduled_for', { ascending: true });

      if (error) throw error;

      setEmailSchedules(data || []);
      setShowData(true);
      
      toast({
        title: "Email schedules loaded",
        description: `Found ${data?.length || 0} scheduled emails`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewEmailLogs = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Not authenticated",
          description: "Please log in first",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('email_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('sent_at', { ascending: false });

      if (error) throw error;

      setEmailLogs(data || []);
      setShowData(true);
      
      toast({
        title: "Email logs loaded",
        description: `Found ${data?.length || 0} sent emails`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Not authenticated",
          description: "Please log in first",
          variant: "destructive",
        });
        return;
      }

      const [leadsRes, webinarRes] = await Promise.all([
        supabase.from('leads').select('*').eq('user_id', user.id),
        supabase.from('webinar_access').select('*').eq('user_id', user.id),
      ]);

      setLeads(leadsRes.data || []);
      setWebinarAccess(webinarRes.data || []);
      setShowData(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Quick Test Actions</DialogTitle>
          <DialogDescription>
            Development tools for testing the funnel
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="border-b pb-2 mb-2">
            <h3 className="text-sm font-semibold text-muted-foreground">Email Testing</h3>
          </div>
          
          <Button
            onClick={handleTriggerTestEmail}
            disabled={loading}
            variant="default"
            className="w-full justify-start"
          >
            <Mail className="mr-2 h-4 w-4" />
            Trigger webinar email sequence
          </Button>

          <Button
            onClick={handleViewEmailSchedules}
            disabled={loading}
            variant="secondary"
            className="w-full justify-start"
          >
            <Clock className="mr-2 h-4 w-4" />
            View email schedules
          </Button>

          <Button
            onClick={handleViewEmailLogs}
            disabled={loading}
            variant="secondary"
            className="w-full justify-start"
          >
            <Send className="mr-2 h-4 w-4" />
            View sent emails
          </Button>

          <div className="border-b pb-2 mb-2 mt-4">
            <h3 className="text-sm font-semibold text-muted-foreground">General Testing</h3>
          </div>

          <Button
            onClick={handleClearTestData}
            disabled={loading}
            variant="destructive"
            className="w-full justify-start"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear my test data
          </Button>

          <Button
            onClick={handleSimulateWebinarPurchase}
            disabled={loading}
            variant="default"
            className="w-full justify-start"
          >
            <Zap className="mr-2 h-4 w-4" />
            Simulate webinar purchase
          </Button>

          <Button
            onClick={handleResetWebinarAccess}
            disabled={loading}
            variant="outline"
            className="w-full justify-start"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset webinar access
          </Button>

          <Button
            onClick={handleViewData}
            disabled={loading}
            variant="secondary"
            className="w-full justify-start"
          >
            <Database className="mr-2 h-4 w-4" />
            View database tables
          </Button>
        </div>

        {showData && (
          <div className="mt-6 space-y-4">
            {emailSchedules.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Email Schedules ({emailSchedules.length})</h3>
                <pre className="bg-muted p-3 rounded text-xs overflow-auto max-h-64">
                  {JSON.stringify(emailSchedules, null, 2)}
                </pre>
              </div>
            )}

            {emailLogs.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Sent Emails ({emailLogs.length})</h3>
                <pre className="bg-muted p-3 rounded text-xs overflow-auto max-h-64">
                  {JSON.stringify(emailLogs, null, 2)}
                </pre>
              </div>
            )}

            {leads.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Leads ({leads.length})</h3>
                <pre className="bg-muted p-3 rounded text-xs overflow-auto max-h-64">
                  {JSON.stringify(leads, null, 2)}
                </pre>
              </div>
            )}

            {webinarAccess.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Webinar Access ({webinarAccess.length})</h3>
                <pre className="bg-muted p-3 rounded text-xs overflow-auto max-h-64">
                  {JSON.stringify(webinarAccess, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
