import { Card } from "@/components/ui/card";
import { FileText, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ICPSnapshotProps {
  data: any;
}

export const ICPSnapshot = ({ data }: ICPSnapshotProps) => {
  const getValue = (snapshotKey: string, ...fallbacks: (string | undefined)[]) => {
    if (data?.[snapshotKey]) return data[snapshotKey];
    const combined = fallbacks.filter(Boolean).join(' · ');
    return combined || "_____";
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const guideContent = document.getElementById('icp-snapshot-content');
    if (guideContent) {
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>My Ideal Client — Profile Snapshot</title>
              <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
                h1 { color: #333; border-bottom: 3px solid #005951; padding-bottom: 10px; text-align: center; }
                h2 { color: #555; margin-top: 24px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
                .field { margin-bottom: 14px; }
                .label { font-weight: bold; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
                .value { margin-top: 4px; font-size: 14px; line-height: 1.6; padding: 8px 12px; background: #f8f8f8; border-left: 3px solid #005951; }
                .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
                .subtitle { text-align: center; color: #888; font-size: 12px; margin-bottom: 30px; }
                .footer { text-align: center; color: #aaa; font-size: 10px; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px; }
              </style>
            </head>
            <body>
              ${guideContent.innerHTML}
              <div class="footer">Keep this snapshot near your workspace. Before every business decision, ask: "Would ${data?.clientName || 'my ideal client'} want this?"</div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const nameAge = getValue('snapshotName', ...[data?.clientName, data?.clientAge].filter(Boolean));
  const locationRole = getValue('snapshotLocation', ...[data?.clientLocation, data?.clientJobTitle].filter(Boolean));
  const income = getValue('snapshotIncome', data?.clientIncome);
  const personality = getValue('snapshotPersonality', data?.threeWords);
  const desire = getValue('snapshotDesire', data?.coreDesire);
  const painPoint = getValue('snapshotPainPoint', data?.keepsUpAtNight);
  const costOfProblem = getValue('snapshotCostOfProblem', ...[
    data?.costDollars ? `${data.costDollars}/mo` : '',
    data?.costHours ? `${data.costHours} hrs/wk` : ''
  ].filter(Boolean));
  const whereTheyHangOut = getValue('snapshotWhereTheyHangOut', ...[data?.socialMedia, data?.podcasts, data?.booksBlogs, data?.onlineCommunities, data?.inPersonEvents, data?.influencers, data?.appsDaily, data?.weekendActivities].filter(Boolean));
  const transformationPairs = [
    { label: 'Feels', before: data?.beforeFeels, after: data?.afterFeels },
    { label: 'Struggles', before: data?.beforeStruggles, after: data?.afterStruggles },
    { label: 'Believes', before: data?.beforeBelieves, after: data?.afterBelieves },
    { label: 'Day Looks Like', before: data?.beforeDayLooksLike, after: data?.afterDayLooksLike },
  ].filter(p => p.before || p.after);

  const transformation = data?.snapshotTransformation || (
    transformationPairs.length > 0
      ? transformationPairs.map(p => `${p.label}: ${p.before || '_____'} → ${p.after || '_____'}`).join('\n')
      : '_____'
  );

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #icp-snapshot-print, #icp-snapshot-print * { visibility: visible; }
          #icp-snapshot-print { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary" id="icp-snapshot-print">
        <div className="flex items-center justify-between mb-6 no-print">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-2xl font-bold">My Ideal Client — Profile Snapshot</h2>
              <p className="text-sm text-muted-foreground">Your one-page reference card for every business decision</p>
            </div>
          </div>
        </div>

        <div id="icp-snapshot-content">
          <div className="text-center mb-8 pb-6 border-b-2 border-primary">
            <h1 className="text-3xl font-chatone mb-2">IDEAL CLIENT SNAPSHOT</h1>
            <p className="text-sm text-muted-foreground">Your quick reference for every offer, conversation, and decision</p>
          </div>

          {/* WHO THEY ARE */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">Who They Are</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Name & Age</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent text-sm">{nameAge}</div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Location & Role</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent text-sm">{locationRole}</div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Income Range</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent text-sm">{income}</div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Personality (3 Words)</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent text-sm">{personality}</div>
              </div>
            </div>
          </div>

          {/* WHAT DRIVES THEM */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">What Drives Them</h2>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Core Desire (Life Force 8)</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent text-sm">{desire}</div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">#1 Problem (What's Broken)</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent text-sm">{data?.numberOneProblem || '_____'}</div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Top Pain Point (Their Words)</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent text-sm">{painPoint}</div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Cost of the Problem</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent text-sm">{costOfProblem}</div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Where They Hang Out</p>
                <div className="p-3 bg-muted/30 rounded border-l-4 border-accent text-sm">{whereTheyHangOut}</div>
              </div>
            </div>
          </div>

          {/* THE TRANSFORMATION */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">The Transformation</h2>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Before → After</p>
            <div className="p-3 bg-muted/30 rounded border-l-4 border-accent text-sm whitespace-pre-line">{transformation}</div>
          </div>

          {/* THE PROMISE */}
          {data?.brandPromise && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">The Promise</h2>
              <div className="p-3 bg-muted/30 rounded border-l-4 border-accent text-sm italic">
                {data.brandPromise}
              </div>
            </div>
          )}

          {/* DECISION FILTER */}
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-3 text-primary uppercase tracking-wide">Decision Filter</h2>
            <div className="p-4 bg-muted/30 rounded border-l-4 border-accent">
              <p className="text-sm italic">
                "Before every business decision, ask: Would <strong>{data?.clientName || '[Name]'}</strong> want this? Would <strong>{data?.clientName || '[Name]'}</strong> pay for this?"
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 pt-6 border-t no-print">
          <Button variant="outline" className="flex-1" onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Print Snapshot
          </Button>
          <Button variant="default" className="flex-1" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4 no-print">
          Generate your ICP photo using the AI prompt above, then add it to this snapshot — so you have your picture and profile in one place.
        </p>
      </Card>
    </>
  );
};
