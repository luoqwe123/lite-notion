import StarterKit from '@tiptap/starter-kit'
import { Extension } from '@tiptap/core'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Image from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { createLowlight } from 'lowlight'

// 导入语言
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json'

// 导入 NodeView 组件
import CodeBlockNodeView from '../CodeBlockNodeView.vue'

// 创建 lowlight 实例
export const lowlight = createLowlight()
lowlight.register({ javascript, typescript, css, xml, json })

// 自定义 Tab 缩进扩展
export const ListTabHandler = Extension.create({
  name: 'listTabHandler',

  addKeyboardShortcuts() {
    return {
      Tab: () => {
        if (this.editor.isActive('listItem')) {
          return this.editor.chain().focus().sinkListItem('listItem').run()
        }
        return false
      },
      'Shift-Tab': () => {
        if (this.editor.isActive('listItem')) {
          return this.editor.chain().focus().liftListItem('listItem').run()
        }
        return false
      },
    }
  },
})

// 自定义代码块扩展
export const CustomCodeBlock = CodeBlockLowlight.extend({
  addNodeView() {
    return VueNodeViewRenderer(CodeBlockNodeView)
  },
})

// 所有扩展配置
export const getExtensions = () => [
  StarterKit.configure({
    heading: { levels: [1, 2, 3] },
    codeBlock: false, // 使用自定义代码块
    listItem: {},
    bulletList: {},
    orderedList: {},
  }),
  Image.configure({
    allowBase64: false,
    HTMLAttributes: { class: 'tiptap-img' },
  }),
  ListTabHandler,
  TaskList,
  TaskItem.configure({ nested: true }),
  CustomCodeBlock.configure({
    lowlight,
    defaultLanguage: 'javascript',
    languageClassPrefix: 'language-',
  }),
]