<template>
  <div
    class="SpaceIntro-container p-4 sm:p-6 md:p-8 rounded-xl border w-full max-w-300 mx-auto h-full"
    :style="{ background: 'var(--doc-card-bg)', borderColor: 'var(--doc-border)' }"
  >
    <!-- 头部：标题+右侧操作按钮 -->
    <div class="flex justify-between items-start mb-4 flex-wrap gap-3">
      <!-- 左侧标题区域 -->
      <div class="flex items-center gap-3">
        <div>
          <h1 class="text-[22px] font-bold" :style="{ color: 'var(--doc-title)' }">开发</h1>
          <div class="flex items-center gap-3 mt-1 text-sm" :style="{ color: 'var(--doc-tip)' }">
            <span>1 文档</span>
            <span>22 字</span>
          </div>
        </div>
      </div>

      <!-- 右侧：收藏、分享、更多 -->
      <div class="flex gap-2">
        <button
          class="flex items-center gap-1 px-3 py-1.5 rounded-md border text-sm transition-colors hover:bg-[var(--menu-hover-bg)]"
          :style="{ borderColor: 'var(--doc-border)', color: 'var(--doc-desc)' }"
        >
          <!-- <ShowIcon name="star" size="16px" /> -->
          <span>收藏</span>
        </button>
        <!-- <button
          class="px-3 py-1.5 rounded-md border text-sm transition-colors hover:bg-[var(--menu-hover-bg)]"
          :style="{ borderColor: 'var(--doc-border)', color: 'var(--doc-desc)' }"
        >
          <ShowIcon name="more" size="16px" />
        </button> -->
      </div>
    </div>

    <!-- 作者头像 -->
    <div class="mb-5">
      <img
        src="https://picsum.photos/id/33/36/36"
        alt="作者头像"
        class="w-9 h-9 rounded-full object-cover"
      />
    </div>

    <!-- 文案描述区域 -->
    <div class="mb-8">
      <div class="flex items-center gap-1.5 mb-2">
        <!-- <ShowIcon name="light" size="16px" color="#f59e0b" /> -->
        <span class="font-medium" :style="{ color: 'var(--doc-title)' }">欢迎来到知识库</span>
      </div>
      <p class="pl-[22px] text-sm leading-relaxed" :style="{ color: 'var(--doc-desc)' }">
        知识库就像书一样，让多篇文档结构化，方便知识的创作与沉淀
      </p>
    </div>

    <!-- 文档分割行 -->
    <div class="mt-10 flex items-center text-sm" :style="{ color: 'var(--doc-tip)' }">
      <span>lite-notion</span>
      <div class="flex-1 mx-3 border-dashed border-b" :style="{ borderColor: 'var(--doc-border)' }"></div>
      <span>昨天 13:52</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import ShowIcon from '~/components/showIcon.vue'
</script>

<style lang="scss" scoped>
.SpaceIntro-container {
  min-height: 520px;
}
</style>