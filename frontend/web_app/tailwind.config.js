/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },

      backgroundImage: {
        'login-gradient': 
          "linear-gradient(0deg, #171717, #171717), linear-gradient(237.67deg, rgba(44, 201, 100, 0) 30.62%, rgba(44, 201, 100, 0.02) 100%)"
      },
      boxShadow: {
        'custom-green': '0px 18px 65px 0px #2CC96426',
      },
    },
  },
  plugins: [],
}