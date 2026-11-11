"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { Lock, ShieldCheck } from "lucide-react";

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title?: string;
  description?: string;
  amount?: number;
}

export function PinModal({
  isOpen,
  onClose,
  onSuccess,
  title = "Authorize Transaction",
  description = "Enter your 4-digit transaction security PIN to confirm this operation.",
  amount,
}: PinModalProps) {
  const { verifyPin } = useAuthStore();
  const [pin, setPin] = React.useState("");
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setPin("");
      setError("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleDigit = (digit: string) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setError("");
      if (nextPin.length === 4) {
        verify(nextPin);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setError("");
  };

  const verify = (inputPin: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      if (verifyPin(inputPin)) {
        setIsSubmitting(false);
        onSuccess();
        onClose();
      } else {
        setIsSubmitting(false);
        setError("Invalid PIN. Default demo PIN is 1234.");
        setPin("");
      }
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description={description}
      maxWidth="sm"
    >
      <div className="space-y-6 pt-2 text-center">
        {amount && (
          <div className="py-2 px-4 rounded-xl bg-accent/10 text-accent font-bold text-lg tabular-nums">
            ₦{amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
          </div>
        )}

        {/* 4 dots indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-4 py-2">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-150 ${
                  pin.length > index
                    ? "bg-accent scale-110"
                    : "bg-muted border border-border"
                }`}
              />
            ))}
          </div>
          {error && <p className="text-xs text-danger font-medium">{error}</p>}
        </div>

        {/* Numeric keypad */}
        <div className="grid grid-cols-3 gap-2.5 max-w-[240px] mx-auto">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleDigit(digit)}
              className="w-14 h-14 rounded-full bg-muted/60 hover:bg-muted text-lg font-bold text-foreground transition-all active:scale-95 flex items-center justify-center mx-auto"
            >
              {digit}
            </button>
          ))}
          <div className="w-14 h-14" />
          <button
            type="button"
            onClick={() => handleDigit("0")}
            className="w-14 h-14 rounded-full bg-muted/60 hover:bg-muted text-lg font-bold text-foreground transition-all active:scale-95 flex items-center justify-center mx-auto"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-14 h-14 rounded-full bg-muted/30 hover:bg-muted text-xs font-semibold text-muted-foreground flex items-center justify-center mx-auto active:scale-95"
          >
            Del
          </button>
        </div>

        <div className="text-[11px] text-muted-foreground pt-1 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-accent" />
          <span>Demo master PIN: <strong>1234</strong></span>
        </div>
      </div>
    </Modal>
  );
}
