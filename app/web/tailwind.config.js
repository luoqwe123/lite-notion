/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 启用基于类的暗模式
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        text: {
          DEFAULT: 'var(--color-text-default)',
        },
        background: {
          DEFAULT: 'var(--color-background-default)',
        },
        border: {
          DEFAULT: 'var(--color-border-default)',
        },
      },
    },
  },
  plugins: [],
}
