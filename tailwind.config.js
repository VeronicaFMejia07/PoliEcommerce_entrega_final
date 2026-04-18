/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    extend: {
         colors: {
          navy: {
            DEFAULT: "#002d56",
            dark: "#001a2e",
            bar: "#0d1520",
          },
          footer: {
            main: "#0a2e4e",
            bar: "#051a2d",
          },
          brand: {
            cyan: "#00adef",
          },
          surface: {
            muted: "#f0f0f0",
          },
        },
        fontFamily: {
          gotham: ["Gotham", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        },
        maxWidth: {
          container: "1200px",
        },
    },
  },
  plugins: [],
}

