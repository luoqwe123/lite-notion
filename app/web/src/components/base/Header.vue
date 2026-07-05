<template>
  <header class="Header" :class="variant">
    <div class="Header-left">
      <div class="Header-logo" v-if="showLogo">
        <img v-if="logoSrc" :src="logoSrc" :alt="logoAlt" class="Header-logo-img" />
        <span v-else class="Header-logo-text">{{ title }}</span>
      </div>
      <div v-if="showTitle" class="Header-title">
        <h1>{{ title }}</h1>
      </div>
    </div>
    
    <div class="Header-center">
      <slot name="center"></slot>
    </div>
    
    <div class="Header-right">
      <slot name="actions"></slot>
      <div v-if="showUserMenu" class="Header-user-menu">
        <el-avatar :src="userAvatar" :alt="userName" @click="handleUserMenuClick" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** 标题文本 */
  title?: string
  /** Logo图片地址 */
  logoSrc?: string
  /** Logo替代文本 */
  logoAlt?: string
  /** 用户头像地址 */
  userAvatar?: string
  /** 用户名 */
  userName?: string
  /** 变体样式 */
  variant?: 'default' | 'minimal' | 'elevated'
  /** 是否显示Logo */
  showLogo?: boolean
  /** 是否显示标题 */
  showTitle?: boolean
  /** 是否显示用户菜单 */
  showUserMenu?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Lite Notion',
  logoAlt: 'Logo',
  variant: 'default',
  showLogo: true,
  showTitle: true,
  showUserMenu: true
})

// 事件定义
const emit = defineEmits<{
  userMenuClick: []
}>()

const handleUserMenuClick = () => {
  emit('userMenuClick')
}
</script>

<style lang="scss" scoped>
.Header {
  @apply flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200;
  
  &.default {
    @apply shadow-sm;
  }
  
  &.minimal {
    @apply border-0 bg-transparent;
  }
  
  &.elevated {
    @apply shadow-lg border-b border-gray-300;
  }
}

.Header-left {
  @apply flex items-center space-x-4;
}

.Header-logo {
  @apply flex items-center space-x-2;
  
  &-img {
    @apply w-8 h-8 object-contain;
  }
  
  &-text {
    @apply text-xl font-bold text-gray-800;
  }
}

.Header-title {
  @apply flex items-center;
  
  h1 {
    @apply text-2xl font-bold text-gray-900 m-0;
  }
}

.Header-center {
  @apply flex-1 flex items-center justify-center;
}

.Header-right {
  @apply flex items-center space-x-4;
}

.Header-user-menu {
  @apply cursor-pointer hover:opacity-80 transition-opacity;
  
  :deep(.el-avatar) {
    @apply border-2 border-gray-200 hover:border-gray-300 transition-colors;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .Header {
    @apply px-4 py-3;
  }
  
  .Header-left {
    @apply space-x-2;
  }
  
  .Header-logo-img {
    @apply w-6 h-6;
  }
  
  .Header-logo-text {
    @apply text-lg;
  }
  
  .Header-title h1 {
    @apply text-xl;
  }
  
  .Header-right {
    @apply space-x-2;
  }
}
</style>