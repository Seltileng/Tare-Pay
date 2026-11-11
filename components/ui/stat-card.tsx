"use client";

import * as React from "react";
import { Card } from "./card";
import { formatNaira, cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  label: string;
  amount: number;
  currency?: boolean;
  change?: number; // percentage
  trendLabel?: string;
  icon?: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function StatCard({
  label,
  amount,
  currency = true,
  change,
  trendLabel = "vs last month",
  icon,
  subtitle,
  className,
}: StatCardProps) {
  const [displayValue, setDisplayValue] = React.useState(0);

  // Animated count-up effect
  React.useEffect(() => {
    let start = 0;
    const end = amount;
    const duration = 800; // ms
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(start + (end - start) * ease));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [amount]);

  return (
    <Card className={cn("p-5 relative overflow-hidden transition-all hover:border-accent/40", className)}>
      <div className="flex items-center justify-between text-muted-foreground mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider">{label}</span>
        {icon && <div className="p-2 rounded-xl bg-muted/60 text-foreground">{icon}</div>}
      </div>

      <div className="space-y-1">
        <div className="text-2xl font-bold tracking-tight text-foreground tabular-nums">
          {currency ? formatNaira(displayValue) : displayValue.toLocaleString("en-NG")}
        </div>

        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}

        {typeof change !== "undefined" && (
          <div className="flex items-center gap-1.5 pt-1 text-xs font-medium">
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-semibold",
                change >= 0
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
              )}
            >
              {change >= 0 ? (
                <ArrowUpRight className="w-3 h-3 stroke-[2.2]" />
              ) : (
                <ArrowDownRight className="w-3 h-3 stroke-[2.2]" />
              )}
              {Math.abs(change)}%
            </span>
            <span className="text-muted-foreground">{trendLabel}</span>
          </div>
        )}
      </div>
    </Card>
  );
}
