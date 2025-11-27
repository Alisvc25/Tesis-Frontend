/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        epnGray: '#F5F5F5',   // gris suave de fondo
        epnBlack: '#1F1F1F',  // negro principal para texto
        epnBlue: '#1D4ED8',   // azul institucional
        epnWhite: '#FFFFFF'   // blanco
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
