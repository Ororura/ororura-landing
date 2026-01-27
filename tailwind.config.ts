import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          purple: "#ca6bed",
          "light-purple": "#e0acf2",
          "dark-purple": "#9F68B2",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
