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
        },
        'brand-blue' : {
          'light' : "#6CD5E3",
          'heavy' : '#39C6DA',
        }
      },
      backgroundImage: {
        'banner-bg' : 'linear-gradient(95.84deg, #BAF2EC 0%, #BCE7FF 97.09%)',
      }
    },
  },
  plugins: [],
};
