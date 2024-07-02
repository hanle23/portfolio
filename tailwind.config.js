/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'main-light': '#f3edde',
        'nav-light': '#1f1d1e',
        'text-light': '#3a405c',
        container: '#121212',
        'playlist-hover': '#2b2b2b',
        'spotify-subtext': '#b3b3b3',
        'spotify-header-background': '#1a1a1a',
        'spotify-background': '#000',
        'spotify-item-background': '#27272a',
        'spotify-item-hover': '#3c3c3e',
        'spotify-color': '#1DB954',
        'danger-color': '#ff0000',
        'image-background': '#282828',
      },
    },
    plugins: [],
  },
}
