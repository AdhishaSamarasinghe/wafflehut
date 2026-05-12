/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'waffle-pink': '#F5A9C2',
        'candy-pink': '#FF7BAC',
        chocolate: '#6B3E26',
        'waffle-gold': '#D98B2B',
        'honey-gold': '#F4B942',
        'cream-white': '#FFF3E8',
        'soft-beige': '#F6D7B0',
        berry: '#D94A6A',
      },
      fontFamily: {
        display: ['Fredoka', 'Baloo 2', 'Poppins', 'sans-serif'],
        body: ['Poppins', 'Baloo 2', 'sans-serif'],
      },
      boxShadow: {
        waffle: '0 22px 80px rgba(107, 62, 38, 0.22)',
        candy: '0 16px 36px rgba(217, 74, 106, 0.22)',
      },
      backgroundImage: {
        'waffle-radial': 'radial-gradient(circle at top, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0) 58%)',
      },
    },
  },
  plugins: [],
};