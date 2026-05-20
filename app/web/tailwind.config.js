/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',

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

        // ✅ 渐变颜色（v4 这样写才生效）
        'gradient-start': 'var(--gradient-start-color)',
        'gradient-end': 'var(--gradient-end-color)',
      },
    },
  },
}