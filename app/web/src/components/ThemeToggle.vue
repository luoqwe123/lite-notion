<!-- app/web/src/components/ThemeToggle.vue -->
<template>
  <button @click="toggleTheme" class="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
    <span v-if="currentTheme === 'light'">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/modules/themeStore';
import { storeToRefs } from 'pinia';

const themeStore = useThemeStore();
const { currentTheme } = storeToRefs(themeStore);
const { toggleTheme } = themeStore;
</script>

<style scoped lang="scss">
// 可以根据需要添加一些组件特有的样式
</style>
