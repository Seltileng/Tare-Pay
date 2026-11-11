"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
  maxWidth = "md",
}: ModalProps) {
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

  const maxWidthClasses = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
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

          {/* Modal Card / Bottom Sheet */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className={cn(
              "relative z-10 w-full max-h-[90vh] overflow-y-auto bg-card rounded-t-2xl sm:rounded-2xl border border-border/80 p-6 shadow-modal card-highlight",
              maxWidthClasses[maxWidth],
              className
            )}
          >
            {/* Mobile Sheet drag indicator */}
            <div className="sm:hidden w-12 h-1.5 bg-muted-foreground/30 rounded-full mx-auto mb-4" />

            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                {title && <h2 className="text-xl font-bold tracking-tight text-foreground">{title}</h2>}
                {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="rounded-xl p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X className="w-5 h-5" strokeWidth={1.75} />
              </button>
            </div>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
