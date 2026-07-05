<template>
    <div class="Document-container bg-white">
        <tiptap v-model="document.content" v-model:title="document.title"   class="w-full h-auto min-h-screen" />
    </div>
</template>

<script setup lang='ts'>
import { defineAsyncComponent, reactive, ref, watch } from 'vue'
// import { TiptapEditor } from '~/components/Tiptap/index'
import { useRoute } from 'vue-router';
import { useEditorStore } from '~/stores/modules/editor'; 
const tiptap = defineAsyncComponent(()=>import("~/components/Tiptap/Tiptap.vue"))
const editorStore = useEditorStore();
const props = defineProps({
    id:String
})
const route = useRoute()
console.log(route.params.docId)
editorStore.setCurrDocId(route.params.docId as string)

const document = reactive({
    title:"niah",
    content:`<p>欢迎使用富文本编辑器～</p>`
})
// watch(document,(val)=>{
//     console.log("val",val)
// },{
//     deep:true
// })
</script>

<style lang="scss" scoped></style>