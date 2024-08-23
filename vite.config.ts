import {fileURLToPath, URL} from 'node:url'

import vue from '@vitejs/plugin-vue'
import {defineConfig, loadEnv} from 'vite'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import {createSvgIconsPlugin} from "vite-plugin-svg-icons";

import vueDevTools from 'vite-plugin-vue-devtools'
import mockDevServerPlugin from "vite-plugin-mock-dev-server";

import UnoCSS from 'unocss/vite'
import {name, version, author} from "./package.json";
import {resolve} from "path";

const pathSrc = resolve(__dirname, "src");

//应用的信息
const __APP_INFO__ = {
    pkg: {
        "name": name,
        "version": version,
        "authorName": author.name,
        "authorUrl": author.url,
    },
};

//配置说明：https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd())
    return {
        // 插件配置
        plugins: [
            vue(),
            UnoCSS(),
            vueDevTools(),
            // element-plus按需导入:https://cn.element-plus.org/zh-CN/guide/quickstart.html
            AutoImport({
                imports: ["vue", "vue-router", "pinia", "vue-i18n", "@vueuse/core"],//自动导入Vue相关函数，如：ref, reactive等等
                resolvers: [
                    ElementPlusResolver(),//自动导入ElementPlus相关函数
                    IconsResolver({}),//自动导入图标组件
                ],

                //dts: false,
                dts: "src/types/auto-imports.d.ts",
            }),
            Components({
                resolvers: [
                    ElementPlusResolver(),//自动导入ElementPlus组件

                    IconsResolver({//自动注册图标组件
                        enabledCollections: ["ep"],//element-plus图标库
                    }),
                ],

                //指定自定义组件位置
                dirs: ["src/components", "src/**/components"],

                //dts: false,
                dts: "src/types/components.d.ts",
            }),
            Icons({
                // 自动安装图标库
                autoInstall: true,
            }),
            createSvgIconsPlugin({
                // 指定需要缓存的图标文件夹
                iconDirs: [resolve(pathSrc, "assets/icons")],
                // 指定symbolId格式
                symbolId: "icon-[dir]-[name]",
            }),
            // MOCK 服务
            env.VITE_MOCK_DEV_SERVER === "true" ? mockDevServerPlugin() : null,
        ],
        // 路径别名配置
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        // 定义全局变量
        define: {
            __APP_INFO__: JSON.stringify(__APP_INFO__),
        },
        // 预加载项目必需的组件
        optimizeDeps: {
            include: [
                "vue",
                "vue-router",
                "pinia",
                "axios",
                "@vueuse/core",
                "vue-i18n",
                "@vueuse/core",
                "element-plus/es/components/form/style/css",
                "element-plus/es/components/form-item/style/css",
                "element-plus/es/components/button/style/css",
                "element-plus/es/components/input/style/css",
                "element-plus/es/components/input-number/style/css",
                "element-plus/es/components/switch/style/css",
                "element-plus/es/components/upload/style/css",
                "element-plus/es/components/menu/style/css",
                "element-plus/es/components/col/style/css",
                "element-plus/es/components/icon/style/css",
                "element-plus/es/components/row/style/css",
                "element-plus/es/components/tag/style/css",
                "element-plus/es/components/dialog/style/css",
                "element-plus/es/components/loading/style/css",
                "element-plus/es/components/radio/style/css",
                "element-plus/es/components/radio-group/style/css",
                "element-plus/es/components/popover/style/css",
                "element-plus/es/components/scrollbar/style/css",
                "element-plus/es/components/tooltip/style/css",
                "element-plus/es/components/dropdown/style/css",
                "element-plus/es/components/dropdown-menu/style/css",
                "element-plus/es/components/dropdown-item/style/css",
                "element-plus/es/components/sub-menu/style/css",
                "element-plus/es/components/menu-item/style/css",
                "element-plus/es/components/divider/style/css",
                "element-plus/es/components/card/style/css",
                "element-plus/es/components/link/style/css",
                "element-plus/es/components/breadcrumb/style/css",
                "element-plus/es/components/breadcrumb-item/style/css",
                "element-plus/es/components/table/style/css",
                "element-plus/es/components/tree-select/style/css",
                "element-plus/es/components/table-column/style/css",
                "element-plus/es/components/select/style/css",
                "element-plus/es/components/option/style/css",
                "element-plus/es/components/pagination/style/css",
                "element-plus/es/components/tree/style/css",
                "element-plus/es/components/alert/style/css",
                "element-plus/es/components/radio-button/style/css",
                "element-plus/es/components/checkbox-group/style/css",
                "element-plus/es/components/checkbox/style/css",
                "element-plus/es/components/tabs/style/css",
                "element-plus/es/components/tab-pane/style/css",
                "element-plus/es/components/rate/style/css",
                "element-plus/es/components/date-picker/style/css",
                "element-plus/es/components/notification/style/css",
                "element-plus/es/components/image/style/css",
                "element-plus/es/components/statistic/style/css",
                "element-plus/es/components/watermark/style/css",
                "element-plus/es/components/config-provider/style/css",
                "element-plus/es/components/text/style/css",
                "element-plus/es/components/drawer/style/css",
                "element-plus/es/components/color-picker/style/css",
                "element-plus/es/components/backtop/style/css",
                "element-plus/es/components/message-box/style/css",
                "element-plus/es/components/badge/style/css",
            ]
        },
        // 服务配置
        server: {
            host: "0.0.0.0",// 允许IP访问
            port: Number(env.VITE_APP_PORT),//端口
            open: false,//是否自动打开浏览器
            proxy: {//代理配置
                [env.VITE_APP_BASE_API]: {//前缀为 /dev-api 的请求
                    changeOrigin: true,
                    target: env.VITE_APP_API_URL,
                    rewrite: (path) =>
                        path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
                },
            },
        },
        css: {
            preprocessorOptions: {// CSS 预处理器
                // 定义全局 SCSS 变量
                scss: {
                    javascriptEnabled: true,
                    additionalData: `
                      @use "@/styles/variables.scss" as *;
                    `,
                },
            },
        },
    }
});
