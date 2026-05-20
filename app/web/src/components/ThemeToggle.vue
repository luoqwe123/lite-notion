<!-- app/web/src/components/ThemeToggle.vue -->
<template>
  <button
    @click="toggleTheme"
    class="theme-toggle-btn flex items-center justify-center w-10 h-10 rounded-full
           bg-(--color-background-card) border border-(--color-border-default)
           shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110
           focus:outline-none focus:ring-2 focus:ring-(--color-primary) focus:ring-offset-2"
    :aria-label="currentTheme === 'light' ? '切换到深色模式' : '切换到浅色模式'">
    <span
      class="text-xl transition-transform duration-300"
      :class="{ 'rotate-0': currentTheme === 'light', 'rotate-180': currentTheme === 'dark' }">
      {{ currentTheme === 'light' ? '🌙' : '☀️' }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { useThemeStore } from '~/stores/modules/themeStore';
import { storeToRefs } from 'pinia';

const themeStore = useThemeStore();
const { currentTheme } = storeToRefs(themeStore);
const { toggleTheme } = themeStore;
</script>

<style scoped lang="scss">
.theme-toggle-btn {
  backdrop-filter: blur(10px);
}

.theme-toggle-btn:hover {
  background-color: var(--color-background-card);
}
</style>
