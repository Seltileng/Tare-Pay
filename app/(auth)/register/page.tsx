"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import { useOnboardingStore } from "@/stores/useOnboardingStore";

export default function RegisterPage() {
  const router = useRouter();
  const { updateData } = useOnboardingStore();
  const [step, setStep] = React.useState<"phone" | "otp">("phone");
  const [phone, setPhone] = React.useState("08034567890");
  const [otp, setOtp] = React.useState<string[]>(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = React.useState(45);
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [error, setError] = React.useState("");

  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === "otp" && countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 11) {
      setError("Please provide a valid 11-digit Nigerian phone number (e.g. 0801 234 5678).");
      return;
    }
    setError("");
    updateData({ phone });
    setStep("otp");
    setCountdown(45);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      // Paste support
      const pasted = val.replace(/\D/g, "").slice(0, 6).split("");
      const nextOtp = [...otp];
      pasted.forEach((char, i) => {
        if (i < 6) nextOtp[i] = char;
      });
      setOtp(nextOtp);
      const nextFocus = Math.min(pasted.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const nextOtp = [...otp];
    nextOtp[index] = val.replace(/\D/g, "");
    setOtp(nextOtp);

    // Auto-advance
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const fullCode = otp.join("");
    if (fullCode.length !== 6) {
      setError("Please enter the complete 6-digit verification code sent to your phone.");
      return;
    }
    setError("");
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      router.push("/onboarding");
    }, 700);
  };

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-card card-highlight">
      {step === "phone" ? (
        <>
          <div className="text-center space-y-1.5 mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Join Tare-pay
            </h1>
            <p className="text-xs text-muted-foreground">
              Enter your mobile phone number to begin membership enrollment
            </p>
          </div>

          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-xs text-danger font-medium">
                {error}
              </div>
            )}

            <Input
              label="Nigerian Mobile Phone Number"
              placeholder="e.g. 0801 234 5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              leftIcon={<Phone className="w-4 h-4" />}
              helperText="We will send a 6-digit SMS verification code to this line."
              autoFocus
            />

            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full gap-2 mt-4 shadow-glow"
            >
              Continue with Phone Number
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-border/60 text-center text-xs text-muted-foreground">
            Already a registered member?{" "}
            <Link href="/login" className="text-accent font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="text-center space-y-1.5 mb-6">
            <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Verify Phone Number
            </h1>
            <p className="text-xs text-muted-foreground">
              We sent a 6-digit OTP code to <strong className="text-foreground">{phone}</strong>
            </p>
          </div>

          <div className="space-y-6">
            {error && (
              <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-xs text-danger font-medium text-center">
                {error}
              </div>
            )}

            {/* 6 Auto-advancing inputs with paste support */}
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={idx === 0 ? 6 : 1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 sm:w-12 h-13 sm:h-14 rounded-xl border border-input bg-background text-center text-xl font-bold font-mono focus:border-accent focus:ring-2 focus:ring-accent outline-none transition-colors"
                />
              ))}
            </div>

            <Button
              onClick={handleVerifyOtp}
              variant="accent"
              size="lg"
              className="w-full gap-2 shadow-glow"
              isLoading={isVerifying}
            >
              Verify Code & Continue
              <ArrowRight className="w-4 h-4" />
            </Button>

            {/* Resend Countdown */}
            <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
              {countdown > 0 ? (
                <span>Resend OTP in <strong>{countdown}s</strong></span>
              ) : (
                <button
                  onClick={() => {
                    setCountdown(45);
                    setOtp(["", "", "", "", "", ""]);
                    inputRefs.current[0]?.focus();
                  }}
                  className="text-accent font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Resend verification code
                </button>
              )}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setStep("phone")}
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                Change phone number
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
