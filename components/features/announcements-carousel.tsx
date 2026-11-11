"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Megaphone, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Announcement {
  id: string;
  badge: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  bgGradient: string;
}

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann_01",
    badge: "AGM 2026",
    title: "Notice of 35th Annual General Meeting & Board Elections",
    description: "Scheduled for Saturday, 5th December 2026 at Muson Centre, Lagos. Electronic voting and proxy delegation forms now open.",
    linkText: "Register Attendance / Vote",
    linkHref: "/governance",
    bgGradient: "from-emerald-900/90 to-slate-900",
  },
  {
    id: "ann_02",
    badge: "Dividend Payout",
    title: "FY2025 Approved Dividend Distribution: ₦3.22 / Share",
    description: "The Cooperative Supervisory Board has credited ₦322M in aggregate surplus to eligible members' verified accounts.",
    linkText: "View Dividend Statement",
    linkHref: "/dividends",
    bgGradient: "from-navy-950 to-emerald-950",
  },
  {
    id: "ann_03",
    badge: "Policy Update",
    title: "Increased Maximum Loan Tenor to 24 Months",
    description: "Members with at least 12 months continuous active contributions can now access expanded 24-month capital development loans.",
    linkText: "Check Loan Eligibility",
    linkHref: "/loans",
    bgGradient: "from-slate-900 to-sky-950",
  },
];

export function AnnouncementsCarousel() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? ANNOUNCEMENTS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === ANNOUNCEMENTS.length - 1 ? 0 : prev + 1));
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[currentIndex];

  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-primary-900 to-emerald-950 text-white p-6 border-0 card-highlight">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Megaphone className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            {current.badge}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={prev}
            aria-label="Previous announcement"
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-[11px] text-slate-400 px-1 font-mono">
            {currentIndex + 1} / {ANNOUNCEMENTS.length}
          </div>
          <button
            onClick={next}
            aria-label="Next announcement"
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-base font-bold tracking-tight text-white line-clamp-1">
          {current.title}
        </h4>
        <p className="text-xs text-slate-300 line-clamp-2 max-w-2xl leading-relaxed">
          {current.description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between pt-2 border-t border-white/10">
        <Link
          href={current.linkHref}
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 hover:text-emerald-200 transition-colors"
        >
          {current.linkText}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>

        {/* Carousel indicators */}
        <div className="flex items-center gap-1.5">
          {ANNOUNCEMENTS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Jump to announcement ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === i ? "w-6 bg-emerald-400" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
