import {defineMock} from "./base";

export default defineMock([
    //获取用户信息
    {
        url: "users/me",
        method: ["GET"],
        body: {
            code: "10000",
            data: {
                userId: 1,
                nickname: "系统管理员",
                username: "admin",
                avatar: "/images/face.png",
                roles: ["ROOT"],
                perms: [
                    "sys:menu:add",
                    "sys:menu:delete",
                    "sys:menu:edit",
                    "sys:user:add",
                    "sys:user:delete",
                    "sys:user:edit",
                    "sys:user:query",
                    "sys:user:export",
                    "sys:dept:add",
                    "sys:dept:delete",
                    "sys:dept:edit",
                    "sys:dict:add",
                    "sys:dict:edit",
                    "sys:dict:delete",
                    "sys:dict_type:add",
                    "sys:dict_type:delete",
                    "sys:dict_type:edit",
                    "sys:role:add",
                    "sys:role:delete",
                    "sys:role:edit",
                    "sys:user:password:reset",
                ],
            },
            msg: "success",
        },
    },

    //查询用户数据
    {
        url: "users/page",
        method: ["GET"],
        body: {
            code: "10000",
            data: {
                list: [
                    {
                        id: 1,
                        username: "admin",
                        nickname: "系统管理员",
                        mobile: "13426286424",
                        gender: 1,
                        genderLabel: "男",
                        avatar: "/images/face.png",
                        email: "benben7466@qq.com",
                        status: 1,
                        deptId: 2,
                        deptName: "技术部",
                        roleIds: [1],
                        createTime: "2024-08-08",
                    },
                    {
                        id: 2,
                        username: "benben",
                        nickname: "笨笨",
                        mobile: "13800138000",
                        gender: 1,
                        genderLabel: "男",
                        avatar: "/images/face.png",
                        email: "benben7466@qq.com",
                        status: 1,
                        deptId: 2,
                        deptName: "技术部",
                        roleIds: [2],
                        createTime: "2024-08-08",
                    },
                ],
                total: 2,
            },
            msg: "success",
        },
    },

    // 获取用户表单数据
    {
        url: "users/:userId/form",
        method: ["GET"],
        body: ({params}) => {
            return {
                code: "10000",
                data: userMap[params.userId],
                msg: "success",
            };
        },
    },

    // 新增用户
    {
        url: "users",
        method: ["POST"],
        body({body}) {
            return {
                code: "10000",
                data: null,
                msg: "新增用户" + body.nickname + "成功",
            };
        },
    },

    // 修改用户
    {
        url: "users/:userId",
        method: ["PUT"],
        body({body}) {
            return {
                code: "10000",
                data: null,
                msg: "修改用户" + body.nickname + "成功",
            };
        },
    },

    // 重置密码
    {
        url: "users/:userId/password",
        method: ["PATCH"],
        body({ query }) {
            return {
                code: "10000",
                data: null,
                msg: "重置密码成功，新密码为：" + query.password,
            };
        },
    },

    // 删除用户
    {
        url: "users/:userId",
        method: ["DELETE"],
        body({params}) {
            return {
                code: "10000",
                data: null,
                msg: "删除用户" + params.id + "成功",
            };
        },
    },

]);

// 用户映射表数据
const userMap: Record<string, any> = {
    1: {
        id: 1,
        username: "admin",
        nickname: "系统管理员",
        mobile: "13426286424",
        gender: 1,
        avatar: "/images/face.png",
        email: "benben7466@qq.com",
        status: 1,
        deptId: 2,
        roleIds: [1],
    },
    2: {
        id: 2,
        username: "benben",
        nickname: "笨笨",
        mobile: "13800138000",
        gender: 1,
        avatar: "/images/face.png",
        email: "benben7466@qq.com",
        status: 1,
        deptId: 2,
        roleIds: [2],
    },
};