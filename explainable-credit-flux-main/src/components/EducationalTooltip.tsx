import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EducationalTooltipProps {
  title: string;
  explanation: string;
  className?: string;
}

export const EducationalTooltip = ({ title, explanation, className = "" }: EducationalTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className={`inline-flex items-center gap-1 text-sm hover:text-primary transition-colors ${className}`}>
            <span>{title}</span>
            <HelpCircle className="h-3 w-3 text-muted-foreground hover:text-primary" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-80 p-4">
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">{title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{explanation}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};