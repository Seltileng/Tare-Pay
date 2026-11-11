"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, User, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const { currentRole, setRole } = useAuthStore();
  const [identifier, setIdentifier] = React.useState("chinedu.okafor@example.ng");
  const [password, setPassword] = React.useState("Password123!");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberDevice, setRememberDevice] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError("Please provide your registered phone number or email, and password.");
      return;
    }
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (currentRole === "Admin" || currentRole === "Treasurer" || currentRole === "President") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    }, 700);
  };

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-card card-highlight">
      <div className="text-center space-y-1.5 mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Welcome Back</h1>
        <p className="text-xs text-muted-foreground">
          Sign in to access your cooperative savings, loans, and dividends
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-xs text-danger font-medium">
            {error}
          </div>
        )}

        <Input
          label="Phone Number or Email Address"
          placeholder="e.g. 08012345678 or name@example.ng"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          leftIcon={<User className="w-4 h-4" />}
          autoFocus
        />

        <div className="space-y-1">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock className="w-4 h-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs text-accent-700 dark:text-accent-400 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {/* Remember device toggle */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberDevice}
              onChange={(e) => setRememberDevice(e.target.checked)}
              className="rounded text-accent focus:ring-accent"
            />
            <span className="text-xs text-muted-foreground">Remember this device</span>
          </label>
        </div>

        <Button
          type="submit"
          variant="accent"
          size="lg"
          className="w-full gap-2 mt-2 shadow-glow"
          isLoading={isLoading}
        >
          Sign In to Portal
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t border-border/60 text-center text-xs text-muted-foreground">
        New to Tare-pay?{" "}
        <Link href="/register" className="text-accent font-semibold hover:underline">
          Join Cooperative Society
        </Link>
      </div>
    </div>
  );
}
