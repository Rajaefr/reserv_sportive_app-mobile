/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./index.tsx",
    "./App.tsx"
  ],
  theme: {
    extend: {
      colors: {
        ocpBlue: '#212E53',
        ocpGreen: '#32CD32',
      },
    },
  },
  plugins: [],
}