import type {App} from "vue";
import {createRouter, createWebHashHistory, type RouteRecordRaw} from "vue-router";

export const Layout = () => import("@/layout/index.vue");

//静态路由
export const constantRoutes: RouteRecordRaw[] = [
    {
        path: '/',//定义了该路由的路径为根路径 /
        name: "/",
        component: Layout,//指定了当访问根路径时要渲染的组件为 Layout
        redirect: "/dashboard",//表示当访问根路径时，会重定向到 /dashboard 路径
        children: [//该路由的子路由配置
            {
                path: "dashboard",//子路由的路径为 dashboard
                component: () => import("@/views/dashboard/index.vue"),//加载对应的组件
                name: "Dashboard",//为该路由命名
                meta: {
                    title: "dashboard",//页面标题
                    icon: "homepage",//图标
                    affix: true,//是否固定
                    keepAlive: true,//是否缓存
                },
            },
        ]
    },
    {
        path: '/login',
        component: () => import("@/views/login/index.vue"),
        meta: {hidden: true},
    }
];

//创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
});

//重置路由
export function resetRouter() {
    router.replace({path: "/login"});
}

// 全局注册 router
export function setupRouter(app: App<Element>) {
    app.use(router);
}

export default router;