import {type RouteRecordRaw} from "vue-router";
import MenuAPI, {type RouteObj} from "@/api/menu";
import { constantRoutes } from "@/router";

const modules = import.meta.glob("../../views/**/**.vue");
const Layout = () => import("@/layout/index.vue");

export const usePermissionStore = defineStore("permission", () => {
    const routes = ref<RouteRecordRaw[]>([]);//所有路由，包括静态和动态路由

    //生成动态路由
    function generateRoutes() {
        return new Promise<RouteRecordRaw[]>((resolve, reject) => {
            MenuAPI.getRoutes()
                .then((data) => {
                    const dynamicRoutes = transformRoutes(data);
                    routes.value = constantRoutes.concat(dynamicRoutes);
                    resolve(dynamicRoutes);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    return {
        routes,
        generateRoutes,
    };
});

//转换路由数据为组件
const transformRoutes = (routes: RouteObj[]) => {
    const asyncRoutes: RouteRecordRaw[] = [];
    routes.forEach((route) => {
        const tmpRoute = { ...route } as RouteRecordRaw;
        // 顶级目录，替换为 Layout 组件
        if (tmpRoute.component?.toString() == "Layout") {
            tmpRoute.component = Layout;
        } else {
            // 其他菜单，根据组件路径动态加载组件
            const component = modules[`../../views/${tmpRoute.component}.vue`];
            if (component) {
                tmpRoute.component = component;
            } else {
                tmpRoute.component = modules[`../../views/error-page/404.vue`];
            }
        }

        if (tmpRoute.children) {
            tmpRoute.children = transformRoutes(route.children);
        }

        asyncRoutes.push(tmpRoute);
    });

    return asyncRoutes;
};

//如何在组件外部使用 Pinia Store：https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
export function usePermissionStoreHook() {
    return usePermissionStore(store);
}