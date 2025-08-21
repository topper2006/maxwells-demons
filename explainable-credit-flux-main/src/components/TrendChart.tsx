import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface TrendDataPoint {
  date: string;
  score: number;
  rating?: string;
  event?: string;
}

interface TrendChartProps {
  data: TrendDataPoint[];
  title: string;
  issuer: string;
  timeframe: "24h" | "7d" | "30d" | "90d";
}

export const TrendChart = ({ data, title, issuer, timeframe }: TrendChartProps) => {
  const currentScore = data[data.length - 1]?.score || 0;
  const previousScore = data[data.length - 2]?.score || 0;
  const change = currentScore - previousScore;
  const changePercent = previousScore !== 0 ? ((change / previousScore) * 100).toFixed(2) : "0.00";

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-success";
    if (change < 0) return "text-destructive";
    return "text-muted-foreground";
  };

  const getChangeBackground = (change: number) => {
    if (change > 0) return "bg-success/10";
    if (change < 0) return "bg-destructive/10";
    return "bg-muted/10";
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (timeframe === "24h") {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (timeframe === "7d") {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-medium text-foreground">{`Score: ${payload[0].value}`}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
          {data.rating && (
            <p className="text-xs text-primary">{`Rating: ${data.rating}`}</p>
          )}
          {data.event && (
            <p className="text-xs text-accent mt-1">{data.event}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 border-0 shadow-card">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{issuer}</p>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-2xl font-bold text-foreground">{currentScore}</span>
              <Badge variant="outline" className={`${getChangeBackground(change)} ${getChangeColor(change)} border-current/20`}>
                {change > 0 ? "+" : ""}{change} ({changePercent}%)
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{timeframe} change</p>
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          {["24h", "7d", "30d", "90d"].map((period) => (
            <Badge 
              key={period}
              variant={timeframe === period ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10 transition-colors"
            >
              {period}
            </Badge>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis 
              domain={['dataMin - 10', 'dataMax + 10']}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="score"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#scoreGradient)"
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        Real-time credit score trend analysis • Updates every 15 minutes
      </div>
    </Card>
  );
};