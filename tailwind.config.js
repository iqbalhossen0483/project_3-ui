module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        "custom": "60px 1fr",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
