import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        accent: "#7C3AED",
        accentSoft: "#A855F7",
        muted: "#B3B3B3",
        card: "rgba(255,255,255,0.04)",
        borderSubtle: "rgba(255,255,255,0.08)"
      },
      boxShadow: {
        glow: "0 0 24px rgba(124,58,237,0.35)"
      }
    }
  },
  plugins: []
};

export default config;
