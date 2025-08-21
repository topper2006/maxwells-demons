import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, TrendingDown, AlertCircle, ExternalLink } from "lucide-react";

interface Event {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  source: string;
  impact: "positive" | "negative" | "neutral";
  severity: "low" | "medium" | "high";
  scoreChange?: number;
  entities: string[];
}

interface EventsFeedProps {
  events: Event[];
  title?: string;
}

export const EventsFeed = ({ events, title = "Recent Events" }: EventsFeedProps) => {
  const getImpactIcon = (impact: string, severity: string) => {
    const iconClass = severity === "high" ? "h-5 w-5" : "h-4 w-4";
    
    switch (impact) {
      case "positive":
        return <TrendingUp className={`${iconClass} text-success`} />;
      case "negative":
        return <TrendingDown className={`${iconClass} text-destructive`} />;
      default:
        return <AlertCircle className={`${iconClass} text-muted-foreground`} />;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "positive": return "bg-success/10 text-success border-success/20";
      case "negative": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <Card className="p-6 border-0 shadow-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Real-time events affecting credit assessments
        </p>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {events.map((event) => (
          <div key={event.id} className="border-l-2 border-muted pl-4 pb-4 last:pb-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getImpactIcon(event.impact, event.severity)}
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{formatTimestamp(event.timestamp)}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className={getSeverityBadge(event.severity)}>
                  {event.severity}
                </Badge>
                {event.scoreChange && (
                  <Badge variant="outline" className={getImpactBadge(event.impact)}>
                    {event.scoreChange > 0 ? "+" : ""}{event.scoreChange}
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground text-sm leading-tight">
                {event.title}
              </h4>
              
              <p className="text-xs text-muted-foreground leading-relaxed">
                {event.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {event.entities.map((entity, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
                      {entity}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <span>{event.source}</span>
                  <ExternalLink className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button className="text-xs text-primary hover:text-primary-muted transition-colors">
          View all events →
        </button>
      </div>
    </Card>
  );
};