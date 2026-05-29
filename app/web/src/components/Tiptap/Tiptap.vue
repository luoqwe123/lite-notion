<template>
  <div class="tiptap-editor-wrapper ">

    <div class="preview" v-if="!editorState">{{ curDocContent }}</div>
    <template v-else>
      <!-- 工具栏 -->
      <div class="toolbar w-full">
        <Toolbal :editor="OEditor!" @image-upload="uploadImage" />

      </div>
      <!-- 编辑器内容区域 -->
      <div class="editor-content-box w-full">
        <textarea v-model="title" placeholder="请输入标题" class="title-textarea" name="title" :disabled="!editorState"
          @input="autoResizeTextarea"></textarea>
        <editor-content :editor="editor" ref="editorContentRef" draggable="false" />
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef, watch, } from 'vue'
import { EditorContent, } from '@tiptap/vue-3'
import Toolbal from "./Toolbar/index.vue"
import browserImageCompression from 'browser-image-compression'
import { useTiptapEditor } from './composables/useTiptapEditor'
import { useEditorStore } from '~/stores/modules/editor'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import * as Y from 'yjs';
import { fromUint8Array } from 'js-base64'
let editorStore = useEditorStore()
let { id, editorState } = storeToRefs(editorStore);
let curDocContent = ref<string>();

let title = defineModel<string>("title");
const editorContentRef = useTemplateRef<InstanceType<typeof EditorContent>>("editorContentRef");

// 支持 v-model
const props = defineProps<{
  modelValue: string,

}>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// WebP 比 JPG/PNG 体积小 30%~70%
// 画质几乎不变
// 现代浏览器 100% 支持

const IMG_CONFIG = {
  maxSizeMB: 10,
  allowTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  compress: {
    maxSizeMB: 2,   // 如果图片超过 2MB，库会自动压缩到 2MB 以内
    maxWidthOrHeight: 1600, // 图片宽度 > 1600px → 缩到 1600px  图片高度 > 1600px → 缩到 1600px    等比例缩放，不会变形
    useWebp: true,  // 把图片统一转成 WebP 格式
    webpQuality: 0.8,  // WebP 图片质量（0 ~ 1）  肉眼看不出区别，但体积小非常多。
  },
}

// 上传逻辑：本地预览 → 上传 → 替换URL
const uploadImage = async (file: File) => {
  try {
    if (!IMG_CONFIG.allowTypes.includes(file.type)) return alert('仅支持 jpg/png/gif/webp')
    if (file.size / 1024 / 1024 > IMG_CONFIG.maxSizeMB) return alert(`最大 ${IMG_CONFIG.maxSizeMB}MB`)

    const compressed = await browserImageCompression(file, IMG_CONFIG.compress)
    const tempUrl = URL.createObjectURL(compressed)
    console.log(tempUrl)

    // 插入本地预览
    OEditor.value?.chain().focus().setImage({ src: tempUrl, width: 800 }).run()

    // 模拟上传（替换成你的接口）
    // const realUrl = await new Promise<string>(resolve => {
    //   setTimeout(() => resolve(tempUrl), 800)
    // })

    // // 替换真实地址
    // editor.value?.chain().focus().updateAttributes('image', { withDefaults: 800 }).run()
    // URL.revokeObjectURL(tempUrl)
  } catch (err) {
    console.log(err)
    ElMessage.error("上传失败")

  }
}
const OEditor = ref<any>()
// watch(editorState, (val) => {
//   console.log(val)
//   if (val) {

//   }
// },{
//   immediate:true
// })

const { editor, ydoc, loadYjsDocument } = useTiptapEditor(
  {

    initialContent: curDocContent.value,
  }
)

// console.log(editor)
watch(editor, async (val) => {
  // console.log(val)
  let data = await editorStore.findOne(id.value);
  curDocContent.value = data.data.content;
  loadYjsDocument(curDocContent.value!)
  let saveTimer: number | null = null

  // Y.Doc 每次变更触发
  ydoc.on('update', async () => {
    if (saveTimer) clearTimeout(saveTimer)

    saveTimer = window.setTimeout(async () => {
      // 导出完整文档二进制
      const fullBinary = Y.encodeStateAsUpdate(ydoc)
      // Uint8Array 转 Base64（方便网络传输、数据库存储）
      const base64Str = fromUint8Array(fullBinary)
      let data = {
        content: base64Str,
        id: id.value
      }
      
      // 调用后端保存接口
      let res =  await editorStore.saveDoc(data)
      console.log(res)
    }, 2000)
  })

}, {
  once: true
})





// 监听外部 v-model 变化
// watch(
//   () => props.modelValue,
//   (val) => {
//     if (val !== editor.value?.getHTML()) {
//       setContent(val || '<p></p>')
//     }
//   }
// )

const autoResizeTextarea = (e: Event) => {
  const textarea = e.target as HTMLTextAreaElement
  textarea.style.height = '0'
  textarea.style.height = textarea.scrollHeight + 'px'
}



// 5. 监听粘贴（截图/图片）

const handlePaste = async (e: ClipboardEvent) => {
  const items = e.clipboardData?.items
  if (!items) return

  for (const item of items) {
    if (item.kind === 'file' && item.type.startsWith('image/')) {
      const file = item.getAsFile()
      if (file) {
        e.preventDefault()
        await uploadImage(file)
        break
      }
    }
  }
}


// 6. 监听拖拽上传

const handleDrop = async (e: DragEvent) => {
  e.preventDefault()
  const files = e.dataTransfer?.files
  if (!files) return

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (file.type.startsWith('image/')) {
      await uploadImage(file)
    }
  }
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
}


// 一进来就初始化高度
onMounted(async () => {
  const textarea = document.querySelector('.title-textarea') as HTMLTextAreaElement
  if (textarea) {
    textarea.style.height = '0'
    textarea.style.height = textarea.scrollHeight + 'px'
  }
  const el = editorContentRef.value?.rootEl as HTMLElement;
  if (!el) return

  el.addEventListener('paste', handlePaste)
  el.addEventListener('drop', handleDrop)
  el.addEventListener('dragover', handleDragOver)
  // 关键：禁止编辑器内部内容被拖拽
  el.addEventListener('dragstart', (e) => {
    e.preventDefault()
  })
})
onBeforeUnmount(() => {
  const el = editorContentRef.value?.rootEl as HTMLElement | null
  if (!el) return

  el.removeEventListener('paste', handlePaste)
  el.removeEventListener('drop', handleDrop)
  el.removeEventListener('dragover', handleDragOver)
  el.removeEventListener('dragstart', (e) => e.preventDefault())
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