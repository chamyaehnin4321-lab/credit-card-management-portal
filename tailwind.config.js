/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bank: {
          ink: "#172033",
          muted: "#667085",
          blue: "#005baa",
          navy: "#101928",
          gold: "#d8a316",
          line: "#d9e2ef",
          surface: "#f5f7fb",
        },
      },
      boxShadow: {
        panel: "0 14px 36px rgba(23, 32, 51, 0.08)",
      },
    },
  },
  plugins: [],
};
