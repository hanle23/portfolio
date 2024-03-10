const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'main-light': '#f3edde',
        'nav-light': '#1f1d1e',
        'text-light': '#3a405c',
        container: '#121212',
        'playlist-hover': '#2b2b2b',
        'spotify-background': '#000',
      },
    },
    darkMode: 'class',
    plugins: [nextui()],
  },
}
