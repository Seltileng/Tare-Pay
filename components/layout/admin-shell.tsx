"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldAlert,
  Users,
  FileCheck2,
  Sliders,
  DollarSign,
  ArrowLeft,
  Search,
} from "lucide-react";
import { RoleSwitcher } from "./role-switcher";
import { ThemeToggle } from "./theme-toggle";
import { NotificationPopover } from "@/components/features/notification-popover";
import { Avatar } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";

const ADMIN_NAV = [
  { name: "Admin Overview", href: "/admin/dashboard", icon: ShieldAlert },
  { name: "Members & Bulk Import", href: "/admin/members", icon: Users },
  { name: "Loan Approvals & Terms", href: "/admin/loans", icon: FileCheck2 },
  { name: "Governance & Matrix", href: "/admin/governance", icon: Sliders },
  { name: "Finance & Schedules", href: "/admin/finance", icon: DollarSign },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Skip to content */}
      <a href="#admin-main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Admin Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 z-40 bg-card border-r border-border/80 card-highlight">
        <div className="h-16 flex items-center px-6 border-b border-border/60 justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white shadow-sm font-bold text-sm">
              TP
            </div>
            <div>
              <span className="font-extrabold text-foreground tracking-tight">Admin Console</span>
              <span className="block text-[10px] text-amber-600 font-semibold uppercase tracking-wider">
                STAFF / BOARD
              </span>
            </div>
          </Link>
        </div>

        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-[11px] font-bold uppercase text-muted-foreground tracking-wider mb-2">
            Administrative Modules
          </p>
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" strokeWidth={1.75} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-border/60">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-border text-xs font-semibold text-foreground hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Switch to Member Portal
          </Link>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <header className="glass-header h-16 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-mono text-xs font-semibold border border-amber-500/20">
              Admin Gateway Mode
            </span>
          </div>

          <div className="flex items-center gap-3">
            <RoleSwitcher />
            <NotificationPopover />
            <ThemeToggle />
            <Avatar name={user.fullName} size="sm" />
          </div>
        </header>

        <main id="admin-main-content" className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}
