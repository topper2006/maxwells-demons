import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { EducationalTooltip } from "./EducationalTooltip";

interface FeatureData {
  name: string;
  importance: number;
  impact: "positive" | "negative" | "neutral";
  value: string;
  description: string;
}

interface FeatureImportanceChartProps {
  features: FeatureData[];
  title?: string;
}

export const FeatureImportanceChart = ({ features, title = "What Affects This Company's Safety?" }: FeatureImportanceChartProps) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive": return "text-success";
      case "negative": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getImpactBackground = (impact: string) => {
    switch (impact) {
      case "positive": return "bg-success";
      case "negative": return "bg-destructive";
      default: return "bg-muted-foreground";
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "positive": return "bg-success/10 text-success border-success/20";
      case "negative": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getSimpleName = (name: string) => {
    const simpleNames: { [key: string]: string } = {
      "Debt-to-Equity Ratio": "Company Debt Level",
      "Revenue Growth": "Sales Growth", 
      "Cash Flow": "Money Coming In",
      "Market Sentiment": "What People Think",
      "Industry Outlook": "Industry Health"
    };
    return simpleNames[name] || name;
  };

  const getSimpleExplanation = (name: string) => {
    const explanations: { [key: string]: string } = {
      "Debt-to-Equity Ratio": "How much money the company owes compared to what it owns. Lower is better - means the company isn't borrowing too much.",
      "Revenue Growth": "How fast the company is making more money. Growing sales usually means a healthy business.",
      "Cash Flow": "The actual money flowing into the company. Positive cash flow means they're making money, not just promising to.",
      "Market Sentiment": "What investors and experts are saying about the company. Good news and positive opinions help the score.",
      "Industry Outlook": "How well the entire industry (like tech, healthcare) is doing. A struggling industry can hurt even good companies."
    };
    return explanations[name] || "This factor affects how safe this company is for investment.";
  };

  return (
    <Card className="p-6 border-0 shadow-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">
          These are the main reasons why this company got its safety score. Think of it like grades on different subjects.
        </p>
      </div>

      <div className="space-y-4">
        {features.map((feature, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <EducationalTooltip 
                  title={getSimpleName(feature.name)}
                  explanation={getSimpleExplanation(feature.name)}
                  className="font-medium"
                />
                <Badge variant="outline" className={getImpactBadge(feature.impact)}>
                  {feature.impact === 'positive' ? '✓ Good' : feature.impact === 'negative' ? '⚠ Concern' : '→ Neutral'}
                </Badge>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-foreground">{feature.importance}%</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <Progress 
                value={feature.importance} 
                className="h-2"
                style={{
                  background: `hsl(var(--muted))`,
                }}
              />
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">{feature.description}</span>
                <span className={`font-medium ${getImpactColor(feature.impact)}`}>
                  {feature.value}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <p className="text-xs text-muted-foreground">
          <strong>💡 Quick Tip:</strong> The percentages show how much each factor affects the company's safety score. 
          Higher percentages mean that factor has more impact on whether this is a good investment for you.
        </p>
      </div>
    </Card>
  );
};