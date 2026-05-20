<template>
    <div class="app-container min-h-screen transition-colors duration-300 bg-(--color-background-default) text-(--color-text-default)">
       <router-view></router-view>
    </div>
</template>

<script setup lang='ts'>
</script>

<style scoped>
.app-container {
  min-height: 100vh;
}
</style>