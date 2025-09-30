import { Card } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface ExampleBoxProps {
  title: string;
  content: string;
  icon?: string;
}

export const ExampleBox = ({ title, content, icon = "💡" }: ExampleBoxProps) => {
  return (
    <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/30">
      <div className="flex items-start gap-3 mb-2">
        <span className="text-2xl shrink-0">{icon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-accent" />
            <p className="font-semibold text-sm text-accent">EXAMPLE</p>
          </div>
          <p className="font-bold text-sm mb-2">{title}</p>
          <p className="text-sm text-muted-foreground italic leading-relaxed">{content}</p>
        </div>
      </div>
    </Card>
  );
};
