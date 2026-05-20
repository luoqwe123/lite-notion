<template>
    <div class="Document-container">
        <Tiptap  v-model="content" class="w-200 h-auto min-h-screen" />


    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
const content = ref('<p>欢迎使用富文本编辑器～</p>')


</script>

<style lang="scss" scoped>

</style>