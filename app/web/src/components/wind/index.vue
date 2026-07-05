<template>
    <div class="wind-container">

        {{ message }}
    </div>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
    message:string
}>(),{
    message:"nihao"
})

</script>

<style scoped lang="scss"></style>