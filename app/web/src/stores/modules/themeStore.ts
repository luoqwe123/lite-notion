// app/web/src/stores/modules/themeStore.ts
import { defineStore } from 'pinia';

type Theme = 'light' | 'dark';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    currentTheme: 'light' as Theme,
  }),
  actions: {
    toggleTheme(e:MouseEvent) {
      
      this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', this.currentTheme); // 持久化
      const transition = document.startViewTransition(() => {
        // 在 startViewTransition 中修改 DOM 状态产生动画
        document.documentElement.classList.toggle('dark', this.currentTheme === 'dark');
      })
      transition.ready.then(() => {
        // 由于我们要从鼠标点击的位置开始做动画，所以我们需要先获取到鼠标的位置
        const { clientX, clientY } = e

        // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
        const radius = Math.hypot(
          Math.max(clientX, innerWidth - clientX),
          Math.max(clientY, innerHeight - clientY)
        )
        const clipPath = [
          `circle(0% at ${clientX}px ${clientY}px)`,
          `circle(${radius}px at ${clientX}px ${clientY}px)`
        ]

        const isDark = document.documentElement.classList.contains('dark')
        // 自定义动画
        document.documentElement.animate(
          {
            clipPath: isDark ? clipPath.reverse() : clipPath
          },
          {
            duration: 500,
            pseudoElement: isDark
              ? '::view-transition-old(root)'
              : '::view-transition-new(root)'
          }
        )
      })


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
