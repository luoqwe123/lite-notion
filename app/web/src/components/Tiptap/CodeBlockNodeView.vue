<script setup lang="ts">
import { computed, h } from 'vue'
import { NodeViewWrapper, NodeViewContent, nodeViewProps } from '@tiptap/vue-3'
import { ElMessage }  from  "element-plus"

const props = defineProps(nodeViewProps)

const languages = [
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'HTML', value: 'xml' },
    { label: 'CSS', value: 'css' },
    { label: 'JSON', value: 'json' },
]

const selectedLanguage = computed({
    get: () => props.node.attrs.language || 'javascript',
    set: (lang) => {
        props.updateAttributes({ language: lang })
    }
})

const copyCode = () => {
    const code = props.node.textContent || ''
    navigator.clipboard.writeText(code)
    ElMessage({
        message:"代码已复制！",
        type:"success"
    })
    
}
</script>

<template>
    <NodeViewWrapper class="code-block-wrapper">
        <!-- 复制按钮 - 右上角 -->
        <button class="code-copy-btn" @click="copyCode">
            复制
        </button>

        <!-- 代码内容 -->
        <pre>
      <NodeViewContent
        as="code"
        :class="`language-${selectedLanguage}`"
        :data-language="selectedLanguage"
      />
    </pre>

        <!-- 语言选择 - 右下角 -->
        <div class="code-lang-selector">
            <select v-model="selectedLanguage">
                <option v-for="lang in languages" :key="lang.value" :value="lang.value">
                    {{ lang.label }}
                </option>
            </select>
        </div>
    </NodeViewWrapper>
</template>

<style scoped lang="scss">
@use "./style/highlight.scss";

/* 🔥 代码块 wrapper */
.code-block-wrapper {
    position: relative;
    background: #e0e0e0;
    border-radius: 6px;
    padding: 16px;
    // margin: 12px 0;

    /* 复制按钮 - 右上角 */
    .code-copy-btn {
        position: absolute;
        top: 6px;
        right: 6px;
        background: transparent;
        color: #666;
        border: none;
        font-size: 13px;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;
        transition: all 0.2s;

        &:hover {
            color: #333;
            background: rgba(0, 0, 0, 0.05);
        }
    }

    /* 语言选择器 - 右下角 */
    .code-lang-selector {
        position: absolute;
        bottom: 6px;
        right: 6px;

        select {
            background: transparent;
            color: #999;
            border: none;
            font-size: 12px;
            cursor: pointer;
            padding: 2px 4px;
            outline: none;
            appearance: none;
            -webkit-appearance: none;

            &:hover {
                color: #666;
            }

            option {
                color: #333;
            }
        }
    }

    pre {
        display: block;
        background: transparent;
        padding: 0;
        margin: 0;
        overflow-x: auto;
        color: #2d2d2d;
        height: auto;
        line-height: 0px;
        scrollbar-width: none;

        code {
            display: block;
            color: inherit;
            padding: 0;
            background: transparent;
            font-size: 14px;
            line-height: 1.6;
            font-family: Consolas, 'Monaco', monospace;
        }
    }
}


/* 行内代码 */
:not(pre)>code {
    background: #f5f5f5;
    color: #e53935;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 14px;
}
</style>