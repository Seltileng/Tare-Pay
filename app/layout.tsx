import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { CommandPalette } from "@/components/ui/command-palette";
import { SessionTimeoutModal } from "@/components/features/session-timeout-modal";
import { BiometricLockModal } from "@/components/features/biometric-lock-modal";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tare-pay — Calm, Fintech-Grade Cooperative Banking",
  description:
    "Next-generation cooperative finance platform for modern Nigerian professionals and organizations. Savings, collateral-free credit, dividends, and automated governance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          {/* Global Dialogs & Accessibility Tools */}
          <CommandPalette />
          <SessionTimeoutModal />
          <BiometricLockModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
