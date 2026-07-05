import StarterKit from '@tiptap/starter-kit'
import { Extension } from '@tiptap/core'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { VueNodeViewRenderer } from '@tiptap/vue-3'
import { createLowlight } from 'lowlight'
import Image from '@tiptap/extension-image'
import Resizable from "tiptap-extension-resizable";
// 导入语言
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import json from 'highlight.js/lib/languages/json';
import { IndexeddbPersistence } from 'y-indexeddb'

import { WebsocketProvider } from "y-websocket"
import * as Y from 'yjs'

import { toUint8Array } from 'js-base64'



// import { CollaborationCursor } from '@tiptap/extension-collaboration-cursor'
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
// provider 真正就绪的标志（必须等这两个）
// provider.wsconnected === true（WebSocket 握手完成）
// provider.synced === true（和服务端同步完成）

export function getYandProvider(docId: string) {
  const ydoc = new Y.Doc()

  function loadYjsDocument(data: string) {
    if (data.length) Y.applyUpdate(ydoc, toUint8Array(data))
  }
  const roomName = 'abc'
  const persistence = new IndexeddbPersistence(roomName, ydoc)
  persistence.once('synced', () => { console.log('initial content loaded') })
  // 2. 连接后端 websocket  
  // y-websocket 源码写死了心跳保活时间 30s
  const provider = new WebsocketProvider('ws://localhost:3000/document', `doc-${docId}`, ydoc, {
    connect: true,
    params: {
      // teamId: "6",
      docId
    }
  })


  // provider.on("status", (event) => {
  //   console.log("staus", event.status)
  //   console.log(provider)
  // })




  return {
    ydoc,
    provider,
    loadYjsDocument
  }
}



// 所有扩展配置
export const getExtensions = () => {

  return [
    StarterKit.configure({
      heading: { levels: [1, 2, 3] },
      codeBlock: false, // 使用自定义代码块
      listItem: {},
      bulletList: {},
      orderedList: {},
      undoRedo: false,
    }),
    // 只使用 ImageResize，不要同时配置 Image 扩展

    // CustomImageResize.configure({
    //   minWidth: 100,
    //   maxWidth: 800
    // }),
    Image.configure({
      allowBase64: false,
      HTMLAttributes: { class: 'tiptap-img' },
    }),
    Resizable.configure({
      types: ["image", "video"], // resizable type
      handlerStyle: { // handler point style
        width: "6px",
        height: "6px",
        background: "#07c160",
      },
      layerStyle: { // layer mask style
        border: "1px solid #07c160",
      },
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


}