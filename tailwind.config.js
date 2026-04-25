/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: { light: '#f4f7fe', dark: '#0a0c10' },
        card: { light: '#ffffff', dark: '#181b28' },
        primary: '#1680FF',
        accent: { light: '#00c853', dark: '#39FF14' },
        danger: { light: '#e60039', dark: '#ff3366' },
        text: { mainLight: '#1b1b1b', mainDark: '#ffffff', mutedLight: '#6c757d', mutedDark: '#8b949e' },
        border: { light: '#e0e5f2', dark: '#2d313f' }
      }
    },
  },
  plugins: [],
}