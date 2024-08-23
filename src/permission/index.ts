import type {App, Directive, DirectiveBinding} from "vue";
import router from "@/router";
import NProgress from "@/utils/nprogress";
import {TOKEN_KEY} from "@/enums/StoreEnum";
import type {NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw} from "vue-router";
import {useUserStore, usePermissionStore} from "@/store";

// 全局注册 permission
export function setupPermission(app: App<Element>) {
    // 路由白名单
    const whiteList = ["/login"];

    router.beforeEach(async (to, from, next) => {
        NProgress.start();
        const hasToken = localStorage.getItem(TOKEN_KEY);

        if (hasToken) {
            if (to.path === "/login") {//已登录，跳转到首页
                next({path: "/"});
                NProgress.done();
            } else {
                const userStore = useUserStore();
                const hasRoles = userStore.user.roles && userStore.user.roles.length > 0;

                if (hasRoles) {
                    if (to.matched.length === 0) {// 如果未匹配到任何路由，跳转到404页面
                        next(from.name ? {name: from.name} : "/404");
                    } else {
                        const title = (to.params.title as string) || (to.query.title as string);
                        if (title) {
                            to.meta.title = title;// 如果路由参数中有 title，覆盖路由元信息中的 title
                        }
                        next();
                    }
                } else {
                    const permissionStore = usePermissionStore();
                    try {
                        await userStore.getUserInfo();
                        const dynamicRoutes = await permissionStore.generateRoutes();
                        dynamicRoutes.forEach((route: RouteRecordRaw) =>
                            router.addRoute(route)
                        );
                        next({...to, replace: true});
                    } catch (error) {
                        // 移除 token 并重定向到登录页，携带当前页面路由作为跳转参数
                        await userStore.resetToken();
                        gotoLogin(to, next);
                        NProgress.done();
                    }
                }
            }
        } else {
            //没有登录
            if (whiteList.includes(to.path)) {//在白名单，继续往下走
                next();
            } else {//不在白名单，跳转到登录页
                gotoLogin(to, next);
                NProgress.done();
            }
        }
    });

    router.afterEach(() => {
        NProgress.done();
    });
}

//按钮权限
export const hasPerm: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        // DOM绑定需要的按钮权限标识
        const {value: requiredPerms} = binding;
        if (requiredPerms) {
            if (!hasAuth(requiredPerms)) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        } else {
            throw new Error(
                "need perms! Like v-has-perm=\"['sys:user:add','sys:user:edit']\""
            );
        }
    },
};

//判断是否有权限
export function hasAuth(value: string | string[], type: "button" | "role" = "button") {
    const {roles, perms} = useUserStore().user;

    // 超级管理员 拥有所有权限
    if (type === "button" && roles.includes("ROOT")) {
        //return true;
    }

    const auths = type === "button" ? perms : roles;
    return typeof value === "string"
        ? auths.includes(value)
        : value.some((perm) => auths.includes(perm));
}

//跳转到登录页
function gotoLogin(to: RouteLocationNormalized, next: NavigationGuardNext) {
    //处理路由的查询参数，并生成相应的重定向路径
    const params = new URLSearchParams(to.query as Record<string, string>);
    const queryString = params.toString();
    const redirect = queryString ? `${to.path}?${queryString}` : to.path;

    //跳转
    next(`/login?redirect=${encodeURIComponent(redirect)}`);
}