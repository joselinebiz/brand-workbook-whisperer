import { Card } from "@/components/ui/card";

interface AIContextCalloutProps {
  showICPLine?: boolean;
}

export const AIContextCallout = ({ showICPLine = false }: AIContextCalloutProps) => {
  return (
    <Card className="p-6 mb-8 bg-gradient-to-br from-gold/10 to-gold/5 border-2 border-gold/30">
      <p className="font-semibold mb-3 text-lg">🤖 Get better AI results across every workbook</p>
      <p className="text-sm text-muted-foreground mb-3">
        Each workbook builds on the last. To get the best results from the AI prompts:
      </p>
      <div className="space-y-3 mb-3">
        <div className="pl-4 border-l-2 border-gold/40">
          <p className="text-sm"><strong>Option A:</strong> Stay in the same AI chat as you move through the workbooks — so the AI remembers everything you've already told it.</p>
        </div>
        <div className="pl-4 border-l-2 border-gold/40">
          <p className="text-sm"><strong>Option B:</strong> Download your completed workbook and paste it into a new AI chat before starting the next one — so the AI has your full context.</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Either way, the goal is the same: don't make your AI start from scratch. The more context it has about your business, your ideal client, and your strategy, the better every output gets.
      </p>
      {showICPLine && (
        <p className="text-sm text-muted-foreground mt-3 font-medium">
          If you completed the Ideal Client Workbook, your data has been pre-filled below. Review it, refine it, and keep building.
        </p>
      )}
    </Card>
  );
};
