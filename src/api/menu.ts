import request from "@/utils/request";
import type {MenuTypeEnum} from "@/enums/MenuTypeEnum";

const MENU_BASE_URL = "/api/v1/menus";//菜单基础URL

class MenuAPI {

    //添加菜单
    static add(data: MenuForm) {
        return request({
            url: `${MENU_BASE_URL}`,
            method: "post",
            data: data,
        });
    }

    //修改菜单
    static update(id: string, data: MenuForm) {
        return request({
            url: `${MENU_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    }

    //删除菜单
    static deleteById(id: number) {
        return request({
            url: `${MENU_BASE_URL}/${id}`,
            method: "delete",
        });
    }

    //获取当前用户的路由列表：无需传入角色，后端解析token获取角色自行判断是否拥有路由的权限
    static getRoutes() {
        return request<any, RouteObj[]>({
            url: `${MENU_BASE_URL}/routes`,
            method: "get",
        });
    }

    //获取菜单树形列表
    static getList(queryParams: MenuQuery) {
        return request<any, MenuVO[]>({
            url: `${MENU_BASE_URL}`,
            method: "get",
            params: queryParams,
        });
    }

    //获取菜单下拉数据源
    static getOptions(onlyParent?: boolean) {
        return request<any, OptionType[]>({
            url: `${MENU_BASE_URL}/options`,
            method: "get",
            params: { onlyParent: onlyParent },
        });
    }

    //获取菜单表单数据
    static getFormData(id: number) {
        return request<any, MenuForm>({
            url: `${MENU_BASE_URL}/${id}/form`,
            method: "get",
        });
    }

    //删除菜单
    static deleteById(id: number) {
        return request({
            url: `${MENU_BASE_URL}/${id}`,
            method: "delete",
        });
    }
}

export default MenuAPI;

//路由对象
export interface RouteObj {
    name?: string;//路由名称
    path?: string;//路由路径
    meta?: Meta;//路由属性
    redirect?: string;//跳转链接
    component?: string;//组件路径
    children: RouteObj[];//子路由列表
}

//路由属性
export interface Meta {
    title?: string;//路由标题
    icon?: string;//ICON
    hidden?: boolean;//是否隐藏
    alwaysShow?: boolean;//"目录"只有一个子路由是否始终显示
    keepAlive?: boolean;//"菜单"是否开启页面缓存
}

//菜单视图对象
export interface MenuVO {
    children?: MenuVO[];//子菜单
    component?: string;//组件路径
    icon?: string;//ICON
    id?: number;//菜单ID
    name?: string;//菜单名称
    parentId?: number;//父菜单ID
    perm?: string;//按钮权限标识
    redirect?: string;//跳转路径
    routeName?: string;//路由名称
    routePath?: string;//路由相对路径
    sort?: number;//菜单排序(数字越小排名越靠前)
    type?: MenuTypeEnum;//菜单
    visible?: number;//菜单是否可见
}

//菜单查询参数
export interface MenuQuery {
    keywords?: string;//搜索关键字
}

//菜单表单对象
export interface MenuForm {
    id?: string;//菜单ID
    parentId?: number;//父菜单ID
    name?: string;//菜单名称
    visible: number;//菜单是否可见
    icon?: string;//ICON
    sort?: number;//排序
    routeName?: string;//路由名称
    routePath?: string;//路由路径
    component?: string;//组件路径
    redirect?: string;//跳转路由路径
    type?: MenuTypeEnum;//菜单
    perm?: string;//权限标识
    keepAlive?: number;//【菜单】是否开启页面缓存
    alwaysShow?: number;//【目录】只有一个子路由是否始终显示
    params?: KeyValue[];//参数
}