"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PiggyBank,
  HandCoins,
  Receipt,
  Vote,
  User,
  HelpCircle,
  Menu,
  X,
  Search,
  Lock,
  ShieldCheck,
  MoreHorizontal,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { RoleSwitcher } from "./role-switcher";
import { ThemeToggle } from "./theme-toggle";
import { NotificationPopover } from "@/components/features/notification-popover";
import { Avatar } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Savings", href: "/savings", icon: PiggyBank },
  { name: "Loans", href: "/loans", icon: HandCoins },
  { name: "Dividends", href: "/dividends", icon: Receipt },
  { name: "Governance", href: "/governance", icon: Vote },
  { name: "Profile & Bank", href: "/profile", icon: User },
  { name: "Support", href: "/support", icon: HelpCircle },
];

const MOBILE_BOTTOM_TABS = [
  { name: "Home", href: "/dashboard", icon: LayoutDashboard },
  { name: "Savings", href: "/savings", icon: PiggyBank },
  { name: "Loans", href: "/loans", icon: HandCoins },
  { name: "More", href: "#more", icon: MoreHorizontal, isAction: true },
];

export function MemberShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, lockApp, logout, triggerSessionWarning } = useAuthStore();
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Skip to main content for WCAG accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 z-40 bg-card border-r border-border/80 card-highlight">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-border/60">
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-900 to-accent flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-extrabold tracking-tight text-foreground">
                Tare<span className="text-accent">-pay</span>
              </span>
              <span className="block text-[10px] text-muted-foreground -mt-1 font-medium tracking-wide">
                COOPERATIVE FINTECH
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-[11px] font-semibold uppercase text-muted-foreground tracking-wider mb-2">
            Main Menu
          </p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                  isActive
                    ? "bg-accent/10 text-accent font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-accent" : "text-muted-foreground group-hover:text-foreground"
                  )}
                  strokeWidth={1.75}
                />
                <span>{item.name}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-4 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer with Demo Tools */}
        <div className="p-4 border-t border-border/60 space-y-3 bg-muted/20">
          <div className="p-3 rounded-xl bg-card border border-border/60 space-y-2 card-highlight">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-foreground">Demo Controls</span>
              <button
                onClick={triggerSessionWarning}
                className="text-[10px] text-amber-600 hover:underline font-medium"
                title="Test 60s Session Timeout modal"
              >
                Test Timeout
              </button>
            </div>
            <button
              onClick={lockApp}
              className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              Lock Screen Demo
            </button>
          </div>

          {/* User profile capsule */}
          <div className="flex items-center gap-3 pt-1">
            <Avatar name={user.fullName} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{user.fullName}</p>
              <p className="text-[10px] text-muted-foreground truncate">{user.memberNo}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Sticky Glassmorphism Header */}
        <header className="glass-header h-16 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="lg:hidden p-2 rounded-xl text-muted-foreground hover:bg-muted"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" strokeWidth={1.75} />
            </button>

            {/* Quick ⌘K command palette trigger */}
            <button
              onClick={() => {
                const event = new KeyboardEvent("keydown", { key: "k", metaKey: true });
                window.dispatchEvent(event);
              }}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-muted/40 hover:bg-muted text-xs text-muted-foreground transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search or jump to...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-card border font-mono text-[10px]">⌘K</kbd>
            </button>
          </div>

          {/* Header Right utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            <RoleSwitcher />
            <NotificationPopover />
            <ThemeToggle />
            <Link href="/profile" className="hidden sm:block">
              <Avatar name={user.fullName} size="sm" />
            </Link>
          </div>
        </header>

        {/* Main Content Area */}
        <main id="main-content" className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto pb-24 sm:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Drawer (More menu) */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-primary-950/60 backdrop-blur-sm"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-card h-full p-5 flex flex-col justify-between shadow-2xl z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border/60">
                <span className="font-bold text-foreground">Tare-pay Menu</span>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 rounded-lg text-muted-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 space-y-1">
                {NAV_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={cn(
                        "flex items-center justify-between p-2.5 rounded-xl text-sm font-medium",
                        isActive ? "bg-accent/10 text-accent font-semibold" : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-border/60 space-y-2">
              <button
                onClick={() => {
                  setMobileDrawerOpen(false);
                  lockApp();
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-muted text-xs font-semibold text-foreground"
              >
                <Lock className="w-4 h-4" />
                Lock Screen
              </button>
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs font-semibold text-danger hover:bg-danger/10"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Tab Bar (Home, Savings, Loans, More) */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-card/90 backdrop-blur-lg border-t border-border/80 flex items-center justify-around h-16 px-2">
        {MOBILE_BOTTOM_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;

          if (tab.isAction) {
            return (
              <button
                key={tab.name}
                onClick={() => setMobileDrawerOpen(true)}
                className="flex flex-col items-center justify-center flex-1 h-full text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="w-5 h-5" strokeWidth={1.75} />
                <span className="text-[10px] mt-1 font-medium">{tab.name}</span>
              </button>
            );
          }

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-colors",
                isActive ? "text-accent font-bold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.2 : 1.75} />
              <span className="text-[10px] mt-1 font-medium">{tab.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
