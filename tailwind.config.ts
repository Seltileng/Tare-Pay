import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "360px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "#F0F4F8",
          100: "#D9E2EC",
          200: "#BCCCDC",
          300: "#9FB3C8",
          400: "#829AB1",
          500: "#627D98",
          600: "#486581",
          700: "#334E68",
          800: "#1E293B",
          900: "#0F172A",
          950: "#0B1220",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
          950: "#022C22",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        success: {
          DEFAULT: "#10B981",
          foreground: "#FFFFFF",
          subtle: "#ECFDF5",
        },
        warning: {
          DEFAULT: "#F59E0B",
          foreground: "#FFFFFF",
          subtle: "#FFFBEB",
        },
        danger: {
          DEFAULT: "#F43F5E",
          foreground: "#FFFFFF",
          subtle: "#FFF1F2",
        },
        info: {
          DEFAULT: "#0284C7",
          foreground: "#FFFFFF",
          subtle: "#F0F9FF",
        },
      },
      borderRadius: {
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        full: "9999px",
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)",
        card: "0 1px 3px rgba(15, 23, 42, 0.05), 0 10px 30px -10px rgba(15, 23, 42, 0.08)",
        modal: "0 20px 40px -12px rgba(15, 23, 42, 0.18)",
        glow: "0 0 24px -4px rgba(5, 150, 105, 0.25)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
