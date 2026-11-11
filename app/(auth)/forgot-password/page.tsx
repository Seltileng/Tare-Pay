"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [screen, setScreen] = React.useState<1 | 2 | 3 | 4>(1);
  const [contact, setContact] = React.useState("chinedu.okafor@example.ng");
  const [otp, setOtp] = React.useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // Password strength calculation
  const getStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score; // 0 - 4
  };

  const strength = getStrength(newPassword);
  const strengthLabels = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];
  const strengthColors = ["bg-red-500", "bg-orange-500", "bg-amber-500", "bg-emerald-500", "bg-emerald-600"];

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) {
      setError("Please provide your registered email or phone.");
      return;
    }
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setScreen(2);
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("").length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setScreen(3);
    }, 600);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setScreen(4); // Success screen
    }, 700);
  };

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-card card-highlight">
      {/* Screen 1: Request Code */}
      {screen === 1 && (
        <form onSubmit={handleRequestOtp} className="space-y-4">
          <div className="text-center space-y-1.5 mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Reset Password</h1>
            <p className="text-xs text-muted-foreground">
              Step 1 of 3: Enter your registered email or phone to receive a reset code
            </p>
          </div>

          {error && <div className="p-3 rounded-xl bg-danger/10 text-xs text-danger font-medium">{error}</div>}

          <Input
            label="Email or Mobile Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            autoFocus
          />

          <Button type="submit" variant="accent" size="lg" className="w-full gap-2 shadow-glow" isLoading={isLoading}>
            Send Reset Code
            <ArrowRight className="w-4 h-4" />
          </Button>

          <div className="text-center pt-2">
            <Link href="/login" className="text-xs text-muted-foreground hover:text-foreground underline">
              Return to login
            </Link>
          </div>
        </form>
      )}

      {/* Screen 2: OTP Verification */}
      {screen === 2 && (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div className="text-center space-y-1.5 mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Verify OTP</h1>
            <p className="text-xs text-muted-foreground">
              Step 2 of 3: Enter the 6-digit code dispatched to <strong className="text-foreground">{contact}</strong>
            </p>
          </div>

          {error && <div className="p-3 rounded-xl bg-danger/10 text-xs text-danger font-medium text-center">{error}</div>}

          <div className="flex items-center justify-center gap-2">
            {otp.map((d, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={d}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  const next = [...otp];
                  next[i] = val;
                  setOtp(next);
                  if (val && e.target.nextElementSibling) {
                    (e.target.nextElementSibling as HTMLInputElement).focus();
                  }
                }}
                className="w-11 h-13 rounded-xl border border-input text-center text-xl font-bold font-mono focus:border-accent focus:ring-2 focus:ring-accent outline-none"
              />
            ))}
          </div>

          <Button type="submit" variant="accent" size="lg" className="w-full gap-2 shadow-glow" isLoading={isLoading}>
            Verify Code
            <ArrowRight className="w-4 h-4" />
          </Button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setScreen(1)}
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Back to change email/phone
            </button>
          </div>
        </form>
      )}

      {/* Screen 3: New Password */}
      {screen === 3 && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="text-center space-y-1.5 mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Set New Password</h1>
            <p className="text-xs text-muted-foreground">
              Step 3 of 3: Choose a strong, memorable security password
            </p>
          </div>

          {error && <div className="p-3 rounded-xl bg-danger/10 text-xs text-danger font-medium">{error}</div>}

          <Input
            label="New Password"
            type="password"
            placeholder="Min. 8 characters"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
          />

          {/* Password strength bar */}
          {newPassword && (
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>Strength:</span>
                <span className="font-semibold text-foreground">{strengthLabels[strength]}</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden flex gap-1">
                {[0, 1, 2, 3].map((stepIdx) => (
                  <div
                    key={stepIdx}
                    className={`h-full flex-1 rounded-full transition-all ${
                      strength > stepIdx ? strengthColors[strength] : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <Button type="submit" variant="accent" size="lg" className="w-full gap-2 shadow-glow" isLoading={isLoading}>
            Update Password & Sign In
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      )}

      {/* Screen 4: Success confirmation */}
      {screen === 4 && (
        <div className="text-center space-y-4 py-4">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Password Reset Complete</h2>
          <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
            Your login password has been securely updated. You can now sign in with your new credentials.
          </p>
          <Button
            onClick={() => router.push("/login")}
            variant="accent"
            size="lg"
            className="w-full gap-2 shadow-glow mt-2"
          >
            Go to Login
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
