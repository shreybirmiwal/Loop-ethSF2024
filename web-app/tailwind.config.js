// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'times-condensed': ['"Times New Roman Condensed"', 'serif'],
      },
      colors: {
        darkbg: '#0D1117', // A clean dark color
        accent: '#1F6FEB', // Accent blue for links and buttons
      },
    },
  },
  plugins: [],
}
