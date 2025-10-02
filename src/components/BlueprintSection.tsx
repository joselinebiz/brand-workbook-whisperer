import { Card } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlueprintSectionProps {
  title: string;
  description: string;
  sections: {
    title: string;
    items: string[];
  }[];
  downloadText?: string;
  onDownload?: () => void;
}

export const BlueprintSection = ({ 
  title, 
  description, 
  sections,
  downloadText = "Download Blueprint",
  onDownload
}: BlueprintSectionProps) => {
  return (
    <Card className="p-8 mb-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="w-8 h-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="space-y-6 mt-6">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-lg font-bold mb-3 text-primary">{section.title}</h3>
            <ul className="space-y-2 ml-4">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start gap-2">
                  <span className="text-accent mt-1 shrink-0">✓</span>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex mt-8 pt-6 border-t">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onDownload}
        >
          <Download className="w-4 h-4 mr-2" />
          {downloadText}
        </Button>
      </div>
    </Card>
  );
};
