import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        surface: "#0f0f0f",
        accent: "#bef264",
        accentSoft: "#a3e635",
        muted: "#a1a1aa",
        card: "rgba(255,255,255,0.025)",
        borderSubtle: "rgba(255,255,255,0.06)"
      },
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"]
      },
      boxShadow: {
        glow: "0 0 24px rgba(190,242,100,0.3)",
        "glow-sm": "0 0 14px rgba(190,242,100,0.2)",
        "glow-lg": "0 0 50px rgba(190,242,100,0.4)",
        card: "0 4px 20px rgba(0,0,0,0.4)"
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em"
      }
    }
  },
  plugins: []
};

export default config;
