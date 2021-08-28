module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#dc143c",
        primary2: "#c90e34",
        secondary: "#003893",
        secondary2: "#043078",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
