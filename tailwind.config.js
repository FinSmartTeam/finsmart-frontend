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
        base: { 
          light: '#F8FAFC', // White (Slate 50)
          dark: '#0A0C10' 
        },
        card: { 
          light: '#FFFFFF', // White
          dark: '#181B28' 
        },
        primary: '#1680FF', // Blue
        accent: { 
          light: '#10B981', // Emerald
          dark: '#34D399' 
        },
        danger: { 
          light: '#E60039', 
          dark: '#FF3366' 
        },
        text: { 
          mainLight: '#0F172A',  // Slate dark
          mainDark: '#FFFFFF', 
          mutedLight: '#64748B', // Abu-abu for decription
          mutedDark: '#8B949E' 
        },
        border: { 
          light: '#E2E8F0', // outline abu-abu
          dark: '#2D313F' 
        }
      }
    },
  },
  plugins: [],
}