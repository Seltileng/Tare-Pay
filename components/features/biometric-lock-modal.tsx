"use client";

import * as React from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { Fingerprint, Lock, ShieldCheck, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";

export function BiometricLockModal() {
  const { isLocked, unlockApp, user, verifyPin } = useAuthStore();
  const [pin, setPin] = React.useState("");
  const [error, setError] = React.useState("");
  const [isVerifyingBio, setIsVerifyingBio] = React.useState(false);

  if (!isLocked) return null;

  const handleDigit = (digit: string) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setError("");
      if (nextPin.length === 4) {
        if (verifyPin(nextPin)) {
          unlockApp();
          setPin("");
        } else {
          setError("Incorrect security PIN. Please try again.");
          setPin("");
        }
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setError("");
  };

  const handleBiometric = () => {
    setIsVerifyingBio(true);
    setTimeout(() => {
      setIsVerifyingBio(false);
      unlockApp();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-950/95 backdrop-blur-xl p-4 text-white">
      <div className="w-full max-w-sm flex flex-col items-center text-center space-y-6">
        {/* User avatar and greeting */}
        <div className="space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-xl font-bold text-emerald-300 mx-auto">
            {getInitials(user.fullName)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{user.fullName}</h3>
            <p className="text-xs text-slate-400 mt-0.5">App is locked for your privacy</p>
          </div>
        </div>

        {/* 4-dot PIN indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-4 py-2">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                  pin.length > index
                    ? "bg-emerald-400 scale-125 shadow-glow"
                    : "bg-slate-700 border border-slate-600"
                }`}
              />
            ))}
          </div>
          {error && <p className="text-xs text-rose-400 font-medium">{error}</p>}
        </div>

        {/* Numeric keypad */}
        <div className="grid grid-cols-3 gap-3 w-64 pt-2">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
            <button
              key={digit}
              onClick={() => handleDigit(digit)}
              className="w-16 h-16 rounded-full bg-slate-900/80 hover:bg-slate-800 text-xl font-semibold text-white border border-slate-700/80 transition-all active:scale-95 flex items-center justify-center mx-auto"
            >
              {digit}
            </button>
          ))}
          {/* Biometric trigger */}
          <button
            onClick={handleBiometric}
            className="w-16 h-16 rounded-full bg-emerald-950/50 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto active:scale-95"
            title="Unlock with Biometrics"
          >
            <Fingerprint className={`w-6 h-6 ${isVerifyingBio ? "animate-pulse" : ""}`} />
          </button>

          <button
            onClick={() => handleDigit("0")}
            className="w-16 h-16 rounded-full bg-slate-900/80 hover:bg-slate-800 text-xl font-semibold text-white border border-slate-700/80 transition-all active:scale-95 flex items-center justify-center mx-auto"
          >
            0
          </button>

          <button
            onClick={handleDelete}
            className="w-16 h-16 rounded-full bg-slate-900/40 hover:bg-slate-800/80 text-sm font-medium text-slate-400 flex items-center justify-center mx-auto active:scale-95"
          >
            Clear
          </button>
        </div>

        <div className="pt-2">
          <button
            onClick={handleBiometric}
            className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:text-emerald-300 font-medium"
          >
            <Fingerprint className="w-4 h-4" />
            Use FaceID / Biometric Sensor
          </button>
        </div>
      </div>
    </div>
  );
}
