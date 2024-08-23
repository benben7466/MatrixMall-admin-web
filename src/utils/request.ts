import axios from "axios";
import type {InternalAxiosRequestConfig, AxiosResponse} from "axios";
import {TOKEN_KEY} from "@/enums/StoreEnum";
import {ResultEnum} from "@/enums/ResultEnum";
import {useUserStoreHook} from "@/store/modules/user";
import qs from "qs";

// 创建 axios 实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 50000,
    headers: {"Content-Type": "application/json;charset=utf-8"},
    paramsSerializer: (params) => {
        return qs.stringify(params);
    },
});

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = localStorage.getItem(TOKEN_KEY);
        if (accessToken) {
            config.headers.Authorization = accessToken;
        }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.config.responseType === "blob" || response.config.responseType === "arraybuffer") {
            return response;
        }

        const {code, data, msg} = response.data;
        if (code === ResultEnum.SUCCESS) {
            return data;
        }

        ElMessage({
            "type": 'error',
            "message": msg || "系统响应数据异常：" + response.config.url,
            "duration": 6000
        });
        return Promise.reject(new Error(msg || "Error"));
    },
    (error: any) => {
        // 异常处理
        if (error.response.data) {
            const {code, msg} = error.response.data;
            if (code === ResultEnum.TOKEN_INVALID) {
                ElNotification({title: "提示", message: "您的会话已过期，请重新登录", type: "info"});
                useUserStoreHook().resetToken().then(() => {
                    location.reload();
                });
            } else {
                ElMessage.error(msg || "系统访问出错");
            }
        }
        return Promise.reject(error.message);
    }
);

// 导出 axios 实例
export default service;