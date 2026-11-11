"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: DrawerProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary-950/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className={cn(
                "w-screen max-w-md bg-card border-l border-border/80 shadow-2xl flex flex-col p-6 overflow-y-auto",
                className
              )}
            >
              <div className="flex items-center justify-between pb-4 border-b border-border/60">
                <div>
                  {title && <h2 className="text-lg font-bold text-foreground">{title}</h2>}
                  {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close drawer"
                  className="rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="w-5 h-5" strokeWidth={1.75} />
                </button>
              </div>

              <div className="flex-1 py-4">{children}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
