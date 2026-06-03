<template>
  <!-- 弹窗容器 -->
  <div class="AddTeam-container fixed inset-0 flex items-center justify-center z-50 bg-black/40">
    <!--弹窗主体卡片-->
    <div
      class="w-full max-w-lg px-8 py-7 rounded-xl flex flex-col gap-6  max-h-[80vh] bg-white"
    >
      <!--顶部标题+关闭按钮-->
      <div class="flex justify-between items-center">
        <h2 class="text-[16px] font-medium text-gray-800">新建知识库</h2>
        <span class="cursor-pointer text-xl text-gray-800">×</span>
      </div>

      <!--基本信息区域-->
      <div class="flex flex-col gap-2">
        <h3 class="text-[14px] font-medium text-gray-800">基本信息</h3>
        <!--知识库名称输入框-->
        <input
          type="text"
          placeholder="知识库名称"
          class="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-[#42b883] transition-colors bg-white text-gray-800"
        />
        <!--简介文本域-->
        <textarea
          placeholder="知识库简介 (选填)"
          rows="3"
          class="w-full rounded-lg border border-gray-200 px-4 py-3 resize-none outline-none focus:border-[#42b883] transition-colors bg-white text-gray-800"
        ></textarea>
      </div>
   

      <!--分组下拉-->
      <div class="flex flex-col gap-2">
        <h3 class="text-l[14px] font-medium text-gray-800">分组</h3>
        <div
          class="w-full rounded-lg border border-gray-200 px-4 py-3 flex justify-between items-center cursor-pointer bg-white text-gray-800"
        >
          <span>我的知识库</span>
          <span>⌄</span>
        </div>
      </div>

      <!--底部新建按钮-->
      <button
        class="w-full rounded-xl py-3.5 text-[14px] mt-2 transition-opacity hover:opacity-90 bg-[#a9e9cb] text-white"
      >
        新建
      </button>
    </div>
  </div>
</template>

<script setup lang='ts'>
</script>

<style lang="scss" scoped>
.AddTeam-container {
  input::placeholder,
  textarea::placeholder {
    color: #9ca3af;
  }
}
</style>