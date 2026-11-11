import * as React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-4 sm:p-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between max-w-5xl w-full mx-auto py-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-primary-900 to-accent flex items-center justify-center text-white shadow-sm">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Tare<span className="text-accent">-pay</span>
          </span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Centered Form */}
      <div className="flex-1 flex items-center justify-center py-6 sm:py-10">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Footer / Trust Badges */}
      <div className="text-center py-4 border-t border-border/60 text-xs text-muted-foreground space-y-1">
        <p className="flex items-center justify-center gap-3">
          <span>🔒 NDPR Compliant Data Encryption</span>
          <span>•</span>
          <span>🏦 Regulated CBN Partner Banks</span>
        </p>
        <p>© 2026 Tare Cooperative Multi-Purpose Society Ltd. All rights reserved.</p>
      </div>
    </div>
  );
}
