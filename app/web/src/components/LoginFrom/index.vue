<template>
  <div class="loginFrom-container flex flex-col items-center shadow-login rounded-2xl
    pt-16 gap-6
  ">
    <!-- 标题 -->
    <div
      class="title text-4xl font-bold tracking-wide bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
    >
      欢迎使用lite-notion
    </div>

    <!-- 表单 -->
    <div class="from flex flex-col items-center gap-6 w-80">
      <el-input
        placeholder="请输入您的邮箱"
        class="h-12! w-full! rounded-lg! border-gray-200! hover:border-blue-400! transition-all"
      />

      <el-input
        placeholder="请输入密码"
        class="h-12! w-full! rounded-lg! border-gray-200! hover:border-blue-400! transition-all"
        show-password
      />
      <div class="captcha flex justify-between w-full">
        <el-input
        placeholder="请输入验证码"
        class="h-12! w-56! rounded-lg! border-gray-200! hover:border-blue-400! transition-all"
        show-password
      />
        <el-button class="w-20 h-12!">获取验证码</el-button>
      </div>

      <el-button
        class="h-12! w-full! rounded-lg text-lg font-medium bg-gradient-to-r from-blue-500 to-purple-500 border-none text-white!"
      >
        登录
      </el-button>
      <div class="tip">
        <span>还没有账号，</span> <button class="border-none bg-transparent text-blue-500 hover:text-blue-600 transition-colors hover:underline hover:cursor-pointer  ">点我创建</button>
      </div>
      
    </div>

    <!-- 其他登录方式 -->
    <div class="floor w-80! gap-4 flex flex-col ">
      <div class="split flex items-center justify-center gap-3 text-gray-400">
        <span class="split-line w-25 h-px split-line-left inline-block"></span>
        <span class="text-xs">其他登录方式</span>
        <span class="split-line w-25 h-px split-line-right inline-block"></span>
      </div>
      <div class="another-methods flex justify-center gap-4">
        <el-button>
          <show-icon name="key" fill="black"></show-icon> <span class="ml-2">验证码登录</span>
        </el-button>
        <div class="chartIcon flex items-center gap-2">
          <a href="javascript:;" class="sprite-icon sprite-1"></a>
          <a href="javascript:;" class="sprite-icon sprite-2"></a>
          <a href="javascript:;" class="sprite-icon sprite-3"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
</script>

<style scoped>

</style>