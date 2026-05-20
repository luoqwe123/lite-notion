<template>
  <div class="tiptap-editor-wrapper">
    <!-- 工具栏 -->
    <div class="toolbar">
      <button @click="editor?.chain().focus().toggleBold().run()" :class="{ active: editor?.isActive('bold') }">
        粗体
      </button>
      <button @click="editor?.chain().focus().toggleItalic().run()" :class="{ active: editor?.isActive('italic') }">
        斜体
      </button>
      <button @click="editor?.chain().focus().toggleStrike().run()" :class="{ active: editor?.isActive('strike') }">
        删除线
      </button>
      <button @click="editor?.chain().focus().toggleCode().run()" :class="{ active: editor?.isActive('code') }">
        行内代码
      </button>
      <button @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ active: editor?.isActive('heading', { level: 1 }) }">
        H1
      </button>
      <button @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ active: editor?.isActive('heading', { level: 2 }) }">
        H2
      </button>
      <button @click="editor?.chain().focus().toggleBulletList().run()" :class="{ active: editor?.isActive('bulletList') }">
        无序列表
      </button>
      <button @click="editor?.chain().focus().toggleOrderedList().run()" :class="{ active: editor?.isActive('orderedList') }">
        有序列表
      </button>
      <button @click="editor?.chain().focus().toggleCodeBlock().run()" :class="{ active: editor?.isActive('codeBlock') }">
        代码块
      </button>
      <button @click="editor?.chain().focus().toggleBlockquote().run()" :class="{ active: editor?.isActive('blockquote') }">
        引用
      </button>
      <button @click="handleImage">图片上传</button>
    </div>

    <!-- 编辑器内容区域 -->
    <div class="editor-content-box">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

// 支持 v-model
const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// 初始化编辑器
const editor = useEditor({
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },
    }),
    Image.configure({
      allowBase64: false,
      HTMLAttributes: {
        class: 'tiptap-img',
      },
    }),
  ],
  content: props.modelValue || '<p></p>',
  onUpdate: ({ editor }) => {
    const html = editor.getHTML()
    emit('update:modelValue', html)
  },
});

// 监听外部 v-model 变化
watch(
  () => props.modelValue,
  (val) => {
    if (val !== editor.value?.getHTML()) {
      editor.value?.commands.setContent(val || '<p></p>')
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

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style lang="scss" scoped>
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

  :deep(.ProseMirror) {
    outline: none;
    min-height: 260px;

    img {
      max-width: 100%;
      height: auto;
      margin: 8px 0;
      border-radius: 4px;
    }

    p {
      line-height: 1.6;
    }

    h1,
    h2,
    h3 {
      margin: 12px 0 8px;
      font-weight: 600;
    }

    blockquote {
      border-left: 3px solid #eee;
      padding-left: 12px;
      color: #666;
      margin: 12px 0;
    }

    pre {
      background: #f5f5f5;
      padding: 12px;
      border-radius: 4px;
      overflow-x: auto;
    }
  }
}
</style>