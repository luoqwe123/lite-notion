import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from 'path';
import tailwindcss from "@tailwindcss/vite";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icon')],
            symbolId: 'icon-[dir]-[name]',
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

})