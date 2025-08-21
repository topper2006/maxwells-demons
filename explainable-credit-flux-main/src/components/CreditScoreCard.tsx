import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { EducationalTooltip } from "./EducationalTooltip";

interface CreditScoreCardProps {
  issuer: string;
  score: number;
  previousScore?: number;
  rating: string;
  trend: "up" | "down" | "stable";
  riskLevel: "low" | "medium" | "high";
  lastUpdated: string;
}

export const CreditScoreCard = ({ 
  issuer, 
  score, 
  previousScore, 
  rating, 
  trend, 
  riskLevel, 
  lastUpdated 
}: CreditScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-success";
    if (score >= 650) return "text-warning";
    return "text-destructive";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 750) return "bg-gradient-to-br from-success/10 to-success/5";
    if (score >= 650) return "bg-gradient-to-br from-warning/10 to-warning/5";
    return "bg-gradient-to-br from-destructive/10 to-destructive/5";
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "low": return "bg-success text-success-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "high": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const scoreChange = previousScore ? score - previousScore : 0;

  return (
    <Card className={`p-6 border-0 shadow-card hover:shadow-elevated transition-all duration-300 ${getScoreBackground(score)}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{issuer}</h3>
          <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>
        <Badge className={getRiskBadgeVariant(riskLevel)}>
          {riskLevel === 'low' ? '🛡️ SAFE' : riskLevel === 'medium' ? '⚠️ MODERATE' : '🔥 RISKY'}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <div className={`text-4xl font-bold ${getScoreColor(score)} mb-1`}>
              {score}/850
            </div>
            <EducationalTooltip 
              title="Safety Score"
              explanation="This shows how safe it is to invest in this company. 850 is the maximum (super safe), anything above 700 is generally good for new investors."
              className="text-sm text-muted-foreground"
            />
          </div>
          
          <div className="text-right">
            <div className="text-xl font-semibold text-primary mb-1">{rating}</div>
            <EducationalTooltip 
              title="Grade"
              explanation="Like school grades: AAA is A+, AA is A, BBB is B. Companies with grades below BBB might be too risky for beginners."
              className="text-sm text-muted-foreground"
            />
          </div>
        </div>

        {previousScore && (
          <div className="flex items-center space-x-2 pt-2 border-t border-border">
            <div className="flex items-center space-x-1">
              {trend === "up" && <TrendingUp className="h-4 w-4 text-success" />}
              {trend === "down" && <TrendingDown className="h-4 w-4 text-destructive" />}
              {trend === "stable" && <AlertTriangle className="h-4 w-4 text-muted-foreground" />}
              
              <span className={`text-sm font-medium ${
                scoreChange > 0 ? "text-success" : 
                scoreChange < 0 ? "text-destructive" : 
                "text-muted-foreground"
              }`}>
                {scoreChange > 0 ? "📈 +" : scoreChange < 0 ? "📉 " : "➡️ "}{Math.abs(scoreChange)} points
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {scoreChange > 0 ? "Getting safer!" : scoreChange < 0 ? "Getting riskier" : "Staying stable"}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};