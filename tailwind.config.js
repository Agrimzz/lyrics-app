/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purplePrimary: "#9A57D4", // Soft Purple
        purpleAccent: "#5A36A2", // Deep Violet
        lightGray: "#e9e8e9", // Light Gray
        electricBlue: "#5C98FF", // Electric Blue
        charcoalGray: "#3A3A3A", // Charcoal Gray
      },
    },
  },
  plugins: [],
}
