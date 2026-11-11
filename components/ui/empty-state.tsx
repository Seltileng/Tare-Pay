import * as React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  type?: "transactions" | "loans" | "documents" | "notifications" | "general";
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  className,
  type = "general",
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-border/80 rounded-2xl bg-muted/20",
        className
      )}
    >
      <div className="w-20 h-20 mb-4 text-muted-foreground/60 flex items-center justify-center">
        {type === "transactions" ? (
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
            <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 4" />
            <rect x="24" y="28" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2.5" />
            <line x1="24" y1="36" x2="56" y2="36" stroke="currentColor" strokeWidth="2" />
            <circle cx="34" cy="44" r="2" fill="currentColor" />
          </svg>
        ) : type === "loans" ? (
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
            <rect x="20" y="22" width="40" height="36" rx="6" stroke="currentColor" strokeWidth="2.5" />
            <path d="M40 32V48M34 38L40 32L46 38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="40" cy="40" r="26" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
          </svg>
        ) : type === "notifications" ? (
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
            <path d="M40 22C33.37 22 28 27.37 28 34V46L24 50V52H56V50L52 46V34C52 27.37 46.63 22 40 22Z" stroke="currentColor" strokeWidth="2.5" />
            <path d="M36 56C36 58.21 37.79 60 40 60C42.21 60 44 58.21 44 56" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="24" r="3" fill="#10B981" />
          </svg>
        ) : (
          <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
            <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M32 40H48M40 32V48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )}
      </div>

      <h3 className="text-base font-semibold text-foreground tracking-tight">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-sm mb-6">{description}</p>

      {actionLabel && onAction && (
        <Button onClick={onAction} size="sm" variant="outline">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
