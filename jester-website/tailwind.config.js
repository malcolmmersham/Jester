/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        royal: "#1A0D2E",
        purple: "#4A2580",
        brand: "#6B3FA0",
        amber: "#EF9F27",
        white: "#F1EFE8",
        border: "var(--color-border-secondary)",
        input: "var(--color-input-secondary)",
        ring: "var(--color-ring)",
        chart: {
          1: "#785EF0",
          2: "#F472B6",
          3: "#FBBF24",
          4: "#3B82F6",
          5: "#84CC16",
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "ui-serif", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}