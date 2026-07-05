<template>
  <div class="HeaderExample">
    <h2 class="example-title">Header 组件示例</h2>
    
    <!-- 默认样式 -->
    <div class="example-section">
      <h3 class="example-subtitle">默认样式</h3>
      <Header 
        title="Lite Notion" 
        logo-src="/logo.png"
        user-avatar="https://via.placeholder.com/40"
        user-name="用户名"
        @user-menu-click="handleUserMenuClick"
      >
        <template #center>
          <nav class="example-nav">
            <span class="nav-item">首页</span>
            <span class="nav-item">文档</span>
            <span class="nav-item">设置</span>
          </nav>
        </template>
        
        <template #actions>
          <el-button type="primary" size="small">新建文档</el-button>
          <el-icon class="search-icon" @click="handleSearch">
            <Search />
          </el-icon>
        </template>
      </Header>
    </div>

    <!-- 简约样式 -->
    <div class="example-section">
      <h3 class="example-subtitle">简约样式</h3>
      <Header 
        variant="minimal"
        title="文档编辑器"
        :show-logo="false"
        :show-user-menu="false"
      >
        <template #actions>
          <el-button size="small">保存</el-button>
          <el-button size="small">导出</el-button>
        </template>
      </Header>
    </div>

    <!-- 抬起样式 -->
    <div class="example-section">
      <h3 class="example-subtitle">抬起样式</h3>
      <Header 
        variant="elevated"
        title="项目管理"
        user-avatar="https://via.placeholder.com/40"
        user-name="管理员"
      >
        <template #center>
          <div class="breadcrumb">
            <span class="breadcrumb-item">首页</span>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-item">项目</span>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-item current">当前项目</span>
          </div>
        </template>
      </Header>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import { ElMessage } from 'element-plus'
import { Search } from '@arco-design/web-vue/es/icon'

const handleUserMenuClick = () => {
  ElMessage.info('用户菜单点击')
}

const handleSearch = () => {
  ElMessage.info('搜索功能')
}
</script>

<style lang="scss" scoped>
.HeaderExample {
  @apply p-6 bg-gray-50 min-h-screen;
  
  .example-title {
    @apply text-2xl font-bold text-gray-800 mb-6;
  }
  
  .example-section {
    @apply mb-8 bg-white rounded-lg p-6 shadow-sm;
    
    .example-subtitle {
      @apply text-lg font-semibold text-gray-700 mb-4;
    }
  }
}

.example-nav {
  @apply flex items-center space-x-6;
  
  .nav-item {
    @apply text-gray-600 hover:text-blue-600 cursor-pointer transition-colors;
  }
}

.search-icon {
  @apply text-gray-500 hover:text-gray-700 cursor-pointer transition-colors text-xl;
}

.breadcrumb {
  @apply flex items-center space-x-2 text-sm;
  
  .breadcrumb-item {
    @apply text-gray-500 hover:text-blue-600 cursor-pointer transition-colors;
    
    &.current {
      @apply text-gray-800 font-medium cursor-default;
    }
  }
  
  .breadcrumb-separator {
    @apply text-gray-400;
  }
}
</style>