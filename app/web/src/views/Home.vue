<template>
    <div
        class="home-container min-h-screen bg-(--color-background-default) 
        text-(--color-text-default) transition-colors duration-300 p-6 flex h-screen">
        <ThemeToggle class="absolute top-6 right-6"></ThemeToggle>
        <div class="hidden md:block h-full w-64 shrink-0">
            <NavigationBar :routers="routersRef" />
        </div>

        <div class="flex-1 overflow-auto p-4 h-full">
            <router-view />
        </div>
       
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { routers } from '~/routes/router';

let routersRef = ref<routersType[] | []>([])
for (const el of routers) {
    if (el.path === "/") routersRef.value = el.children as routersType[];
}


</script>

<style scoped>
.home-container {
    min-height: 100vh;
}
</style>