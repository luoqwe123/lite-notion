<template>
  <div class="NavigationBar-container h-full">
    <!-- 侧边栏 -->
    <div   @click=""
      class="h-full flex flex-col"
      :style="{
        background: 'var(--menu-bg)',
        color: 'var(--menu-text)',
        borderRight: '1px solid var(--menu-border)',
      }"
    >
      <!-- Logo 区域 -->
      <div class="p-4 border-b border-(--menu-border)">
        <h1 class="text-lg font-bold text-(--color-primary)">{{ title || "我的工作台"}}</h1>
      </div>

      <!-- 菜单 -->
      <div class="flex-1 overflow-y-auto py-2">
        <el-menu
          :router="true"
          mode="vertical"
          class="border-0 bg-transparent"
          :default-active="route.path.slice(1)"
          
        >
          <template v-for="item in routers" :key="item.path">
            <!-- 无子菜单 -->
            <el-menu-item
              v-if="!item.children || item.children.length === 0"
              :index="item.path"
            >
              <span class="ml-2">{{ item.meta?.name }}</span>
            </el-menu-item>

            <!-- 有子菜单 -->
            <el-sub-menu
              v-else
              :index="item.path"
              v-show="item.meta?.isNav"
            >
              <template #title>
                <span class="ml-2">{{ item.meta?.name }}</span>
              </template>
              <el-menu-item
                v-for="child in item.children"
                :key="child.path"
                :index="child.path"
              >
                <span class="ml-2">{{ child.meta?.name }}</span>
              </el-menu-item>
            </el-sub-menu>
          </template>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useRoute } from "vue-router";

interface RouterItem {
  path: string
  component: any
  meta?: {
    name: string
    isNav: boolean
  }
  children?: RouterItem[]
}

const props = defineProps<{
  routers: RouterItem[],
  title?:string
}>()

let route = useRoute();
// console.log(route)

</script>

<style lang="scss" scoped>
.NavigationBar-container {
  @apply h-full w-full overflow-hidden;

  :deep(.el-menu) {
    background-color: transparent !important;
    color: var(--menu-text) !important;
    border-right: none !important;
  }

  :deep(.el-menu-item) {
    color: var(--menu-text) !important;
    margin: 2px 8px;
    border-radius: 6px;

    &:hover {
      background-color: var(--menu-hover-bg) !important;
    }
  }

  :deep(.el-menu-item.is-active) {
    background-color: var(--menu-hover-bg) !important;
    color: var(--menu-active-text) !important;
    font-weight: 600;
  }

  :deep(.el-sub-menu__title) {
    color: var(--menu-text) !important;
    margin: 2px 8px;
    border-radius: 6px;

    &:hover {
      background-color: var(--menu-hover-bg) !important;
    }
  }
}
</style>