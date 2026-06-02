import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ─── Ivory / Cream Palette ─── */
        ivory: {
          50: "#FDFAF5",
          100: "#FAF6EF",
          200: "#F5EFE5",
          300: "#EDE5D8",
          400: "#E2D5C3",
        },
        /* ─── Warm Neutrals ─── */
        warm: {
          50: "#F8F4EE",
          100: "#F0EAE0",
          200: "#E5DDD0",
          300: "#D4C9B8",
          400: "#B8A890",
        },
        /* ─── Charcoal Typography ─── */
        charcoal: {
          950: "#0a0a0a",
          900: "#0d0d0d",
          800: "#1a1a1a",
          700: "#2a2a2a",
          600: "#3a3a3a",
          500: "#555555",
          400: "#777777",
          300: "#999999",
          200: "#bcbcbc",
        },
        /* ─── Antique Gold ─── */
        gold: {
          50: "#fdf8ef",
          100: "#f5ecd4",
          200: "#e6d5a8",
          300: "#d4b96e",
          400: "#c9a84c",
          500: "#d4af37",
          600: "#b8941f",
          700: "#8b6914",
          800: "#6b5210",
          900: "#4a380b",
        },
        /* ─── Champagne Beige ─── */
        champagne: {
          50: "#FBF7F0",
          100: "#F4EDE0",
          200: "#E8DBC5",
          300: "#D9C5A5",
          400: "#C7AC82",
        },
      },
      fontFamily: {
        serif: [
          "Cormorant Garamond",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "scroll-bounce": "scrollBounce 2s ease-in-out infinite",
        "gentle-float": "gentleFloat 6s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "luxury-float-1": "luxuryFloat 7s ease-in-out infinite",
        "luxury-float-2": "luxuryFloat 7s ease-in-out 0.8s infinite",
        "luxury-float-3": "luxuryFloat 7s ease-in-out 1.6s infinite",
        "card-reveal": "cardReveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        scrollBounce: {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.6" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
        gentleFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { opacity: "0.3" },
          "50%": { opacity: "0.8" },
          "100%": { opacity: "0.3" },
        },
        luxuryFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        cardReveal: {
          "0%": { opacity: "0", transform: "translateY(30px) scale(0.95)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
