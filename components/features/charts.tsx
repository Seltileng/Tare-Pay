"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatNaira } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

// Data sets for Savings Growth Range Tabs
const SAVINGS_DATA_3M = [
  { month: "Sep", savings: 4350000, shares: 1000000 },
  { month: "Oct", savings: 4600000, shares: 1125000 },
  { month: "Nov", savings: 4850000, shares: 1125000 },
];

const SAVINGS_DATA_6M = [
  { month: "Jun", savings: 3600000, shares: 800000 },
  { month: "Jul", savings: 3900000, shares: 900000 },
  { month: "Aug", savings: 4100000, shares: 950000 },
  { month: "Sep", savings: 4350000, shares: 1000000 },
  { month: "Oct", savings: 4600000, shares: 1125000 },
  { month: "Nov", savings: 4850000, shares: 1125000 },
];

const SAVINGS_DATA_1Y = [
  { month: "Dec '25", savings: 2400000, shares: 600000 },
  { month: "Feb '26", savings: 2850000, shares: 700000 },
  { month: "Apr '26", savings: 3200000, shares: 750000 },
  { month: "Jun '26", savings: 3600000, shares: 800000 },
  { month: "Aug '26", savings: 4100000, shares: 950000 },
  { month: "Oct '26", savings: 4600000, shares: 1125000 },
  { month: "Nov '26", savings: 4850000, shares: 1125000 },
];

const CONTRIBUTIONS_FLOW_DATA = [
  { month: "Jul", contributions: 120000, withdrawals: 0 },
  { month: "Aug", contributions: 250000, withdrawals: 50000 },
  { month: "Sep", contributions: 250000, withdrawals: 350000 },
  { month: "Oct", contributions: 175000, withdrawals: 0 },
  { month: "Nov", contributions: 50000, withdrawals: 0 },
];

const LOAN_REPAYMENT_DATA = [
  { name: "Principal Repaid", value: 399375, color: "#059669" }, // Emerald
  { name: "Outstanding Principal", value: 1100625, color: "#0F172A" }, // Navy
  { name: "Remaining Interest", value: 97500, color: "#F59E0B" }, // Amber
];

const DELINQUENCY_DATA = [
  { range: "Current (On Track)", count: 428, amount: 142000000, color: "#10B981" },
  { range: "1 - 30 Days Late", count: 18, amount: 6450000, color: "#FBBF24" },
  { range: "31 - 60 Days Late", count: 7, amount: 2800000, color: "#F97316" },
  { range: "90+ Days Critical", count: 3, amount: 1250000, color: "#F43F5E" },
];

export function SavingsGrowthChart() {
  const [range, setRange] = React.useState<"3M" | "6M" | "1Y">("6M");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const data =
    range === "3M" ? SAVINGS_DATA_3M : range === "6M" ? SAVINGS_DATA_6M : SAVINGS_DATA_1Y;

  if (!mounted) {
    return (
      <Card className="p-6">
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="h-64 w-full" />
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <CardTitle className="text-base font-semibold">Wealth & Savings Accumulation</CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Combined trajectory of regular savings & cooperative equity
          </p>
        </div>

        {/* Range Tabs */}
        <div className="inline-flex rounded-xl bg-muted p-1 text-xs self-start sm:self-auto">
          {(["3M", "6M", "1Y"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setRange(tab)}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                range === tab
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
            <XAxis
              dataKey="month"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `₦${(v / 1000000).toFixed(1)}M`}
            />
            <Tooltip
              formatter={(value: number) => [formatNaira(value), "Savings"]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "0.75rem",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="savings"
              stroke="#059669"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#savingsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function CashflowBarChart() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="p-6">
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="h-64 w-full" />
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="mb-4">
        <CardTitle className="text-base font-semibold">Contributions vs. Withdrawals</CardTitle>
        <p className="text-xs text-muted-foreground mt-0.5">Monthly cash liquidity comparison</p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={CONTRIBUTIONS_FLOW_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
            <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value: number) => [formatNaira(value)]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "0.75rem",
                fontSize: "12px",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
              formatter={(value) => <span className="text-muted-foreground capitalize">{value}</span>}
            />
            <Bar dataKey="contributions" fill="#059669" radius={[4, 4, 0, 0]} name="Contributions" />
            <Bar dataKey="withdrawals" fill="#F43F5E" radius={[4, 4, 0, 0]} name="Withdrawals" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function LoanRepaymentDonut() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="p-6">
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="h-56 w-full" />
      </Card>
    );
  }

  return (
    <Card className="p-6 flex flex-col justify-between">
      <div>
        <CardTitle className="text-base font-semibold">Loan Amortization Breakdown</CardTitle>
        <p className="text-xs text-muted-foreground mt-0.5">Asset Finance Loan LN-2026-0442</p>
      </div>

      <div className="h-56 w-full flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={LOAN_REPAYMENT_DATA}
              innerRadius={58}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {LOAN_REPAYMENT_DATA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [formatNaira(value)]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "0.75rem",
                fontSize: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-xs text-muted-foreground">Paid Off</span>
          <span className="text-lg font-bold text-foreground">26.6%</span>
        </div>
      </div>

      <div className="space-y-1.5 pt-2 border-t border-border/60 text-xs">
        {LOAN_REPAYMENT_DATA.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <span className="font-semibold text-foreground tabular-nums">{formatNaira(item.value)}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function DelinquencyAgingChart() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Card className="p-6">
        <Skeleton className="h-6 w-48 mb-4" />
        <Skeleton className="h-64 w-full" />
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="mb-4">
        <CardTitle className="text-base font-semibold">Loan Portfolio Aging & Delinquency</CardTitle>
        <p className="text-xs text-muted-foreground mt-0.5">
          Risk classification across 456 active cooperative credit facilities
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={DELINQUENCY_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.15} />
            <XAxis type="number" tickFormatter={(v) => `₦${(v / 1000000).toFixed(0)}M`} fontSize={11} stroke="#888" />
            <YAxis dataKey="range" type="category" fontSize={11} width={130} stroke="#888" />
            <Tooltip
              formatter={(value: number) => [formatNaira(value), "Exposure Amount"]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "0.75rem",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="amount" radius={[0, 6, 6, 0]}>
              {DELINQUENCY_DATA.map((entry, index) => (
                <Cell key={`delinq-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
