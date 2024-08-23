import request from "@/utils/request";

const USER_BASE_URL = "/api/v1/users";

class UserAPI {

    //获取当前登录用户信息
    static getInfo() {
        return request<any, UserInfo>({
            url: `${USER_BASE_URL}/me`,
            method: "get",
        });
    }

    //获取用户表单详情
    static getFormData(userId: number) {
        return request<any, UserForm>({
            url: `${USER_BASE_URL}/${userId}/form`,
            method: "get",
        });
    }

    //添加用户
    static add(data: UserForm) {
        return request({
            url: `${USER_BASE_URL}`,
            method: "post",
            data: data,
        });
    }

    //修改用户
    static update(id: number, data: UserForm) {
        return request({
            url: `${USER_BASE_URL}/${id}`,
            method: "put",
            data: data,
        });
    }

    //获取用户分页列表
    static getPage(queryParams: UserPageQuery) {
        return request<any, PageResult<UserPageVO[]>>({
            url: `${USER_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    }

    //批量删除用户，多个以英文逗号(,)分割
    static deleteByIds(ids: string) {
        return request({
            url: `${USER_BASE_URL}/${ids}`,
            method: "delete",
        });
    }

    //修改用户密码
    static resetPassword(id: number, password: string) {
        return request({
            url: `${USER_BASE_URL}/${id}/password`,
            method: "put",
            params: {password: password},
        });
    }

    //导入用户
    static import(deptId: number, file: File) {
        const formData = new FormData();
        formData.append("file", file);
        return request({
            url: `${USER_BASE_URL}/import`,
            method: "post",
            params: { deptId: deptId },
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    //导出用户
    static export(queryParams: UserPageQuery) {
        return request({
            url: `${USER_BASE_URL}/export`,
            method: "get",
            params: queryParams,
            responseType: "arraybuffer",
        });
    }

}

export default UserAPI;

//用户信息
export interface UserInfo {
    userId?: number;
    username?: string;
    nickname?: string;
    avatar?: string;
    roles: string[];
    perms: string[];
}

//用户分页查询对象
export interface UserPageQuery extends PageQuery {
    keywords?: string;//搜索关键字
    status?: number;//用户状态
    deptId?: number;//部门ID
    createTime?: [string, string];//开始时间
}

//用户分页对象
export interface UserPageVO {
    avatar?: string;//用户头像URL
    createTime?: Date;//创建时间
    deptName?: string;//部门名称
    email?: string;//用户邮箱
    genderLabel?: string;//性别
    id?: number;//用户ID
    mobile?: string;//手机号
    nickname?: string;//用户昵称
    roleNames?: string;//角色名称，多个(,)分割
    status?: number;//用户状态(1:启用;0:禁用)
    username?: string;//用户名
}

//用户表单类型
export interface UserForm {
    avatar?: string;//用户头像
    deptId?: number;//部门ID
    email?: string;//邮箱
    gender?: number;//性别
    id?: number;//用户ID
    mobile?: string;//手机号
    nickname?: string;//昵称
    roleIds?: number[];//角色ID集合
    status?: number;//用户状态
    username?: string;//用户名
}