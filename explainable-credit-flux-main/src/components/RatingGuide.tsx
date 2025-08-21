import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

export const RatingGuide = () => {
  const ratings = [
    {
      grade: "AAA",
      description: "The absolute best - like getting an A+",
      risk: "Extremely Safe",
      explanation: "These companies are super stable and almost never fail. Perfect for beginners.",
      color: "bg-emerald-100 text-emerald-800 border-emerald-300",
      icon: <CheckCircle className="h-4 w-4 text-emerald-600" />,
      scoreRange: "800-850",
      examples: ["Microsoft", "Johnson & Johnson"]
    },
    {
      grade: "AA+/AA/AA-",
      description: "Excellent companies - like getting an A",
      risk: "Very Safe",
      explanation: "Very reliable companies with strong track records. Great for new investors.",
      color: "bg-green-100 text-green-800 border-green-300",
      icon: <CheckCircle className="h-4 w-4 text-green-600" />,
      scoreRange: "750-799",
      examples: ["Apple", "Visa", "Coca-Cola"]
    },
    {
      grade: "A+/A/A-",
      description: "Good companies - like getting a B+",
      risk: "Safe",
      explanation: "Solid companies that are generally safe but might have some minor concerns.",
      color: "bg-blue-100 text-blue-800 border-blue-300",
      icon: <CheckCircle className="h-4 w-4 text-blue-600" />,
      scoreRange: "700-749",
      examples: ["Google", "Amazon"]
    },
    {
      grade: "BBB+/BBB/BBB-",
      description: "Decent companies - like getting a B",
      risk: "Moderate Risk",
      explanation: "These are okay but beginners should be more careful. Do your research first.",
      color: "bg-yellow-100 text-yellow-800 border-yellow-300",
      icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />,
      scoreRange: "650-699",
      examples: ["Ford", "General Electric"]
    },
    {
      grade: "BB+ and below",
      description: "Risky companies - like getting C or lower",
      risk: "High Risk",
      explanation: "These companies might be in trouble. Not recommended for beginners!",
      color: "bg-red-100 text-red-800 border-red-300",
      icon: <XCircle className="h-4 w-4 text-red-600" />,
      scoreRange: "Below 650",
      examples: ["Some startups", "Struggling companies"]
    }
  ];

  return (
    <Card className="border-0 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Company Rating Guide
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Understand what each rating means - like school report cards for companies
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ratings.map((rating, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {rating.icon}
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge className={rating.color}>
                        {rating.grade}
                      </Badge>
                      <span className="font-medium text-foreground">
                        {rating.description}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Score Range: {rating.scoreRange}
                    </div>
                  </div>
                </div>
                
                <Badge variant="outline" className={
                  rating.risk.includes("Safe") 
                    ? "bg-success/10 text-success border-success/20"
                    : rating.risk.includes("Moderate")
                    ? "bg-warning/10 text-warning border-warning/20" 
                    : "bg-destructive/10 text-destructive border-destructive/20"
                }>
                  {rating.risk}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">
                {rating.explanation}
              </p>
              
              <div className="text-xs text-muted-foreground">
                <strong>Examples:</strong> {rating.examples.join(", ")}
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick Reference */}
        <div className="mt-6 p-4 bg-primary/5 rounded-lg">
          <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Quick Guide for Beginners
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3 text-success" />
              <span><strong>Safe for beginners:</strong> AAA, AA+, AA, AA-, A+, A, A-</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-3 w-3 text-warning" />
              <span><strong>Be careful:</strong> BBB+, BBB, BBB- (research first)</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="h-3 w-3 text-destructive" />
              <span><strong>Avoid as beginner:</strong> BB+ and below (too risky)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};