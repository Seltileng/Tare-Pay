import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success" | "accent";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, disabled, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

    const sizeStyles = {
      sm: "h-9 min-h-[36px] px-3 text-xs rounded-lg gap-1.5",
      md: "h-11 min-h-[44px] px-4 py-2 text-sm rounded-xl gap-2", // 44px minimum touch target for WCAG AA
      lg: "h-13 min-h-[48px] px-6 py-3 text-base rounded-xl gap-2.5",
      icon: "h-11 w-11 min-h-[44px] min-w-[44px] rounded-xl",
    };

    const variantStyles = {
      primary:
        "bg-primary-900 text-white hover:bg-primary-800 dark:bg-accent-600 dark:text-white dark:hover:bg-accent-500 shadow-sm",
      secondary:
        "bg-muted text-foreground hover:bg-muted/80 border border-border/60",
      outline:
        "border border-border bg-transparent hover:bg-muted text-foreground",
      ghost:
        "bg-transparent hover:bg-muted text-foreground",
      danger:
        "bg-danger text-white hover:bg-rose-600 shadow-sm",
      success:
        "bg-accent-600 text-white hover:bg-accent-500 shadow-sm",
      accent:
        "bg-accent-600 text-white hover:bg-accent-500 shadow-sm shadow-emerald-500/20",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
