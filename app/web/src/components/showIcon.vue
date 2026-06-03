<template>
    <div class="showIcon-container">
        <svg  class="h-5 w-5">
            <use :xlink:href="iconname" :fill="fill" class="w-5 h-5"></use>
        </svg>
    </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue';


const props = withDefaults(defineProps<{
    prefix?: string,
    name:string,
    fill:string
}>(),{
    prefix:"#icon",

    
})
const iconname = computed(()=> props.prefix+'-'+props.name)

</script>

<style scoped lang="scss">

</style >