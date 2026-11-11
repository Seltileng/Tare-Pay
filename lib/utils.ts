import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number to Nigerian Naira currency standard
 * e.g., formatNaira(1250000) => ₦1,250,000.00
 */
export function formatNaira(amount: number, showDecimals: boolean = true): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);
}

/**
 * Formats dates adhering to Nigerian locale conventions
 */
export function formatDate(
  date: string | number | Date,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  }
): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-NG", options).format(d);
}

/**
 * Returns time formatted in 12hr am/pm
 */
export function formatTime(date: string | number | Date): string {
  const d = typeof date === "string" || typeof date === "number" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-NG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);
}

/**
 * Formats Nigerian phone numbers into readable chunks: 0801 234 5678
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
}

/**
 * Masks 11-digit BVN / NIN e.g. 2223 •••• 981
 */
export function maskBvn(val: string): string {
  const cleaned = val.replace(/\D/g, "");
  if (cleaned.length < 8) return cleaned;
  return `${cleaned.slice(0, 4)} •••• ${cleaned.slice(-3)}`;
}

/**
 * Generates initials from full name e.g. "Chinedu Okafor" => "CO"
 */
export function getInitials(name: string): string {
  if (!name) return "TP";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Deterministically generates a soft background color for avatar initials
 */
export function hashColor(str: string): { bg: string; text: string } {
  const colors = [
    { bg: "bg-emerald-100 dark:bg-emerald-950/70", text: "text-emerald-700 dark:text-emerald-300" },
    { bg: "bg-sky-100 dark:bg-sky-950/70", text: "text-sky-700 dark:text-sky-300" },
    { bg: "bg-indigo-100 dark:bg-indigo-950/70", text: "text-indigo-700 dark:text-indigo-300" },
    { bg: "bg-amber-100 dark:bg-amber-950/70", text: "text-amber-700 dark:text-amber-300" },
    { bg: "bg-rose-100 dark:bg-rose-950/70", text: "text-rose-700 dark:text-rose-300" },
    { bg: "bg-teal-100 dark:bg-teal-950/70", text: "text-teal-700 dark:text-teal-300" },
    { bg: "bg-violet-100 dark:bg-violet-950/70", text: "text-violet-700 dark:text-violet-300" },
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

/**
 * Asynchronous promise delay utility
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Greeting based on current time of day in Lagos (WAT)
 */
export function getTimeOfDayGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
