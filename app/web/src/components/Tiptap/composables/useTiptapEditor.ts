import { ref, watch, onBeforeUnmount, reactive } from 'vue'
import { useEditor } from '@tiptap/vue-3'
import { getExtensions, getYandProvider } from './useExtensions'
import { Collaboration } from '@tiptap/extension-collaboration'
import CollaborationCaret from '@tiptap/extension-collaboration-caret'
import { useColorHash } from '~/composables/useHashColor'
import { useEditorStore } from '~/stores/modules/editor'

let editorStore = useEditorStore();
interface UseTiptapEditorOptions {
  initialContent?: string

}

export function useTiptapEditor() {
  // const { initialContent = "", } = options!;
  const docId = editorStore.id;
  const { ydoc, provider, loadYjsDocument } = getYandProvider(docId);


  const editor = useEditor({
    extensions: [
      ...getExtensions(),
      Collaboration.configure({
        document: ydoc,
      }),
      CollaborationCaret.configure({
        provider,
        user: {
          name: '用户' + Math.random().toString(36).slice(2, 6),
          color: useColorHash().hex(docId),
        },
       
      }),
    ],
    // content: initialContent,
    autofocus: true,
    editable: editorStore.editorState,
    injectCSS: false,

  })
  // 当浏览器窗口关闭或者刷新时，会触发 beforeunload 事件
  window.addEventListener('beforeunload', () => {
    provider.awareness.setLocalState(null)
  })
  // 清理
  onBeforeUnmount(() => {

  })

  // 设置内容
  // const setContent = (content: string) => {
  //   editor.value?.commands.setContent(content || '<p></p>')
  // }

  // 获取内容
  const getContent = () => {
    return editor.value?.getHTML() || ''
  }

  return {
    editor,
    ydoc,
    loadYjsDocument,
    provider,
    // setContent,
    getContent,
  }
}