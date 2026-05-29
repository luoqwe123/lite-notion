import { ref, watch, onBeforeUnmount, reactive } from 'vue'
import { useEditor } from '@tiptap/vue-3'
import { getExtensions, getYandProvider } from './useExtensions'
import { Collaboration } from '@tiptap/extension-collaboration'
import CollaborationCaret from '@tiptap/extension-collaboration-caret'

import { useEditorStore } from '~/stores/modules/editor'

let editorStore = useEditorStore();
interface UseTiptapEditorOptions {
  initialContent?: string

}

export function useTiptapEditor(options?: UseTiptapEditorOptions) {
  const { initialContent = "", } = options!;
  const { ydoc, provider, loadYjsDocument } = getYandProvider();


  const editor =useEditor({
        extensions: [
          ...getExtensions(),
          Collaboration.configure({
            document: ydoc,
          }),
          CollaborationCaret.configure({
            provider,
            user: {
              name: '用户' + Math.random().toString(36).slice(2, 6),
              color: '#' + Math.floor(Math.random() * 16777215).toString(16),
            },
          }),
        ],
        // content: initialContent,
        autofocus: true,
        editable: editorStore.editorState,
        injectCSS: false,

      })
      

  // 清理
  onBeforeUnmount(() => {
    editor.value?.destroy()
    provider.destroy()
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
    // setContent,
    getContent,
  }
}