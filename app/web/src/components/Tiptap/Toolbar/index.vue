<template>
  <div class="editor-toolbar w-full">
    <!--清除样式-->
    <div class="toolbar-group">
      
      <button v-for="item in clearItems" :key="item.label" 
        @click="item.action">
        {{ item.label }}
      </button>
      <div class="toolbar-divider" />
    </div>
    <!-- 基础格式 -->
    <div class="toolbar-group">
      
      <button v-for="item in toolbarItems" :key="item.name" :class="{ active: isActive(item.name) }"
        @click="item.action">
        {{ item.label }}
      </button>
      <div class="toolbar-divider" />
    </div>



    <!-- 标题 -->
    <div class="toolbar-group">
      <button v-for="item in headingItems" :key="item.level"
        :class="{ active: isActive('heading', { level: item.level }) }"
        @click="() => props.editor?.chain().focus().toggleHeading({ level: item.level as 1 | 2 | 3 }).run()">
        {{ item.label }}
      </button>
      <div class="toolbar-divider" />
    </div>



    <!-- 列表 -->
    <div class="toolbar-group">
      <button v-for="item in listItems" :key="item.name" :class="{ active: isActive(item.name) }" @click="item.action">
        {{ item.label }}
      </button>
      <div class="toolbar-divider" />
    </div>



    <!-- 块级元素 -->
    <div class="toolbar-group">
      <button v-for="item in blockItems" :key="item.name" :class="{ active: isActive(item.name) }" @click="item.action">
        {{ item.label }}
      </button>
      <div class="toolbar-divider" />
    </div>



    <!-- 图片 -->
    <input ref="fileInputRef" type="file" accept="image/*" style="display: none" @change="handleFileSelect" />
    <div class="toolbar-group">
      <button @click="handleUpdateFile">
        图片上传
      </button>
    </div>
  </div>
</template>


<script setup lang="ts">
import type { Editor } from '@tiptap/core'
import { useTemplateRef } from 'vue';

interface Props {
  editor: Editor | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  imageUpload: [File: File]
}>()

const fileInputRef = useTemplateRef("fileInputRef");
const handleUpdateFile = () => {
  fileInputRef.value?.click()
}

const handleFileSelect = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  emit("imageUpload", file)
}
const toolbarItems = [
  { name: 'bold', label: '粗体', action: () => props.editor?.chain().focus().toggleBold().run() },
  { name: 'italic', label: '斜体', action: () => props.editor?.chain().focus().toggleItalic().run() },
  { name: 'strike', label: '删除线', action: () => props.editor?.chain().focus().toggleStrike().run() },
  { name: 'code', label: '行内代码', action: () => props.editor?.chain().focus().toggleCode().run() },
]

const headingItems = [
  { level: 1 as const, label: 'H1' },
  { level: 2 as const, label: 'H2' },
  { level: 3 as const, label: 'H3' },
]

const listItems = [
  { name: 'bulletList', label: '无序列表', action: () => props.editor?.chain().focus().toggleBulletList().run() },
  { name: 'orderedList', label: '有序列表', action: () => props.editor?.chain().focus().toggleOrderedList().run() },
]

const blockItems = [
  { name: 'codeBlock', label: '代码块', action: () => props.editor?.chain().focus().toggleCodeBlock().run() },
  { name: 'blockquote', label: '引用', action: () => props.editor?.chain().focus().toggleBlockquote().run() },
  { name: 'taskList', label: '任务列表', action: () => props.editor?.chain().focus().toggleTaskList().run() },
]
const clearItems = [
  { label:"清除格式" ,action:()=> props.editor?.chain().focus().unsetAllMarks().run()}  // 清除所有「行内样式」（加粗、斜体、颜色、链接等）
]
const isActive = (name: string, options?: Record<string, any>) => {
  return props.editor?.isActive(name, options) || false
}
</script>

<style scoped lang="scss">
.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  padding: 8px 12px;
  justify-content: left;
  background: var(--toolbar-bg);
  //   border-bottom: 1px solid var(--toolbar-border);
}

.toolbar-group {
  display: flex;
  gap: 4px;
}

.toolbar-divider {
  width: 1px;
  background: var(--toolbar-divider, #ddd);
  margin: 0 4px;
}

button {
  padding: 4px 8px;
  border: 1px solid var(--btn-border, #ddd);
  border-radius: 4px;
  background: var(--btn-bg, #fff);
  color: var(--btn-color, #333);
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;

  &:hover {
    background: var(--btn-hover-bg, #f0f0f0);
  }

  &.active {
    background: var(--btn-active-bg, #e8f3ff);
    color: var(--btn-active-color, #1677ff);
    border-color: var(--btn-active-border, #1677ff);
  }
}
</style>