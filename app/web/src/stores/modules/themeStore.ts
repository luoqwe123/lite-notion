// app/web/src/stores/modules/themeStore.ts
import { defineStore } from 'pinia';

type Theme = 'light' | 'dark';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    currentTheme: 'light' as Theme,
  }),
  actions: {
    toggleTheme() {
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.currentTheme); // 持久化
      document.documentElement.classList.toggle('dark', this.currentTheme === 'dark');
    },
    initializeTheme() {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme) {
        this.currentTheme = savedTheme;
      } else {
        // 默认根据系统偏好设置
        this.currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.classList.toggle('dark', this.currentTheme === 'dark');
    },
  },
});
