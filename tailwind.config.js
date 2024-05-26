/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.html", "./src/**/*.js", "./styles/**/*.css"],
  theme: {
    extend: {
      colors: {
        colorDarkPrimary: '#212936',
        colorDarkSecondary: '#4D5562',
        colorLightSecondary: '#E5E7EB',
        colorPrimaryAccent: '#C93B76',
        colorDarkOverlay: '#121826a6',
      },
      fontFamily: {
        DMSans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        'playMusic': '0px 2px 10px 0px rgba(201,59,118,0.51)',
      }
    },
    screens: {
      sm: "640px",
      lg: "1280px",
    },
  },
  plugins: [],
}