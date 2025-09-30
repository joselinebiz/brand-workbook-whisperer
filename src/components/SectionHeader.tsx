import { ReactNode } from "react";

interface SectionHeaderProps {
  number?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
}

export const SectionHeader = ({ number, title, description, icon }: SectionHeaderProps) => {
  return (
    <div className="mb-6 pb-4 border-b-2 border-primary/20">
      <div className="flex items-start gap-4">
        {number && (
          <span className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shrink-0">
            {number}
          </span>
        )}
        {icon && <div className="text-primary shrink-0">{icon}</div>}
        <div>
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          {description && (
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};
