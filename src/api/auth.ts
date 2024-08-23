import request from "@/utils/request";
const AUTH_BASE_URL = "/api/v1/auth";//验证基础URL

class AuthAPI {
    //登录
    static login(data: LoginData) {
        const formData = new FormData();
        formData.append("username", data.username);
        formData.append("password", data.password);
        formData.append("captchaKey", data.captchaKey);
        formData.append("captchaCode", data.captchaCode);

        return request<any, LoginResult>({
            url: `${AUTH_BASE_URL}/login`,
            method: "post",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    //注销
    static logout() {
        return request({
            url: `${AUTH_BASE_URL}/logout`,
            method: "delete",
        });
    }

    //获取验证码
    static getCaptcha() {
        return request<any, CaptchaResult>({
            url: `${AUTH_BASE_URL}/captcha`,
            method: "get",
        });
    }
}

//登录请求参数
export interface LoginData {
    username: string;//用户名
    password: string;//密码
    captchaKey: string;//验证码缓存key
    captchaCode: string;//验证码
}

//登录响应结果
export interface LoginResult {
    accessToken?: string;//访问token
    expires?: number;//过期时间(单位：毫秒)
    refreshToken?: string;//刷新token
    tokenType?: string;//token 类型
}

//验证码响应
export interface CaptchaResult {
    captchaKey: string;//验证码缓存key
    captchaBase64: string;//验证码图片Base64字符串
}


export default AuthAPI;