module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1f2c',     // Deep navy blue
        secondary: '#4682b4',   // Gold
        accent: '#389b0a',      // Royal purple
        'luxury-bg': '#0f0f0f', // Jet black
        'luxury-text': '#e5e5e5',
        'luxury-border': '#3d3d3d',
      },
      // Add gradient color stops explicitly
      gradientColorStops: {
        'dark': '#1a1f2c',
        'dark-light': '#2d2d2d',
      }
    },
  },
  plugins: [],
}