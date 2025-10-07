import { Card } from "@/components/ui/card";
import { FileText, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BrandGuideProps {
  data: any; // Accept all data from WorkbookContext
}

export const BrandGuide = ({ data }: BrandGuideProps) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a clean version for download
    const guideContent = document.getElementById('brand-guide-content');
    if (guideContent) {
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>My Brand Guide</title>
              <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
                h1 { color: #333; border-bottom: 3px solid #000; padding-bottom: 10px; }
                h2 { color: #555; margin-top: 30px; font-size: 18px; }
                .section { margin-bottom: 20px; }
                .label { font-weight: bold; color: #666; font-size: 12px; }
                .value { margin-top: 5px; font-size: 14px; line-height: 1.6; }
                .color-box { display: inline-block; width: 40px; height: 40px; border: 1px solid #ccc; margin-left: 10px; vertical-align: middle; }
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
          #brand-guide-print, #brand-guide-print * {
            visibility: visible;
          }
          #brand-guide-print {
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

      <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary" id="brand-guide-print">
        <div className="flex items-center justify-between mb-6 no-print">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-2xl font-bold">Your One-Page Brand Guide</h2>
              <p className="text-sm text-muted-foreground">Your quick reference for consistent branding</p>
            </div>
          </div>
        </div>

        <div id="brand-guide-content">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b-2 border-primary">
            <h1 className="text-3xl font-bold mb-2">ONE-PAGE BRAND GUIDE</h1>
            <p className="text-sm text-muted-foreground">Your quick reference for consistent brand presence</p>
          </div>

          {/* FOUNDATION */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">Foundation</h2>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Purpose</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent text-sm">
                  <p><strong>Mission:</strong> {data.mission || "_____"}</p>
                  <p><strong>Vision:</strong> {data.vision5Year || "_____"}</p>
                  <p><strong>BHAG:</strong> {data.bhag10Year || "_____"}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Values</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                  <p className="text-sm">3-5 core values _____</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Who We Serve</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                  <p className="text-sm">
                    {data.targetAudience?.demographics || "_____"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Promise</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                  <p className="text-sm">{data.brandPromise || "_____"}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Pillars</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                  <p className="text-sm">3-5 content pillars _____</p>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">Visual</h2>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Colors</p>
                <div className="flex gap-3 items-center p-3 bg-muted/30 rounded border-l-4 border-accent">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-12 h-12 rounded border-2 border-border"
                      style={{ backgroundColor: data.primaryColor || '#000000' }}
                    />
                    <span className="text-xs font-mono">{data.primaryColor || "#_____"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-12 h-12 rounded border-2 border-border"
                      style={{ backgroundColor: data.secondaryColor || '#666666' }}
                    />
                    <span className="text-xs font-mono">{data.secondaryColor || "#_____"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-12 h-12 rounded border-2 border-border"
                      style={{ backgroundColor: data.tertiaryColor || '#CCCCCC' }}
                    />
                    <span className="text-xs font-mono">{data.tertiaryColor || "#_____"}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Fonts</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                  <p className="text-sm">
                    {data.primaryFont || "_____"}, {data.secondaryFont || "_____"}, {data.accentFont || "_____"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Photography Style</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                  <p className="text-sm">{data.photographyStyle || "_____"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* VERBAL */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">Verbal</h2>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Brand Voice</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                    <p className="text-xs font-semibold mb-1">We Are:</p>
                    <p className="text-sm">{data.brandVoiceAre || "_____"}</p>
                  </div>
                  <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                    <p className="text-xs font-semibold mb-1">We Are Not:</p>
                    <p className="text-sm">{data.brandVoiceNot || "_____"}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Tagline</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                  <p className="text-sm">"{data.tagline || "_____"}"</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">One-liner</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                  <p className="text-sm">"{data.oneLiner || "_____"}"</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Brand Story</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                  <p className="text-sm">{data.brandStory || "[150-250 words] _____"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* POSITIONING & EXPERIENCE */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">Positioning & Experience</h2>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Brand Position</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                  <p className="text-sm">{data.positioningStatement || "_____"}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Journey Map</p>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="font-semibold">Awareness:</span>
                    <span>Clear value _____</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="font-semibold">Consideration:</span>
                    <span>Social proof _____</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="font-semibold">Purchase/Hire:</span>
                    <span>Easy process _____</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="font-semibold">Delivery:</span>
                    <span>Exceed promise _____</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="font-semibold">Post-Purchase:</span>
                    <span>Stay connected _____</span>
                  </div>
                </div>
              </div>
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
            Print Guide
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
          Keep this guide handy for all marketing decisions, content creation, and brand touchpoints.
        </p>
      </Card>
    </>
  );
};
