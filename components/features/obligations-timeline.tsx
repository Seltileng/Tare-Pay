"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatNaira, formatDate } from "@/lib/utils";
import { Calendar, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Obligation {
  id: string;
  title: string;
  category: "loan" | "contribution" | "agm";
  dueDate: string;
  amount?: number;
  status: "urgent" | "upcoming" | "scheduled";
  actionText: string;
  actionHref: string;
}

const MOCK_OBLIGATIONS: Obligation[] = [
  {
    id: "ob_01",
    title: "SME Loan Instalment #5 Due",
    category: "loan",
    dueDate: "2026-11-28",
    amount: 133125,
    status: "urgent",
    actionText: "Pay Now",
    actionHref: "/loans",
  },
  {
    id: "ob_02",
    title: "December Monthly Regular Contribution",
    category: "contribution",
    dueDate: "2026-12-01",
    amount: 50000,
    status: "upcoming",
    actionText: "Manage Debit",
    actionHref: "/savings",
  },
  {
    id: "ob_03",
    title: "35th Annual General Meeting (AGM)",
    category: "agm",
    dueDate: "2026-12-05",
    status: "scheduled",
    actionText: "View Agenda",
    actionHref: "/governance",
  },
];

export function ObligationsTimeline() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          Upcoming Obligations
        </CardTitle>
        <Badge variant="neutral" size="sm">
          {MOCK_OBLIGATIONS.length} Scheduled
        </Badge>
      </CardHeader>

      <CardContent>
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/80">
          {MOCK_OBLIGATIONS.map((ob) => {
            const isUrgent = ob.status === "urgent";
            return (
              <div key={ob.id} className="relative group">
                {/* Node dot */}
                <div
                  className={`absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full border-2 border-card ${
                    isUrgent ? "bg-amber-500 animate-pulse" : "bg-emerald-600"
                  }`}
                />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl border border-border/60 bg-muted/30 hover:bg-muted/60 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground">{ob.title}</span>
                      {isUrgent && (
                        <Badge variant="warning" size="sm" className="gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Due Soon
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>Due: {formatDate(ob.dueDate)}</span>
                      {ob.amount && (
                        <>
                          <span>•</span>
                          <span className="font-semibold text-foreground tabular-nums">
                            {formatNaira(ob.amount)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <Link
                    href={ob.actionHref}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent-700 dark:text-accent-400 hover:underline self-end sm:self-auto"
                  >
                    {ob.actionText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
