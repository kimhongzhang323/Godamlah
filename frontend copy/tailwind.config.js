module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'Rubik', 'sans-serif'], // Combine your custom fonts
        inter: ['Inter', 'sans-serif'],                   // Specific utility for Inter
        rubik: ['Rubik', 'sans-serif'],                   // Specific utility for Rubik
      },
      },
    },
  plugins: [],
}
