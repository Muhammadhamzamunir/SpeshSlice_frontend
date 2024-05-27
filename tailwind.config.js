// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gradient-1': '#ff59ac',
        'gradient-2': '#ff679a',
        'gradient-3': '#ff778d',
        'gradient-4': '#ff8884',
        'gradient-5': '#ff9881',
      },
    },
  },
  plugins: [require("daisyui")],
};
