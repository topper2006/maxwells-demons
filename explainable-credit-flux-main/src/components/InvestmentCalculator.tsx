import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, DollarSign } from "lucide-react";

export const InvestmentCalculator = () => {
  const [investment, setInvestment] = useState<string>("1000");
  const [timeframe, setTimeframe] = useState<string>("1");
  const [selectedCompany, setSelectedCompany] = useState<string>("Apple Inc.");

  // Mock expected returns based on safety scores
  const companyReturns: { [key: string]: { annual: number; risk: string; safety: number } } = {
    "Apple Inc.": { annual: 8.5, risk: "Low", safety: 785 },
    "Microsoft Corp.": { annual: 9.2, risk: "Low", safety: 812 },
    "Tesla Inc.": { annual: 15.3, risk: "Medium", safety: 672 },
  };

  const calculateReturns = () => {
    const principal = parseFloat(investment) || 0;
    const years = parseFloat(timeframe) || 1;
    const annualReturn = companyReturns[selectedCompany]?.annual || 8;
    
    const finalAmount = principal * Math.pow(1 + annualReturn / 100, years);
    const profit = finalAmount - principal;
    
    return {
      principal,
      finalAmount: Math.round(finalAmount),
      profit: Math.round(profit),
      annualReturn
    };
  };

  const results = calculateReturns();

  return (
    <Card className="border-0 shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Investment Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          See how much money you could make with your investment
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="investment" className="text-sm font-medium">
              How much to invest?
            </Label>
            <div className="relative mt-1">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="investment"
                type="number"
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                className="pl-10"
                placeholder="1000"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="timeframe" className="text-sm font-medium">
              For how many years?
            </Label>
            <Input
              id="timeframe"
              type="number"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="mt-1"
              placeholder="1"
              min="1"
              max="30"
            />
          </div>
          
          <div>
            <Label htmlFor="company" className="text-sm font-medium">
              Which company?
            </Label>
            <select 
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            >
              {Object.keys(companyReturns).map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">${results.principal.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">You invest</div>
            </div>
            
            <div className="flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
            
            <div>
              <div className="text-2xl font-bold text-success">${results.finalAmount.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">You could have</div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-background/50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Potential Profit:</span>
              <span className="text-lg font-semibold text-success">
                +${results.profit.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Expected Annual Return:</span>
              <Badge className="bg-accent/20 text-accent">
                {results.annualReturn}% per year
              </Badge>
            </div>
          </div>
        </div>

        {/* Risk Warning */}
        <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <p className="text-sm text-warning-foreground">
            <strong>⚠️ Important:</strong> These are estimated returns based on historical data. 
            Real investments can go up or down. Never invest money you can't afford to lose!
          </p>
        </div>

        {/* Company Safety Info */}
        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div>
            <div className="font-medium text-foreground">{selectedCompany}</div>
            <div className="text-sm text-muted-foreground">
              Safety Score: {companyReturns[selectedCompany]?.safety}/850
            </div>
          </div>
          <Badge variant="outline" className={
            companyReturns[selectedCompany]?.risk === "Low" 
              ? "bg-success/10 text-success border-success/20" 
              : "bg-warning/10 text-warning border-warning/20"
          }>
            {companyReturns[selectedCompany]?.risk} Risk
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};