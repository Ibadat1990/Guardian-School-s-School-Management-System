/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js,vue}", "node_modules/preline/dist/*.js", "./src/**/*.js"],

  theme: {
    extend: {},
  },

  plugins: [require("@tailwindcss/forms"), require("preline/plugin")],

  darkMode: "class",
};
