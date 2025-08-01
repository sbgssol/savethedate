/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        josefin: ["Josefin Sans", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
        ballet: ["Ballet", "cursive"],
        pinyon: ["Pinyon Script", "cursive"],
        tourney: ["Tourney", "cursive"],
        coiny: ["Coiny", "cursive"],
        imperal: ["Imperial Script", "cursive"],
        fleur: ["Fleur De Leah", "cursive"],
        lalezar: ["Lalezar", "cursive"],
        geologica: ["Geologica", "sans-serif"],
        rowdies: ["Rowdies", "cursive"],
        tiltNeon: ["Tilt Neon", "cursive"],
      },
      colors: {
        primary: "#0e32a8",
        secondary: "#d3e8ff",
        accent: "#FFFDD0",
      },
    },
  },
  plugins: [],
};
