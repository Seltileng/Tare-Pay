"use client";

import * as React from "react";
import { Eye, EyeOff, Plus, ArrowUpRight, ShieldCheck, ArrowDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatNaira } from "@/lib/utils";
import { Balances, Member } from "@/types";

interface HeroBalanceCardProps {
  balances: Balances;
  member: Member;
  onDeposit?: () => void;
  onWithdraw?: () => void;
  onRequestLoan?: () => void;
}

export function HeroBalanceCard({
  balances,
  member,
  onDeposit,
  onWithdraw,
  onRequestLoan,
}: HeroBalanceCardProps) {
  const [showBalance, setShowBalance] = React.useState(true);
  const [displayValue, setDisplayValue] = React.useState(0);

  // Animated count-up
  React.useEffect(() => {
    let start = 0;
    const end = balances.totalSavings;
    const duration = 850;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(start + (end - start) * ease));

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [balances.totalSavings]);

  return (
    <div className="relative overflow-hidden rounded-2xl mesh-gradient-navy text-white p-6 sm:p-8 shadow-card border border-white/10 card-highlight">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      {/* Decorative ambient glowing sphere */}
      <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none animate-pulseGlow" />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        {/* Card Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300/90 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified Total Balance
            </span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={showBalance ? "Hide balance" : "Show balance"}
            >
              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {member.tier} Tier • {member.memberNo}
          </div>
        </div>

        {/* Main Balance Display */}
        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight tabular-nums">
            {showBalance ? formatNaira(displayValue) : "₦ ••••••••••"}
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
            <span>
              Share Capital: <strong className="text-white font-semibold tabular-nums">{showBalance ? formatNaira(balances.shareCapital) : "•••••"}</strong>
            </span>
            <span>•</span>
            <span>
              Available Loan Limit: <strong className="text-emerald-300 font-semibold tabular-nums">{showBalance ? formatNaira(balances.availableLoanLimit) : "•••••"}</strong>
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            onClick={onDeposit}
            size="md"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-glow border-0"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Deposit Funds
          </Button>

          <Button
            onClick={onRequestLoan}
            size="md"
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md"
          >
            <ArrowUpRight className="w-4 h-4 mr-1.5" />
            Request Loan
          </Button>

          <Button
            onClick={onWithdraw}
            size="md"
            variant="ghost"
            className="text-slate-200 hover:text-white hover:bg-white/10"
          >
            <ArrowDownLeft className="w-4 h-4 mr-1.5" />
            Withdraw
          </Button>
        </div>
      </div>
    </div>
  );
}
