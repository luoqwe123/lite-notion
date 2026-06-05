import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path';
import tailwindcss from "@tailwindcss/vite";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { visualizer } from "rollup-plugin-visualizer"

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

        })
    ],

    resolve: {
        alias: {
            "~": path.resolve(__dirname, "./src"),
            "~assets": path.resolve(__dirname, "./src/assets")
        }
    },
    // 1. 优化依赖预构建（强制预构建，避免动态导入扫描）
    optimizeDeps: {
        include: [
            'vue',
            'vue-router',
            'pinia',
            // 在这里列出你的核心依赖，让 vite 提前预构建
        ],
        exclude: [], // 排除不需要预构建的依赖
        esbuildOptions: {
            sourcemap: true,
        },
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

                }
            }
        }
    }

})