/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      linearBorderGradients: ({ theme }) => ({
        colors: {
          variant1: ["#9363FD", "#171717"],
          variant2: ["#FFFFFF", "#171717"],
        },
        background: theme("colors"),
      }),
    },
  },
  plugins: [require("tailwindcss-border-gradient-radius")],
};
