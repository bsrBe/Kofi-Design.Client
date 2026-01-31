export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#ea2a33",
        "background-light": "#f8f6f6",
        "background-dark": "#0a0a0c",
        "accent-gold": "#D4AF37",
        "charcoal": "#1c1c1c",
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.15)',
        'red-glow': '0 0 20px rgba(234, 42, 51, 0.2)',
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"],
        "sans": ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
}
