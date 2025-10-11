import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

interface WorkbookHeaderProps {
  number: string;
  title: string;
  subtitle: string;
}

export const WorkbookHeader = ({ number, title, subtitle }: WorkbookHeaderProps) => {
  return (
    <div className="border-b bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Overview
            </Button>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="icon">
              <Home className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        
        <div className="flex items-baseline gap-4">
          <span className="text-5xl font-bold text-primary">{number}</span>
          <div>
            <h1 className="text-3xl font-chatone mb-1">{title}</h1>
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
