"use client";

import * as React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  TrendingUp,
  Percent,
  Coins,
  ArrowRight,
  CheckCircle2,
  Lock,
  ChevronDown,
  Building,
  Users2,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const FAQS = [
  {
    q: "Is Tare-pay a licensed bank or cooperative society?",
    a: "Tare-pay is operated under the regulatory framework of registered Cooperative Societies in Nigeria, partnering directly with CBN-licensed commercial and merchant banks (such as Providus Bank, GTBank, and Wema Bank) for custody of funds and settlement rails.",
  },
  {
    q: "How does the loan qualification and guarantor system work?",
    a: "Members can access credit up to 3x their combined savings and share capital. Loans are approved collaboratively: two verified members sign electronically as guarantors directly inside the Tare-pay app with no paper collateral required.",
  },
  {
    q: "How are dividends calculated and paid?",
    a: "At the conclusion of each financial year, the cooperative audited surplus is distributed to members in proportion to their share capital holdings, ratified during our Annual General Meeting (AGM) and credited directly to members.",
  },
  {
    q: "How secure is my BVN, NIN and financial data?",
    a: "We adhere strictly to the Nigeria Data Protection Regulation (NDPR). All biometric, BVN, and financial records are encrypted in transit with TLS 1.3 and at rest with AES-256.",
  },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <header className="glass-header h-18 py-3 px-4 sm:px-8 flex items-center justify-between max-w-7xl w-full mx-auto">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-900 to-accent flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-foreground">
              Tare<span className="text-accent">-pay</span>
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="accent" size="sm" className="hidden sm:inline-flex">
              Join Cooperative
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 px-4 sm:px-8 max-w-7xl mx-auto w-full text-center">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-muted/60 text-xs font-semibold text-accent-700 dark:text-accent-300">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Fintech-Grade Cooperative Banking for Nigeria
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
            Build True Wealth With Calm, Transparent Cooperative Finance.
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Target high-yield collective savings, access up to 3x non-collateralized loans with peer
            guarantors, and earn annual surplus dividends — all in one modern, trustworthy interface.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link href="/register">
              <Button size="lg" variant="accent" className="gap-2 shadow-glow">
                Start Cooperative Membership
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                Explore Live Demo
              </Button>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-muted-foreground font-medium">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-accent" />
              <span>CBN-Licensed Partner Banks</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-accent" />
              <span>NDPR Data Privacy Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Regulated Cooperative Society</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full border-t border-border/60">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Built for Modern Cooperatives & Ambitious Professionals
          </h2>
          <p className="text-sm text-muted-foreground">
            Eliminating bureaucratic delays with automated contributions, instant ledger updates, and
            democratized governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-border/80 bg-card card-highlight space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Coins className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Disciplined Savings & Targets</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Automate monthly contributions via NIBSS direct debits. Lock funds for specific projects
              and watch your loan eligibility multiply.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/80 bg-card card-highlight space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
              <Percent className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Fair 5-7% Cooperative Loans</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              No predatory loan sharks. Borrow at single-digit cooperative rates with flexible repayment
              schedules up to 24 months.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/80 bg-card card-highlight space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Annual Surplus Dividends</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every member is an equity owner. 100% of operational profits after reserves are paid back
              annually to active share capital accounts.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Steps */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full bg-muted/30 rounded-3xl my-6 border border-border/60">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            How Tare-pay Works
          </h2>
          <p className="text-sm text-muted-foreground">
            A frictionless 4-step journey to financial independence and community leverage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { step: "01", title: "Join & Verify", desc: "Instant onboarding with phone, BVN verification, and digital KYC in under 3 minutes." },
            { step: "02", title: "Acquire Shares", desc: "Purchase qualifying cooperative shares to lock your ownership stake and voting rights." },
            { step: "03", title: "Contribute Monthly", desc: "Automate steady contributions directly into your personal interest-bearing savings ledger." },
            { step: "04", title: "Borrow & Prosper", desc: "Access up to 3x loans endorsed by fellow members and receive annual cash dividends." },
          ].map((item) => (
            <div key={item.step} className="p-5 rounded-xl bg-card border border-border/80 space-y-2 card-highlight">
              <span className="text-2xl font-black text-accent/80 font-mono">{item.step}</span>
              <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 px-4 sm:px-8 max-w-3xl mx-auto w-full">
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground">
            Clear answers to how your money and data are managed.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-border/80 bg-card overflow-hidden card-highlight"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-foreground hover:bg-muted/40 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border/60 py-10 px-4 sm:px-8 bg-card">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">Tare-pay</span>
            <span>•</span>
            <span>Calm, Fintech-Grade Cooperative Banking</span>
          </div>
          <p>© 2026 Tare Cooperative Society Ltd. Regulated under Nigerian Cooperative Laws.</p>
        </div>
      </footer>
    </div>
  );
}
