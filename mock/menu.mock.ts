import {defineMock} from "./base";

export default defineMock([
    //获取菜单路由
    {
        url: "menus/routes",
        method: ["GET"],
        body: {
            code: "10000",
            data: [
                {
                    path: "/system",
                    component: "Layout",
                    redirect: "/system/user",
                    name: "/system",
                    meta: {
                        title: "系统管理",
                        icon: "system",
                        hidden: false,
                        alwaysShow: false,
                        params: null,
                    },
                    children: [
                        {
                            path: "user",
                            component: "system/user/index",
                            name: "User",
                            meta: {
                                title: "用户管理",
                                icon: "el-icon-User",
                                hidden: false,
                                keepAlive: true,
                                alwaysShow: false,
                                params: null,
                            },
                        },
                        {
                            path: "menu",
                            component: "system/menu/index",
                            name: "Menu",
                            meta: {
                                title: "菜单管理",
                                icon: "menu",
                                hidden: false,
                                keepAlive: true,
                                alwaysShow: false,
                                params: null,
                            },
                        },
                    ],
                },
            ],
            msg: "success",
        },
    },

    // 新增菜单
    {
        url: "menus",
        method: ["POST"],
        body({ body }) {
            return {
                code: "10000",
                data: null,
                msg: "新增菜单" + body.name + "成功",
            };
        },
    },

    // 修改菜单
    {
        url: "menus/:id",
        method: ["PUT"],
        body({ body }) {
            return {
                code: "10000",
                data: null,
                msg: "修改菜单" + body.name + "成功",
            };
        },
    },

    // 删除菜单
    {
        url: "menus/:id",
        method: ["DELETE"],
        body({ params }) {
            return {
                code: "10000",
                data: null,
                msg: "删除菜单" + params.id + "成功",
            };
        },
    },

    //菜单列表
    {
        url: "menus",
        method: ["GET"],
        body: {
            code: "10000",
            data: [
                {
                    id: 1,
                    parentId: 0,
                    name: "系统管理",
                    type: "CATALOG",
                    routeName: "",
                    routePath: "/system",
                    component: "Layout",
                    sort: 1,
                    visible: 1,
                    icon: "system",
                    redirect: "/system/user",
                    perm: null,
                    children: [
                        {
                            id: 2,
                            parentId: 1,
                            name: "用户管理",
                            type: "MENU",
                            routeName: "User",
                            routePath: "user",
                            component: "system/user/index",
                            sort: 1,
                            visible: 1,
                            icon: "el-icon-User",
                            redirect: null,
                            perm: null,
                            children: [
                                {
                                    id: 105,
                                    parentId: 2,
                                    name: "用户查询",
                                    type: "BUTTON",
                                    routeName: null,
                                    routePath: "",
                                    component: null,
                                    sort: 0,
                                    visible: 1,
                                    icon: "",
                                    redirect: null,
                                    perm: "sys:user:query",
                                    children: [],
                                },
                                {
                                    id: 31,
                                    parentId: 2,
                                    name: "用户新增",
                                    type: "BUTTON",
                                    routeName: null,
                                    routePath: "",
                                    component: null,
                                    sort: 1,
                                    visible: 1,
                                    icon: "",
                                    redirect: "",
                                    perm: "sys:user:add",
                                    children: [],
                                },
                                {
                                    id: 32,
                                    parentId: 2,
                                    name: "用户编辑",
                                    type: "BUTTON",
                                    routeName: null,
                                    routePath: "",
                                    component: null,
                                    sort: 2,
                                    visible: 1,
                                    icon: "",
                                    redirect: "",
                                    perm: "sys:user:edit",
                                    children: [],
                                },
                                {
                                    id: 33,
                                    parentId: 2,
                                    name: "用户删除",
                                    type: "BUTTON",
                                    routeName: null,
                                    routePath: "",
                                    component: null,
                                    sort: 3,
                                    visible: 1,
                                    icon: "",
                                    redirect: "",
                                    perm: "sys:user:delete",
                                    children: [],
                                },
                                {
                                    id: 88,
                                    parentId: 2,
                                    name: "重置密码",
                                    type: "BUTTON",
                                    routeName: null,
                                    routePath: "",
                                    component: null,
                                    sort: 4,
                                    visible: 1,
                                    icon: "",
                                    redirect: null,
                                    perm: "sys:user:password:reset",
                                    children: [],
                                },
                                {
                                    id: 106,
                                    parentId: 2,
                                    name: "用户导入",
                                    type: "BUTTON",
                                    routeName: null,
                                    routePath: "",
                                    component: null,
                                    sort: 5,
                                    visible: 1,
                                    icon: "",
                                    redirect: null,
                                    perm: "sys:user:import",
                                    children: [],
                                },
                                {
                                    id: 107,
                                    parentId: 2,
                                    name: "用户导出",
                                    type: "BUTTON",
                                    routeName: null,
                                    routePath: "",
                                    component: null,
                                    sort: 6,
                                    visible: 1,
                                    icon: "",
                                    redirect: null,
                                    perm: "sys:user:export",
                                    children: [],
                                },
                            ],
                        },
                        {
                            id: 3,
                            parentId: 1,
                            name: "菜单管理",
                            type: "MENU",
                            routeName: "Menu",
                            routePath: "menu",
                            component: "system/menu/index",
                            sort: 2,
                            visible: 1,
                            icon: "menu",
                            redirect: null,
                            perm: null,
                            children: [
                                {
                                    id: 73,
                                    parentId: 4,
                                    name: "菜单新增",
                                    type: "BUTTON",
                                    routeName: null,
                                    routePath: "",
                                    component: null,
                                    sort: 1,
                                    visible: 1,
                                    icon: "",
                                    redirect: null,
                                    perm: "sys:menu:add",
                                    children: [],
                                },
                                {
                                    id: 75,
                                    parentId: 4,
                                    name: "菜单删除",
                                    type: "BUTTON",
                                    routeName: null,
                                    routePath: "",
                                    component: null,
                                    sort: 3,
                                    visible: 1,
                                    icon: "",
                                    redirect: null,
                                    perm: "sys:menu:delete",
                                    children: [],
                                },
                                {
                                    id: 74,
                                    parentId: 4,
                                    name: "菜单编辑",
                                    type: "BUTTON",
                                    routeName: null,
                                    routePath: "",
                                    component: null,
                                    sort: 3,
                                    visible: 1,
                                    icon: "",
                                    redirect: null,
                                    perm: "sys:menu:edit",
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
            ],
            msg: "success",
        },
    },

    //获取菜单下拉框数据
    {
        url: "menus/options",
        method: ["GET"],
        body: {
            code: "10000",
            data: [
                {
                    value: 1,
                    label: "系统管理",
                    children: [
                        {
                            value: 2,
                            label: "用户管理",
                            children: [
                                {
                                    value: 105,
                                    label: "用户查询",
                                },
                                {
                                    value: 31,
                                    label: "用户新增",
                                },
                                {
                                    value: 32,
                                    label: "用户编辑",
                                },
                                {
                                    value: 33,
                                    label: "用户删除",
                                },
                                {
                                    value: 88,
                                    label: "重置密码",
                                },
                                {
                                    value: 106,
                                    label: "用户导入",
                                },
                                {
                                    value: 107,
                                    label: "用户导出",
                                },
                            ],
                        },
                        {
                            value: 3,
                            label: "菜单管理",
                            children: [
                                {
                                    value: 73,
                                    label: "菜单新增",
                                },
                                {
                                    value: 75,
                                    label: "菜单删除",
                                },
                                {
                                    value: 74,
                                    label: "菜单编辑",
                                },
                            ],
                        },
                    ],
                },
            ],
            msg: "success",
        },
    },

    // 获取菜单表单数据
    {
        url: "menus/:id/form",
        method: ["GET"],
        body: ({ params }) => {
            return {
                code: "10000",
                data: menuMap[params.id],
                msg: "success",
            };
        },
    },
]);

// 菜单映射表数据
const menuMap: Record<string, any> = {
    1: {
        id: 1,
        parentId: 0,
        name: "系统管理",
        type: "CATALOG",
        routeName: "",
        routePath: "/system",
        component: "Layout",
        perm: null,
        visible: 1,
        sort: 1,
        icon: "system",
        redirect: "/system/user",
        keepAlive: null,
        alwaysShow: null,
        params: null,
    },
    2: {
        id: 2,
        parentId: 1,
        name: "用户管理",
        type: "MENU",
        routeName: "User",
        routePath: "user",
        component: "system/user/index",
        perm: null,
        visible: 1,
        sort: 1,
        icon: "user",
        redirect: null,
        keepAlive: 1,
        alwaysShow: null,
    },
    3: {
        id: 4,
        parentId: 1,
        name: "菜单管理",
        type: "MENU",
        routeName: "Menu",
        routePath: "menu",
        component: "system/menu/index",
        perm: null,
        visible: 1,
        sort: 3,
        icon: "menu",
        redirect: null,
        keepAlive: 1,
        alwaysShow: null,
    },
    105:{
        id: 105,
        parentId: 2,
        name: "用户查询",
        type: "BUTTON",
        routeName: null,
        routePath: "",
        component: null,
        perm: "sys:user:query",
        visible: 1,
        sort: 6,
        icon: "",
        redirect: null,
        keepAlive: null,
        alwaysShow: null,
        params: null,
    }
};