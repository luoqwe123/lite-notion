import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path';
import tailwindcss from "@tailwindcss/vite";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { visualizer } from "rollup-plugin-visualizer"
import { compression } from 'vite-plugin-compression2'

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        AutoImport({
            // 关键配置：自动引入ElMessage等API的css
            resolvers: [ElementPlusResolver({ importStyle: 'css' })],
            dts: 'src/types/auto-import.d.ts' //生成ts类型，消除找不到ElMessage报错
        }),
        Components({
            resolvers: [ElementPlusResolver({ importStyle: 'css' })]
        }),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icon')],
            symbolId: 'icon-[dir]-[name]',
        }),
        visualizer({
            open: true, //打包自动打开分析页面
            gzipSize: true,
            brotliSize: true,

        }),
        compression({
            algorithms: ['gzip', 'brotliCompress'], //brotli比gzip更小15~20%
            threshold: 1024, //大于1kb才压缩
            deleteOriginalAssets: false //保留原文件
        })
    ],

    resolve: {
        alias: {
            "~": path.resolve(__dirname, "./src"),
            "~assets": path.resolve(__dirname, "./src/assets")
        }
    },
    // 1. 优化依赖预构建（强制预构建，避免动态导入扫描） 优化冷启动、热更新
    optimizeDeps: {
        include: [
            'vue',
            'vue-router',
            'pinia',
            // '@tiptap/core',        // Tiptap 核心
            // '@tiptap/vue-3',       // Vue 集成
            // '@tiptap/starter-kit', // 基础扩展集

            // 在这里列出你的核心依赖，让 vite 提前预构建
        ],
        exclude: [], // 排除不需要预构建的依赖

    },

    // 2. 限制 Vite 的文件扫描范围（关键！）
    server: {

        watch: {
            ignored: [
                '**/node_modules/**',
                '**/.git/**',
                '**/dist/**',
                '**/.vscode/**',
                '**/.idea/**',
                '**/node_modules/.vite/**',
            ],
        },
    },

    build: {
        cssCodeSplit: true, //css自动拆分，禁用全打包css
        chunkSizeWarningLimit: 1500, //chunk警告阈值KB
        terserOptions: {
            compress: {
                drop_console: true, //删除console，线上瘦身
                drop_debugger: true
            }
        },
        minify: "terser",
        rollupOptions: {
            treeshake: true,
            output: {
                //自定义打包输出路径，分类存放资源
                entryFileNames: 'js/[name]-[hash].js',
                chunkFileNames: 'js/[name]-[hash].js',
                assetFileNames: (info) => {

                    if (info.name?.endsWith('.css')) {
                        // console.log("info",info)
                        return 'css/[name]-[hash].css'
                    }
                    if (/png|jpg|svg|webp/.test(info.name || '')) return 'img/[name]-[hash][extname]'
                    return 'other/[name]-[hash][extname]'
                },
                manualChunks(id) {
                    // vue全家桶
                    if (id.includes('node_modules/vue') || id.includes('node_modules/vue-router') || id.includes('node_modules/pinia')) {
                        return 'vue'
                    }
                    // UI库
                    if (id.includes('node_modules/element-plus')) {
                        return 'ui'
                    }
                    // Tiptap 编辑器相关（最大的一个独立 chunk）
                    if (id.includes('node_modules/@tiptap')) {
                        return 'tiptap'
                    }
                    // 语法高亮（大体积，极少变化）
                    if (id.includes('node_modules/lowlight') || id.includes('node_modules/highlight.js')) {
                        return 'highlight'
                    }
                    // Yjs 协作相关
                    if (id.includes('node_modules/yjs') || id.includes('node_modules/y-')) {
                        return 'collab'
                    }
                    // 图片压缩库
                    if (id.includes('node_modules/browser-image-compression')) {
                        return 'img-compress'
                    }

                }
            }
        }
    }

})