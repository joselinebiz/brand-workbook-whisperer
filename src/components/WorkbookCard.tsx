import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

interface WorkbookCardProps {
  number: string;
  title: string;
  subtitle: string;
  timeRequired: string;
  description: string;
  completed?: boolean;
  path: string;
}

export const WorkbookCard = ({
  number,
  title,
  subtitle,
  timeRequired,
  description,
  completed = false,
  path,
}: WorkbookCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-[var(--shadow-elegant)] bg-card">
      <div className="absolute top-0 left-0 w-2 h-full bg-primary transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
      
      <div className="p-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold text-primary">{number}</span>
            {completed && <CheckCircle2 className="w-6 h-6 text-accent" />}
          </div>
          <span className="text-sm text-muted-foreground px-3 py-1 bg-muted rounded-full">
            {timeRequired}
          </span>
        </div>

        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground font-medium mb-4">{subtitle}</p>
        <p className="text-sm text-foreground/80 mb-6 leading-relaxed">{description}</p>

        <Link to={path}>
          <Button variant="outline" className="w-full group/btn">
            Start Workbook
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};
