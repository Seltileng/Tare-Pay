"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Clock, ShieldAlert } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

export function SessionTimeoutModal() {
  const {
    sessionTimeoutWarning,
    sessionSecondsLeft,
    resetSessionTimer,
    logout,
  } = useAuthStore();

  const [seconds, setSeconds] = React.useState(sessionSecondsLeft);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (sessionTimeoutWarning) {
      setSeconds(60);
      timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            logout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [sessionTimeoutWarning, logout]);

  if (!sessionTimeoutWarning) return null;

  return (
    <Modal
      isOpen={sessionTimeoutWarning}
      onClose={resetSessionTimer}
      title="Session Expiring Soon"
      description="For your financial security, inactive sessions are automatically locked."
    >
      <div className="space-y-6 pt-2 text-center">
        <div className="flex justify-center">
          <div className="relative p-4 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Clock className="w-10 h-10 animate-pulse" />
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-foreground">
            You will be securely signed out in:
          </p>
          <div className="text-4xl font-extrabold text-amber-600 dark:text-amber-400 font-mono tabular-nums">
            00:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button variant="outline" onClick={logout}>
            Sign Out Now
          </Button>
          <Button variant="accent" onClick={resetSessionTimer}>
            Keep Me Signed In
          </Button>
        </div>
      </div>
    </Modal>
  );
}
