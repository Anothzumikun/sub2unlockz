/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0b0f0d",
        card: "#121815",
        accent: "#22c55e",
        ink: "#0B0F14",
        paper: "#F3F5F4",
        muted: "#9CA6A1",
      },
    },
  },
  plugins: [],
};
