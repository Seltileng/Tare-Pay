"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatNaira } from "@/lib/utils";
import { CheckCircle2, TrendingUp, HelpCircle } from "lucide-react";

interface FinancialHealthWidgetProps {
  savingsGoal: number;
  currentSavings: number;
  loanLimit: number;
  usedLoan: number;
}

export function FinancialHealthWidget({
  savingsGoal = 6000000,
  currentSavings = 4850000,
  loanLimit = 8500000,
  usedLoan = 1200000,
}: FinancialHealthWidgetProps) {
  const savingsPercent = Math.min(Math.round((currentSavings / savingsGoal) * 100), 100);
  const loanUtilizedPercent = Math.min(Math.round((usedLoan / loanLimit) * 100), 100);

  // SVG Circle calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (savingsPercent / 100) * circumference;

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          Financial Health & Credit
        </CardTitle>
        <span className="text-xs text-muted-foreground font-medium">Auto-evaluated</span>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Circular Progress & Savings Metric */}
        <div className="flex items-center gap-5">
          <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
              {/* Background circle */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="stroke-muted"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Animated Progress circle */}
              <circle
                cx="48"
                cy="48"
                r={radius}
                className="stroke-accent transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-xl font-bold tracking-tight text-foreground tabular-nums">
                {savingsPercent}%
              </span>
              <span className="text-[10px] text-muted-foreground uppercase font-medium">Goal</span>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-foreground">Annual Target Savings</h4>
            <p className="text-xs text-muted-foreground">
              {formatNaira(currentSavings)} saved toward {formatNaira(savingsGoal)} goal.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium pt-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>On track to reach in 3 months</span>
            </div>
          </div>
        </div>

        {/* Loan Utilization Bar */}
        <div className="space-y-2 pt-2 border-t border-border/60">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground flex items-center gap-1">
              Borrowing Capacity
              <HelpCircle className="w-3 h-3 text-muted-foreground/60" />
            </span>
            <span className="font-semibold text-foreground tabular-nums">
              {formatNaira(loanLimit - usedLoan)} free of {formatNaira(loanLimit)}
            </span>
          </div>

          <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${loanUtilizedPercent}%` }}
              role="progressbar"
              aria-valuenow={loanUtilizedPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>

          <div className="flex justify-between text-[11px] text-muted-foreground">
            <span>{loanUtilizedPercent}% utilized ({formatNaira(usedLoan)})</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">High eligibility rating</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
