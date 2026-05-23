import StarterKit from '@tiptap/starter-kit'
import { Extension } from '@tiptap/core'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import ImageResize from 'tiptap-extension-resize-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { createLowlight } from 'lowlight'
import Image from '@tiptap/extension-image'

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
const CustomImageResize = ImageResize.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: 'tiptap-img',
      },
      width: {
        default: 800, // 👈 你要的默认宽度
        parseHTML: el => el.getAttribute('width') || 800,
        renderHTML: attrs => ({ width: attrs.width }),
      },
    }
  },
  parseHTML() {
    return [
      {
        tag: 'img[src]',
        getAttrs: (dom) => {
          // 允许 base64
          const src = dom.getAttribute('src')
          if (src?.startsWith('data:image/')) {
            return { src, class: 'tiptap-img' }
          }
          return { src, class: 'tiptap-img' }
        },
      },
    ]
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
  // 只使用 ImageResize，不要同时配置 Image 扩展

  CustomImageResize.configure({
    minWidth: 100,
    maxWidth: 1600,


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