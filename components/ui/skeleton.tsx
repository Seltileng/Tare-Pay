import * as React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-muted/70 dark:bg-slate-800/60", className)}
      {...props}
    />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-border/80 bg-card p-5 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="h-7 w-36" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3 w-full">
      <div className="flex items-center justify-between gap-4 pb-2">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-9 w-32" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 py-2 border-b border-border/40">
          <Skeleton className="h-10 w-10 rounded-full shrink-0" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );
}
