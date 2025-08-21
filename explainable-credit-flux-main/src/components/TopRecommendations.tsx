import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, Shield, Award } from "lucide-react";

export const TopRecommendations = () => {
  const recommendations = [
    {
      rank: 1,
      company: "Microsoft Corp.",
      score: 812,
      rating: "AAA",
      expectedReturn: "9.2%",
      risk: "Low",
      reason: "Stable tech giant with consistent growth and strong cash flow",
      whyGood: "Perfect for beginners - very safe with steady returns"
    },
    {
      rank: 2,
      company: "Apple Inc.", 
      score: 785,
      rating: "AA+",
      expectedReturn: "8.5%",
      risk: "Low",
      reason: "Strong brand loyalty and diversified revenue streams",
      whyGood: "Reliable company that most people know and trust"
    },
    {
      rank: 3,
      company: "Johnson & Johnson",
      score: 798,
      rating: "AAA",
      expectedReturn: "7.8%",
      risk: "Very Low",
      reason: "Healthcare essentials with steady dividend payments",
      whyGood: "Super safe choice - people always need healthcare"
    },
    {
      rank: 4,
      company: "Coca-Cola Co.",
      score: 756,
      rating: "AA",
      expectedReturn: "6.9%",
      risk: "Low",
      reason: "Global brand with consistent dividend history",
      whyGood: "Conservative choice with regular income payments"
    },
    {
      rank: 5,
      company: "Visa Inc.",
      score: 789,
      rating: "AA+",
      expectedReturn: "8.8%",
      risk: "Low",
      reason: "Benefits from growing digital payment trends",
      whyGood: "Grows as more people use digital payments"
    }
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Award className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Award className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-orange-600" />;
    return <Star className="h-5 w-5 text-primary" />;
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Very Low": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Low": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="border-0 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          Top 5 Recommendations for Beginners
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Our AI picked the safest and most profitable companies for new investors
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div
              key={rec.rank}
              className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                rec.rank === 1 
                  ? "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200" 
                  : "bg-muted/30 border-border"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getRankIcon(rec.rank)}
                  <div>
                    <h4 className="font-semibold text-foreground">
                      #{rec.rank} {rec.company}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {rec.rating} Grade
                      </Badge>
                      <Badge variant="outline" className={getRiskColor(rec.risk)}>
                        <Shield className="h-3 w-3 mr-1" />
                        {rec.risk} Risk
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-success">{rec.expectedReturn}</div>
                  <div className="text-xs text-muted-foreground">Expected return</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Score: {rec.score}/850
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>Why it's good:</strong> {rec.whyGood}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Company strength:</strong> {rec.reason}
                </p>
              </div>
              
              {rec.rank === 1 && (
                <div className="mt-3 p-3 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-2 text-primary">
                    <Award className="h-4 w-4" />
                    <span className="text-sm font-medium">🏆 Best Choice for Beginners!</span>
                  </div>
                  <p className="text-xs text-primary/80 mt-1">
                    Highest safety score with excellent growth potential
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-accent/10 rounded-lg">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <h4 className="font-medium text-accent mb-1">💡 Smart Investing Tip</h4>
              <p className="text-sm text-accent/80">
                Don't put all your money in one company! Spread your investment across 2-3 of these 
                top companies to reduce risk. This is called "diversification" - it's like not putting 
                all your eggs in one basket.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};