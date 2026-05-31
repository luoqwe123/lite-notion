<template>
    <!-- 全屏蒙层 -->
    <!-- <div v-if="visible" class="hello-mask"> -->
    <div class="ShowEditor-container absolute top-1/2 right-10 -translate-y-1/2 z-10 border border-gray-200 bg-white rounded-lg shadow-sm p-3"
        draggable="true" ref="editorListRef">
        <div class="editorList grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[160px] overflow-y-auto pr-1">
            <div class="editorItem px-4 py-3 w-30 bg-gray-50 rounded-lg border border-gray-200"
                v-for="item in editorList" :key="item.id">
                {{ item.name }}
            </div>

        </div>
    </div>
    <!-- </div> -->
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import type { editorsType } from './type.js'

const editorListRef = useTemplateRef("editorListRef");

const props = defineProps<{
    editors: editorsType[] | any
}>()

// props 里的ref不能自动解包
const editorList = computed(() => {
    return props.editors.value
})

const bodyWidth = document.body.clientWidth;


// function handleDragend(e: DragEvent) {
//     e.preventDefault();
//     e.stopPropagation()
//     const target = e.target as HTMLDivElement

//     //    元素自身宽高
//     // const { width, height } = target.getBoundingClientRect()

//     if (!target.style.right) target.style.right = ""

//     target.style.right = `${bodyWidth - e.clientX }px`
//     target.style.top = `${e.clientY}px`
// }
// 记录拖拽偏移
let offsetX = 0
let offsetY = 0

function handleDrag(e: DragEvent) {
    e.preventDefault()
    let target = e.target as HTMLDivElement
    // 4. 用鼠标位置减去偏移，得到元素的新位置
    const newLeft = e.clientX - offsetX
    const newTop = e.clientY - offsetY

    target.style.right = `${bodyWidth- newLeft}px`
    target.style.top = `${newTop}px`
}


onMounted(() => {

    editorListRef.value?.addEventListener("drag",handleDrag)
    editorListRef.value?.addEventListener("dragend", handleDrag)
})

onUnmounted(()=>{
    editorListRef.value?.removeEventListener("drag",handleDrag)
})
// 暴露方法给外部调用
// const show = (msg = '你好') => {
//   message.value = msg
//   visible.value = true
// }

// const hide = () => {
//   visible.value = false
// }

// // 把方法暴露出去
// defineExpose({ show, hide })
</script>

<style scoped lang="scss"></style>