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
            <h1 className="text-3xl font-chatone mb-2">ONE-PAGE BRAND GUIDE</h1>
            <p className="text-sm text-muted-foreground">Your quick reference for consistent brand presence</p>
          </div>

          {/* FOUNDATION */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">Foundation</h2>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Purpose</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent text-sm space-y-1">
                  <p><strong>Mission:</strong> {data?.mission || "_____"}</p>
                  <p><strong>Vision:</strong> {data?.vision5Year || "_____"}</p>
                  <p><strong>BHAG:</strong> {data?.bhag10Year || "_____"}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Promise & Audience</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent text-sm space-y-1">
                  <p><strong>Promise:</strong> {data?.brandPromise || "_____"}</p>
                  <p><strong>Serve:</strong> {data?.targetAudience?.demographics || "_____"}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Values</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                  {data?.coreValues && data.coreValues.length > 0 ? (
                    <div className="text-xs space-y-1">
                      {data.coreValues.map((v: any, i: number) => (
                        <p key={i}>{v.value} → {v.showsUpAs}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs">3-5 core values _____</p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Pillars</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                  {data?.brandPillars && data.brandPillars.length > 0 ? (
                    <div className="text-xs space-y-1">
                      {data.brandPillars.map((p: any, i: number) => (
                        <p key={i}>{p.pillar}: {p.showsUp}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs">3-5 brand pillars _____</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL & VERBAL */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">Visual & Verbal Identity</h2>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Colors</p>
                <div className="flex gap-2 items-center p-3 bg-muted/30 rounded border-l-4 border-accent">
                  <div className="flex items-center gap-1">
                    <div 
                      className="w-10 h-10 rounded border-2 border-border"
                      style={{ backgroundColor: data?.primaryColor || '#000000' }}
                    />
                    <span className="text-xs font-mono">{data?.primaryColor || "#___"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div 
                      className="w-10 h-10 rounded border-2 border-border"
                      style={{ backgroundColor: data?.secondaryColor || '#666666' }}
                    />
                    <span className="text-xs font-mono">{data?.secondaryColor || "#___"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div 
                      className="w-10 h-10 rounded border-2 border-border"
                      style={{ backgroundColor: data?.accentColor || '#CCCCCC' }}
                    />
                    <span className="text-xs font-mono">{data?.accentColor || "#___"}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Fonts & Photography</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent text-xs space-y-1">
                  <p><strong>Fonts:</strong> {data?.primaryFont || "_____"}, {data?.secondaryFont || "_____"}</p>
                  <p><strong>Style:</strong> {data?.photographyStyle || "_____"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* MESSAGING */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">Messaging</h2>
            
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Brand Voice</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent text-xs space-y-1">
                  <p><strong>We Are:</strong> {data?.brandVoiceAre || "_____"}</p>
                  <p><strong>We Are Not:</strong> {data?.brandVoiceNot || "_____"}</p>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Tagline & One-liner</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent text-xs space-y-1">
                  <p><strong>Tagline:</strong> "{data?.tagline || "_____"}"</p>
                  <p><strong>One-liner:</strong> "{data?.oneLiner || "_____"}"</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Brand Story</p>
              <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
                <p className="text-xs">{data?.brandStory || "[150-250 words] _____"}</p>
              </div>
            </div>
          </div>

          {/* POSITIONING */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">Positioning</h2>
            
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Positioning Statement</p>
            <div className="p-3 bg-muted/30 rounded border-l-4 border-accent mb-3">
              <p className="text-xs">{data?.positioningStatement || "_____"}</p>
            </div>

            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Customer Journey</p>
            <div className="p-3 bg-muted/30 rounded border-l-4 border-accent">
              {data?.journeyStages && data.journeyStages.length > 0 ? (
                <div className="text-xs space-y-1">
                  {data.journeyStages.map((stage: any, i: number) => (
                    <p key={i}><strong>{stage.stage}:</strong> {stage.action}</p>
                  ))}
                </div>
              ) : (
                <div className="text-xs space-y-1">
                  <p><strong>Awareness:</strong> Clear value</p>
                  <p><strong>Consideration:</strong> Social proof</p>
                  <p><strong>Purchase:</strong> Easy process</p>
                  <p><strong>Delivery:</strong> Exceed promise</p>
                  <p><strong>Post-Purchase:</strong> Stay connected</p>
                </div>
              )}
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
