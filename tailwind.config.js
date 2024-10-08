/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  variants: { extends: { display: ['group-hover'] } },
  theme: {
    extend: {
      colors: {
        'main-light': '#f3edde',
        'nav-light': '#1f1d1e',
        'text-light': '#3a405c',
      },
    },
    plugins: [],
  },
}
