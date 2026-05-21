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
      <button @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ active: editor?.isActive('heading', { level: 1 }) }">
        H1
      </button>
      <button @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ active: editor?.isActive('heading', { level: 2 }) }">
        H2
      </button>
      <button @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ active: editor?.isActive('heading', { level: 3 }) }">
        H3
      </button>
      <button @click="editor?.chain().focus().toggleBulletList().run()"
        :class="{ active: editor?.isActive('bulletList') }">
        无序列表
      </button>
      <button @click="editor?.chain().focus().toggleOrderedList().run()"
        :class="{ active: editor?.isActive('orderedList') }">
        有序列表
      </button>
      <button @click="editor?.chain().focus().toggleCodeBlock().run()"
        :class="{ active: editor?.isActive('codeBlock') }">
        代码块
      </button>

      <button @click="editor?.chain().focus().toggleBlockquote().run()"
        :class="{ active: editor?.isActive('blockquote') }">
        引用
      </button>
      <button @click="editor?.chain().focus().toggleTaskList().run()" :class="{ active: editor?.isActive('taskList') }">
        任务列表
      </button>
      <button @click="handleImage">图片上传</button>

      <!-- 代码块语言下拉（选中代码块才显示） -->
      <select v-if="isCodeBlockActive" class="lang-select" :value="currentLang"
        @change="handleLanguageChange($event)">
        <option v-for="item in languageOptions" :key="item.value" :value="item.value">
          {{ item.label }}
        </option>
      </select>

      <!-- 复制按钮（选中代码块才显示） -->
      <button v-if="isCodeBlockActive" class="copy-btn" @click="handleCopyCode">
        复制代码
      </button>


    </div>

    <!-- 编辑器内容区域 -->
    <div class="editor-content-box">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, useTemplateRef, computed } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Extension } from '@tiptap/core'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Image from '@tiptap/extension-image'
// 🔥 代码高亮核心
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight } from 'lowlight'
// 导入需要高亮的语言
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'


// 1. 创建 lowlight 实例并注册语言
const lowlight = createLowlight()
lowlight.register({ javascript, typescript, css, xml, json })


// 支持 v-model
const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()


// 自定义 Tab 缩进扩展（标准官方写法，无任何类型错误）
const ListTabHandler = Extension.create({
  name: 'listTabHandler',

  addKeyboardShortcuts() {
    return {
      // Tab = 缩进（进入下一级列表）
      Tab: () => {
        if (this.editor.isActive('listItem')) {
          return this.editor.chain().focus().sinkListItem('listItem').run()
        }
        return false
      },

      // Shift + Tab = 取消缩进（返回上一级）
      'Shift-Tab': () => {
        if (this.editor.isActive('listItem')) {
          return this.editor.chain().focus().liftListItem('listItem').run()
        }
        return false
      },
    }
  },
})
// 初始化编辑器
const editor = useEditor({
  extensions: [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],

      },
      codeBlock: false, // 必须关闭自带，否则冲突
      listItem: {},
      bulletList: {},
      orderedList: {},
    }),
    Image.configure({
      allowBase64: false,
      HTMLAttributes: {
        class: 'tiptap-img',
      },
    }),
    // 👇 关键：添加 Tab 缩进逻辑
    ListTabHandler,
    TaskList,
    TaskItem.configure({
      nested: true, // 支持嵌套任务
    }),
    // 🔥 代码高亮扩展（支持多语言）
    CodeBlockLowlight.configure({
      lowlight,
      defaultLanguage: 'javascript',
      languageClassPrefix: 'language-',
      // 官方支持语言切换

    }),

  ],
  content: props.modelValue || '<p></p>',
  // 初始化后将光标放入编辑器
  autofocus: true,
  // 使文本可编辑（默认是 true）
  editable: true,
  // 防止加载默认的 CSS（反正也不多）
  injectCSS: false,
  onUpdate: ({ editor }) => {
    const html = editor.getHTML()
    emit('update:modelValue', html)
  },

});


// 语言切换
// 语言选项列表
const languageOptions = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'JSON', value: 'json' },

]
const isCodeBlockActive = computed(() => {
  return editor.value?.isActive('codeBlock') || false
})

const currentLang = computed(() => {
  return editor.value?.getAttributes('codeBlock').language || 'javascript'
})

const handleCodeBlock = () => {
  if (!editor.value) return
  editor.value.chain().focus().toggleCodeBlock().run()
}

const handleLanguageChange = (e:Event) => {
  let lang = (e.target as HTMLSelectElement).value
  if (!editor.value) return
  editor.value
    .chain()
    .focus()
    .updateAttributes('codeBlock', { language: lang })
    .run()
}

const handleCopyCode = async () => {
  if (!editor.value) return
  const code = editor.value.getAttributes('codeBlock').textContent || ''
  await navigator.clipboard.writeText(code)
  alert('复制成功！')
}


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

  :deep(.ProseMirror) {
    ol {
      list-style-type: decimal !important;
    }

    ol ol {
      list-style-type: lower-alpha !important;
    }

    ol ol ol {
      list-style-type: lower-roman !important;
    }

    ol ol ol ol {
      list-style-type: decimal !important;
    }

    ol ol ol ol ol {
      list-style-type: lower-alpha !important;
    }

    ol ol ol ol ol ol {
      list-style-type: lower-roman !important;
    }

    ul {
      list-style-type: disc !important;
    }

    ul ul {
      list-style-type: circle !important;
    }

    ul ul ul {
      list-style-type: square !important;
    }

    ul ul ul ul {
      list-style-type: "- " !important;
    }

    ul ul ul ul ul {
      list-style-type: disc !important;
    }

    ul ul ul ul ul ul {
      list-style-type: circle !important;
    }

    /* 基础缩进 */
    li {
      margin: 0.2em 0;
    }

    ul,
    ol {
      padding-left: 1.2em;
      margin: 0.3em 0;
    }
  }

  :deep(.ProseMirror) {

    // ✅ 任务列表样式（语雀风格）
    ul[data-type="taskList"] {
      list-style: none;
      padding-left: 0;

      li {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        margin: 4px 0;

        label {
          margin-top: 3px;
        }

        input[type="checkbox"] {
          width: 16px;
          height: 16px;
          cursor: pointer;
          accent-color: #00b42a; // 绿色勾选框，和你截图一样
        }

        &[data-checked="true"] {
          p {
            text-decoration: line-through;
            color: #999;
          }
        }
      }
    }
  }

  :deep(.ProseMirror) {

    /* 🔥 代码块高亮样式（语雀风格深色主题） */
    pre {
      background: #1e1e1e;
      color: #d4d4d4;
      border-radius: 6px;
      padding: 16px;
      overflow-x: auto;
      margin: 12px 0;
      position: relative;

      /* 右上角工具栏 */
      .code-block-toolbar {
        position: absolute;
        top: 8px;
        right: 8px;
        display: flex;
        gap: 8px;
        align-items: center;

        select {
          background: #2d2d2d;
          color: #d4d4d4;
          border: 1px solid #3c3c3c;
          border-radius: 4px;
          padding: 2px 4px;
          font-size: 12px;
          cursor: pointer;
        }

        button {
          background: #2d2d2d;
          color: #d4d4d4;
          border: 1px solid #3c3c3c;
          border-radius: 4px;
          padding: 2px 8px;
          font-size: 12px;
          cursor: pointer;
          transition: background 0.2s;

          &:hover {
            background: #3c3c3c;
          }
        }
      }

      /* 语言选择器样式 */
      &::before {
        content: attr(data-language);
        position: absolute;
        top: 8px;
        right: 12px;
        font-size: 12px;
        color: #858585;
        text-transform: uppercase;
      }

      code {
        display: block;
        color: inherit;
        padding: 0;
        background: transparent;
        font-size: 14px;
        line-height: 1.5;
        font-family: Consolas, 'Monaco', monospace;
      }
    }

    /* 不同语言的高亮颜色 */
    .hljs-keyword {
      color: #569cd6;
    }

    .hljs-string {
      color: #ce9178;
    }

    .hljs-number {
      color: #b5cea8;
    }

    .hljs-function {
      color: #dcdcaa;
    }

    .hljs-comment {
      color: #6a9955;
    }

    .hljs-variable {
      color: #9cdcfe;
    }

    /* 行内代码 */
    :not(pre)>code {
      background: #f5f5f5;
      color: #e53935;
      padding: 2px 4px;
      border-radius: 3px;
      font-size: 14px;
    }
  }

}
</style>