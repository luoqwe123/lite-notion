import { ref, watch, onBeforeUnmount } from 'vue'
import { useEditor } from '@tiptap/vue-3'
import { getExtensions } from './useExtensions'

interface UseTiptapEditorOptions {
  initialContent?: string
  onUpdate?: (html: string) => void
}

export function useTiptapEditor(options: UseTiptapEditorOptions = {}) {
  const { initialContent = '<p></p>', onUpdate } = options

  const editor = useEditor({
    extensions: getExtensions(),
    content: initialContent,
    autofocus: true,
    editable: true,
    injectCSS: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onUpdate?.(html)
    },
  })

  // 清理
  onBeforeUnmount(() => {
    editor.value?.destroy()
  })

  // 设置内容
  const setContent = (content: string) => {
    editor.value?.commands.setContent(content || '<p></p>')
  }

  // 获取内容
  const getContent = () => {
    return editor.value?.getHTML() || ''
  }

  return {
    editor,
    setContent,
    getContent,
  }
}