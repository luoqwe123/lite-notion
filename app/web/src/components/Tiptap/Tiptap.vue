<template>
  <div class="tiptap-editor-wrapper ">
    <!-- 工具栏 -->
    <div class="toolbar w-full">
      <Toolbal :editor="editor!" @image-upload="handleImage" />

    </div>



    <!-- 编辑器内容区域 -->
    <div class="editor-content-box w-full">
      <textarea v-model="title" placeholder="请输入标题" class="title-textarea" name="title"
        @input="autoResizeTextarea"></textarea>
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, } from 'vue'
import { EditorContent, } from '@tiptap/vue-3'
import Toolbal from "./Toolbar/index.vue"

import { useTiptapEditor } from './composables/useTiptapEditor'

let title = defineModel<string>("title")
console.log(title.value)
// 支持 v-model
const props = defineProps<{
  modelValue: string,

}>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()



const { editor, setContent } = useTiptapEditor({
  initialContent: props.modelValue,
  onUpdate: (html) => {
    emit('update:modelValue', html)
  },
})

// 监听外部 v-model 变化
watch(
  () => props.modelValue,
  (val) => {
    if (val !== editor.value?.getHTML()) {
      setContent(val || '<p></p>')
    }
  }
)

// 图片上传（模拟，可对接后端）
const handleImage = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = async (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    // 这里可以上传到后端拿到 url
    const url = URL.createObjectURL(file)

    // 插入图片
    editor.value?.chain().focus().setImage({ src: url }).run()
  }
  input.click()
}
const autoResizeTextarea = (e: Event) => {
  const textarea = e.target as HTMLTextAreaElement
  textarea.style.height = '0'
  textarea.style.height = textarea.scrollHeight + 'px'
}

// 一进来就初始化高度
onMounted(() => {
  const textarea = document.querySelector('.title-textarea') as HTMLTextAreaElement
  if (textarea) {
    textarea.style.height = '0'
    textarea.style.height = textarea.scrollHeight + 'px'
  }
})

</script>

<style lang="scss" scoped>
@use "./style//editor.scss";

.tiptap-editor-wrapper {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 8px 12px;
  background: #fafafa;
  border-bottom: 1px solid #eee;

  button {
    padding: 4px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;

    &.active {
      background: #e8f3ff;
      color: #1677ff;
      border-color: #1677ff;
    }
  }
}

.editor-content-box {
  padding: 16px;
  min-height: 300px;

  .title-textarea {
    width: 100%;
    font-size: 36px;
    font-weight: 700;
    border: none;
    /* 去掉边框 */
    outline: none;
    /* 去掉聚焦高亮 */
    resize: none;
    /* 禁止拖动大小 */
    height: auto;
    padding: 0;
    margin-bottom: 10px;
    line-height: 1.2;
    overflow: hidden;
  }

  /* 可选：隐藏滚动条 */
  .title-textarea::-webkit-scrollbar {
    display: none;
  }


}
</style>