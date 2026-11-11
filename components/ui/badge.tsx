import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "danger" | "info" | "neutral" | "emerald";
  size?: "sm" | "md";
}

export function Badge({ className, variant = "neutral", size = "md", children, ...props }: BadgeProps) {
  const variantStyles = {
    neutral: "bg-muted text-foreground/80 border-border/80",
    success: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    emerald: "bg-emerald-600 text-white border-transparent",
    warning: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    danger: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
    info: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px] font-medium",
    md: "px-2.5 py-1 text-xs font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border transition-colors tracking-wide",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
