"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Wallet,
  Coins,
  FileText,
  Vote,
  User,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  PlusCircle,
} from "lucide-react";
import { Modal } from "./modal";
import { useAuthStore } from "@/stores/useAuthStore";

interface CommandItem {
  title: string;
  category: "Navigation" | "Quick Actions" | "Admin";
  icon: React.ReactNode;
  action: () => void;
  keywords?: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const router = useRouter();
  const { currentRole, setRole } = useAuthStore();

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const commands: CommandItem[] = [
    {
      title: "Dashboard Overview",
      category: "Navigation",
      icon: <Wallet className="w-4 h-4 text-emerald-600" />,
      action: () => router.push("/dashboard"),
      keywords: "home summary balance",
    },
    {
      title: "Savings & Target Deposits",
      category: "Navigation",
      icon: <Coins className="w-4 h-4 text-sky-600" />,
      action: () => router.push("/savings"),
      keywords: "save invest direct debit",
    },
    {
      title: "Loans & Credit Facilities",
      category: "Navigation",
      icon: <FileText className="w-4 h-4 text-amber-600" />,
      action: () => router.push("/loans"),
      keywords: "borrow loan repayment guarantor",
    },
    {
      title: "Dividends & Statements",
      category: "Navigation",
      icon: <FileText className="w-4 h-4 text-violet-600" />,
      action: () => router.push("/dividends"),
      keywords: "dividend statement payout shares",
    },
    {
      title: "Meetings & Governance (AGM)",
      category: "Navigation",
      icon: <Vote className="w-4 h-4 text-emerald-600" />,
      action: () => router.push("/governance"),
      keywords: "agm vote resolutions proxy",
    },
    {
      title: "Member Profile & Bank Settings",
      category: "Navigation",
      icon: <User className="w-4 h-4 text-slate-600" />,
      action: () => router.push("/profile"),
      keywords: "profile nuban bvn kin pin security",
    },
    {
      title: "Support Centre & Help",
      category: "Navigation",
      icon: <HelpCircle className="w-4 h-4 text-rose-600" />,
      action: () => router.push("/support"),
      keywords: "faq ticket contact help chat",
    },
    {
      title: "Apply for a New Loan",
      category: "Quick Actions",
      icon: <PlusCircle className="w-4 h-4 text-accent" />,
      action: () => router.push("/loans?action=apply"),
      keywords: "borrow apply new credit",
    },
    {
      title: "Make Regular Contribution",
      category: "Quick Actions",
      icon: <PlusCircle className="w-4 h-4 text-accent" />,
      action: () => router.push("/savings?action=deposit"),
      keywords: "deposit contribute pay",
    },
    {
      title: "Admin Portal: Overview",
      category: "Admin",
      icon: <ShieldAlert className="w-4 h-4 text-amber-500" />,
      action: () => {
        setRole("Admin");
        router.push("/admin/dashboard");
      },
      keywords: "admin management metrics audit",
    },
    {
      title: "Admin Portal: Role & Permission Matrix",
      category: "Admin",
      icon: <ShieldAlert className="w-4 h-4 text-amber-500" />,
      action: () => {
        setRole("Admin");
        router.push("/admin/governance");
      },
      keywords: "permissions matrix access control",
    },
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase()) ||
      (cmd.keywords && cmd.keywords.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelect = (cmd: CommandItem) => {
    cmd.action();
    setIsOpen(false);
    setQuery("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      maxWidth="lg"
      className="p-4 sm:p-5"
    >
      <div className="relative mb-3">
        <Search className="w-5 h-5 absolute left-3 top-3 text-muted-foreground pointer-events-none" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a command or jump to page... (Esc to exit)"
          className="w-full pl-10 pr-4 py-2.5 bg-muted/50 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div className="max-h-80 overflow-y-auto space-y-1 py-1">
        {filteredCommands.length === 0 ? (
          <p className="text-center py-8 text-xs text-muted-foreground">
            No matching command or destination found.
          </p>
        ) : (
          filteredCommands.map((cmd, i) => (
            <button
              key={i}
              onClick={() => handleSelect(cmd)}
              className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-muted/70 transition-colors group focus:outline-none focus:bg-muted"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-card border border-border/80 group-hover:border-accent/40">
                  {cmd.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{cmd.title}</p>
                  <p className="text-[11px] text-muted-foreground">{cmd.category}</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))
        )}
      </div>

      <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Navigation shortcut: <kbd className="px-1.5 py-0.5 rounded bg-muted border font-mono">⌘K</kbd></span>
        <span>Active role: <strong className="text-foreground">{currentRole}</strong></span>
      </div>
    </Modal>
  );
}
