import { CreditScoreCard } from "@/components/CreditScoreCard";
import { FeatureImportanceChart } from "@/components/FeatureImportanceChart";
import { EventsFeed } from "@/components/EventsFeed";
import { TrendChart } from "@/components/TrendChart";
import { BeginnerGuide } from "@/components/BeginnerGuide";
import { InvestmentCalculator } from "@/components/InvestmentCalculator";
import { TopRecommendations } from "@/components/TopRecommendations";
import { RatingGuide } from "@/components/RatingGuide";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Settings, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Index = () => {
  // Mock data for demonstration
  const creditScores = [
    {
      issuer: "Apple Inc.",
      score: 785,
      previousScore: 778,
      rating: "AA+",
      trend: "up" as const,
      riskLevel: "low" as const,
      lastUpdated: "2 minutes ago"
    },
    {
      issuer: "Tesla Inc.",
      score: 672,
      previousScore: 685,
      rating: "BBB",
      trend: "down" as const,
      riskLevel: "medium" as const,
      lastUpdated: "5 minutes ago"
    },
    {
      issuer: "Microsoft Corp.",
      score: 812,
      previousScore: 809,
      rating: "AAA",
      trend: "up" as const,
      riskLevel: "low" as const,
      lastUpdated: "1 minute ago"
    }
  ];

  const featureData = [
    {
      name: "Debt-to-Equity Ratio",
      importance: 25,
      impact: "negative" as const,
      value: "0.68",
      description: "Higher than industry average"
    },
    {
      name: "Revenue Growth",
      importance: 22,
      impact: "positive" as const,
      value: "+12.4%",
      description: "Strong quarterly performance"
    },
    {
      name: "Cash Flow",
      importance: 18,
      impact: "positive" as const,
      value: "$2.4B",
      description: "Consistent positive trend"
    },
    {
      name: "Market Sentiment",
      importance: 15,
      impact: "neutral" as const,
      value: "68/100",
      description: "Based on news & social data"
    },
    {
      name: "Industry Outlook",
      importance: 12,
      impact: "positive" as const,
      value: "Stable",
      description: "Tech sector resilience"
    }
  ];

  const eventsData = [
    {
      id: "1",
      timestamp: "2024-01-18T14:30:00Z",
      title: "Apple reports strong quarterly earnings",
      description: "Revenue beats expectations by 5.2%, driven by iPhone and services growth",
      source: "Reuters",
      impact: "positive" as const,
      severity: "medium" as const,
      scoreChange: 7,
      entities: ["Apple Inc.", "AAPL", "Consumer Electronics"]
    },
    {
      id: "2",
      timestamp: "2024-01-18T13:15:00Z",
      title: "Federal Reserve signals potential rate cuts",
      description: "Fed officials hint at more accommodative monetary policy in Q2",
      source: "Bloomberg",
      impact: "positive" as const,
      severity: "high" as const,
      entities: ["Fed", "Interest Rates", "Monetary Policy"]
    },
    {
      id: "3",
      timestamp: "2024-01-18T12:45:00Z",
      title: "Tesla faces production challenges in Shanghai",
      description: "Supply chain disruptions expected to impact Q1 delivery targets",
      source: "Financial Times",
      impact: "negative" as const,
      severity: "medium" as const,
      scoreChange: -13,
      entities: ["Tesla Inc.", "TSLA", "Manufacturing"]
    }
  ];

  const trendData = [
    { date: "2024-01-15", score: 772 },
    { date: "2024-01-16", score: 775, event: "Positive earnings surprise" },
    { date: "2024-01-17", score: 778 },
    { date: "2024-01-18", score: 785, rating: "AA+" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Smart Investment Guide
                </h1>
                <p className="text-sm text-muted-foreground">Your friendly guide to making smart investment decisions</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search companies..." 
                  className="pl-10 w-80 bg-background/50"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Beginner Guide */}
        <BeginnerGuide />
        
        {/* Investment Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <InvestmentCalculator />
          <TopRecommendations />
        </div>
        
        {/* Rating Guide */}
        <div className="mb-8">
          <RatingGuide />
        </div>
        
        {/* Status Overview */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Company Health Check</h2>
              <p className="text-sm text-muted-foreground">See how safe and profitable these companies are for your investment</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                System Online
              </Badge>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                Last Updated: 30s ago
              </Badge>
            </div>
          </div>

          {/* Credit Score Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {creditScores.map((score, index) => (
              <CreditScoreCard key={index} {...score} />
            ))}
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trend Chart - Spans 2 columns */}
          <div className="lg:col-span-2">
            <TrendChart 
              data={trendData}
              title="Credit Score Trend"
              issuer="Apple Inc."
              timeframe="7d"
            />
          </div>

          {/* Events Feed */}
          <div className="lg:col-span-1">
            <EventsFeed events={eventsData} />
          </div>

          {/* Feature Importance */}
          <div className="lg:col-span-1">
            <FeatureImportanceChart features={featureData} />
          </div>

          {/* Market Summary */}
          <div className="lg:col-span-2">
            <Card className="p-6 border-0 shadow-card">
              <h3 className="text-lg font-semibold text-foreground mb-4">Investment Market at a Glance</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-lg">
                  <div className="text-2xl font-bold text-success mb-1">127</div>
                  <div className="text-sm text-muted-foreground">Companies We Track</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-warning/10 to-warning/5 rounded-lg">
                  <div className="text-2xl font-bold text-warning mb-1">23</div>
                  <div className="text-sm text-muted-foreground">Recent Changes</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg">
                  <div className="text-2xl font-bold text-accent mb-1">1,247</div>
                  <div className="text-sm text-muted-foreground">News Updates Today</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">98.7%</div>
                  <div className="text-sm text-muted-foreground">System Working</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
