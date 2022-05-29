const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
    container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("kutty")
  ],
}
