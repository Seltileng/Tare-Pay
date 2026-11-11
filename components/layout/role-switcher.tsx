"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { UserRole } from "@/types";
import { Shield, ChevronDown, Check, UserCheck, ShieldAlert, Key } from "lucide-react";
import { cn } from "@/lib/utils";

const ROLES: { role: UserRole; desc: string; icon: React.ReactNode }[] = [
  { role: "Member", desc: "Regular cooperative member", icon: <UserCheck className="w-4 h-4 text-emerald-500" /> },
  { role: "Guarantor", desc: "Can review & sign loan guarantees", icon: <Shield className="w-4 h-4 text-sky-500" /> },
  { role: "Treasurer", desc: "Disbursements & batch approvals", icon: <Key className="w-4 h-4 text-amber-500" /> },
  { role: "President", desc: "Executive policy & resolutions", icon: <ShieldAlert className="w-4 h-4 text-purple-500" /> },
  { role: "Admin", desc: "Full administrative portal access", icon: <ShieldAlert className="w-4 h-4 text-rose-500" /> },
];

export function RoleSwitcher() {
  const { currentRole, setRole } = useAuthStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectRole = (role: UserRole) => {
    setRole(role);
    setIsOpen(false);
    if (role === "Admin" || role === "Treasurer" || role === "President") {
      router.push("/admin/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-border/80 bg-muted/40 hover:bg-muted text-xs font-semibold text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="hidden sm:inline text-muted-foreground">Role:</span>
        <span className="text-foreground">{currentRole}</span>
        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-11 z-50 w-64 rounded-2xl border border-border/80 bg-card p-2 shadow-modal card-highlight">
          <div className="px-3 py-2 border-b border-border/60">
            <p className="text-xs font-bold text-foreground">Demonstration Role Switcher</p>
            <p className="text-[11px] text-muted-foreground">Switch personas to test role-based UI</p>
          </div>

          <div className="py-1 space-y-0.5">
            {ROLES.map(({ role, desc, icon }) => (
              <button
                key={role}
                onClick={() => handleSelectRole(role)}
                className={cn(
                  "w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors",
                  currentRole === role ? "bg-accent/10 font-bold text-accent" : "hover:bg-muted text-foreground"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1 rounded bg-card border border-border/60">{icon}</div>
                  <div>
                    <div className="font-semibold text-foreground">{role}</div>
                    <div className="text-[10px] text-muted-foreground font-normal">{desc}</div>
                  </div>
                </div>
                {currentRole === role && <Check className="w-4 h-4 text-accent" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
