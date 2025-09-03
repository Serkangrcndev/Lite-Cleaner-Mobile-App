/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./index.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6C5CE7",
          50: "#F1EFFE",
          100: "#E6E3FE",
          200: "#C9C2FD",
          300: "#AAA0FB",
          400: "#8C7FF9",
          500: "#6C5CE7",
          600: "#5347B2",
          700: "#3C3380",
          800: "#27214F",
          900: "#16132D",
        },
        accent: "#F472B6",
        dark: "#0B0F1A",
        card: "#0F172A",
      },
      fontFamily: {
        display: ["System"],
        sans: ["System"],
      },
      borderRadius: {
        xl: "1.25rem",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(139,92,246,0.22)",
        primaryGlow: "0 18px 42px rgba(139,92,246,0.30), 0 12px 28px rgba(244,114,182,0.22)",
      },
    },
  },
  plugins: [],
}

