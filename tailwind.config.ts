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
        onyx: "#0D0B09",
        capybara: "#C4813A",
        jungle: "#1E4A32",
        gold: "#E8A84E",
        cream: "#F0E6D2",
        terminal: "#4EC99A",
        hacker: "#00FF41",
        "hacker-dim": "#0a2a0a",
        coffee: "#A67C52",
        latte: "#D4A574",
        orange: "#FF8C42",
        aqua: "#5BC0EB",
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
