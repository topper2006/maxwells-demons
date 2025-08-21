import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, TrendingUp, Shield, DollarSign } from "lucide-react";

export const BeginnerGuide = () => {
  const guides = [
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "What is Investment?",
      description: "Putting your money into companies that can grow and give you profit over time.",
      tips: "Start small, learn as you go, and never invest money you can't afford to lose."
    },
    {
      icon: <Shield className="h-6 w-6 text-success" />,
      title: "Safety Score",
      description: "How likely a company is to protect your money. Higher score means safer investment.",
      tips: "Look for scores above 700 for safer investments. Scores below 600 might be risky."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-accent" />,
      title: "Company Growth",
      description: "How fast a company is growing. Green arrows mean good growth, red means decline.",
      tips: "Growing companies can make you more money, but they might also be riskier."
    },
    {
      icon: <DollarSign className="h-6 w-6 text-warning" />,
      title: "Return on Investment",
      description: "How much profit you can expect from your investment over time.",
      tips: "Higher returns often come with higher risks. Balance is key for new investors."
    }
  ];

  return (
    <Card className="border-0 shadow-card mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          New to Investing? Start Here!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {guides.map((guide, index) => (
            <div key={index} className="p-4 bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                {guide.icon}
                <h4 className="font-medium text-foreground">{guide.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {guide.description}
              </p>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                💡 Tip: {guide.tips}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};