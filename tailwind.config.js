/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'outer-bg': '#444',
        'app-bg': '#F7FBFF',
        'text' : {
          '001' : "#353542",
          '002' : "#65656e",
          '003' : "#9b9b9b",
          '004' : "#c3c3c3",
        },
        'brand-blue' : {
          'light' : "#6CD5E3",
          'heavy' : '#39C6DA',
        },
        'brand-gray' : {
          'light' : "#f9f9f9",
          'heavy' : '#ededed',
        }
      },
      backgroundImage: {
        'banner-bg' : 'linear-gradient(95.84deg, #BAF2EC 0%, #BCE7FF 97.09%)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
