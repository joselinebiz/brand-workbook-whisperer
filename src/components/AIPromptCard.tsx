import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface AIPromptCardProps {
  title: string;
  prompt: string;
  context?: string;
}

export const AIPromptCard = ({ title, prompt, context }: AIPromptCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      toast.success("Prompt copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy prompt");
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <h4 className="font-semibold text-lg">{title}</h4>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="hover:bg-accent/20"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </>
          )}
        </Button>
      </div>

      {context && (
        <p className="text-sm text-muted-foreground mb-3 italic">{context}</p>
      )}

      <div className="bg-background/50 rounded-lg p-4 border border-accent/20">
        <pre className="text-sm whitespace-pre-wrap font-mono text-foreground/90">
          {prompt}
        </pre>
      </div>
    </Card>
  );
};
