import { Card } from "@/components/ui/card";
import { FileText, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarketingStrategyProps {
  data: any;
}

export const MarketingStrategy = ({ data }: MarketingStrategyProps) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const guideContent = document.getElementById('marketing-strategy-content');
    if (guideContent) {
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>My Marketing Strategy</title>
              <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
                h1 { color: #333; border-bottom: 3px solid #000; padding-bottom: 10px; }
                h2 { color: #555; margin-top: 30px; font-size: 18px; }
                .section { margin-bottom: 20px; }
                .label { font-weight: bold; color: #666; font-size: 12px; }
                .value { margin-top: 5px; font-size: 14px; line-height: 1.6; }
              </style>
            </head>
            <body>
              ${guideContent.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #marketing-strategy-print, #marketing-strategy-print * {
            visibility: visible;
          }
          #marketing-strategy-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary" id="marketing-strategy-print">
        <div className="flex items-center justify-between mb-6 no-print">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-2xl font-bold">Your Marketing Strategy</h2>
              <p className="text-sm text-muted-foreground">Your comprehensive marketing execution plan</p>
            </div>
          </div>
        </div>

        <div id="marketing-strategy-content">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b-2 border-primary">
            <h1 className="text-3xl font-chatone mb-2">MARKETING STRATEGY</h1>
            <p className="text-sm text-muted-foreground">Your go-to-market execution framework</p>
          </div>

          {/* BUSINESS MODEL CANVAS */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">Business Model</h2>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Value Proposition</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                  <p className="text-sm">{data?.valueProposition || "_____"}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Customer Segments</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                  <p className="text-sm">{data?.customerSegments || "_____"}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Revenue Streams</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                  <p className="text-sm">{data?.revenueStreams || "_____"}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Key Activities</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                  <p className="text-sm">{data?.keyActivities || "_____"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* STRATEGIC CONTEXT (5Cs) */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">Market Intelligence (5Cs)</h2>
            
            <div className="p-3 bg-muted/30 rounded border-l-4 border-accent space-y-2">
              <p className="text-sm"><strong>Company:</strong> {data?.companyStrengths || "_____"}</p>
              <p className="text-sm"><strong>Category:</strong> {data?.categoryOpportunity || "_____"}</p>
              <p className="text-sm"><strong>Customer:</strong> {data?.customerInsights || "_____"}</p>
              <p className="text-sm"><strong>Competition:</strong> {data?.competitionGap || "_____"}</p>
              <p className="text-sm"><strong>Context:</strong> {data?.contextTrend || "_____"}</p>
            </div>
          </div>

          {/* PRODUCT & PRICING STRATEGY */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">Product & Pricing</h2>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Value Ladder</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent space-y-1">
                  <p className="text-sm"><strong>Free:</strong> {data?.valueLadder?.free || "_____"}</p>
                  <p className="text-sm"><strong>Core:</strong> {data?.valueLadder?.core || "_____"}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Pricing Model</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                  <p className="text-sm">{data?.pricingModel || "_____"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* COST & PRICING DETAILS */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">Cost Structure & Tiers</h2>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Economics</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent space-y-1 text-xs">
                  <p><strong>Fixed:</strong> {data?.fixedCosts || "_____"}</p>
                  <p><strong>Variable:</strong> {data?.variableCost || "_____"}</p>
                  <p><strong>Price:</strong> {data?.yourPrice || "_____"}</p>
                  <p><strong>Break-Even:</strong> {data?.breakEven || "_____"}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Pricing Tiers</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                  <p className="text-sm">{data?.pricingTiers || "_____"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* DISTRIBUTION & PROMOTION */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">Distribution & Promotion</h2>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Distribution Channels</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent space-y-1 text-sm">
                  <p><strong>Primary:</strong> {data?.primaryChannel || "_____"}</p>
                  <p><strong>Secondary:</strong> {data?.secondaryChannel || "_____"}</p>
                  <p><strong>Cut:</strong> {data?.channelToCut || "_____"}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Content Strategy</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent space-y-1 text-sm">
                  <p><strong>Platform:</strong> {data?.primaryPlatform || "_____"}</p>
                  <p><strong>Pillars:</strong> {data?.contentPillars || "_____"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT MIX */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Content Mix</p>
            <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
              <p className="text-sm">{data?.contentMix || "_____"}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 pt-6 border-t no-print">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handlePrint}
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Strategy
          </Button>
          <Button 
            variant="default" 
            className="flex-1"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4 no-print">
          Use this strategy as your marketing playbook for consistent execution and growth.
        </p>
      </Card>
    </>
  );
};
