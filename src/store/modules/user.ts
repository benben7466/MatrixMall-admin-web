import {store} from "@/store";
import UserAPI, {type UserInfo} from "@/api/user";
import AuthAPI, {type LoginData} from "@/api/auth";
import {TOKEN_KEY} from "@/enums/StoreEnum";
import {resetRouter} from "@/router";

export const useUserStore = defineStore("user", () => {
    const user = ref<UserInfo>({
        roles: [],
        perms: [],
    });

    //用户登录
    function login(loginData: LoginData) {
        return new Promise<void>((resolve, reject) => {
            AuthAPI.login(loginData)
                .then((data) => {
                    const {tokenType, accessToken} = data;
                    localStorage.setItem(TOKEN_KEY, tokenType + " " + accessToken);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    //用户退出
    function logout() {
        return new Promise<void>((resolve, reject) => {
            AuthAPI.logout()
                .then(() => {
                    localStorage.setItem(TOKEN_KEY, "");
                    location.reload(); // 清空路由
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    //获取用户信息
    function getUserInfo() {
        return new Promise<UserInfo>((resolve, reject) => {
            UserAPI.getInfo()
                .then((data) => {
                    if (!data) {
                        reject("Verification failed, please Login again.");
                        return;
                    }
                    if (!data.roles || data.roles.length <= 0) {
                        reject("getUserInfo: roles must be a non-null array!");
                        return;
                    }
                    Object.assign(user.value, {...data});//将 data 对象的属性复制到 user.value 对象上
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    //重置Token
    function resetToken() {
        console.log("resetToken");
        return new Promise<void>((resolve) => {
            localStorage.setItem(TOKEN_KEY, "");
            resetRouter();
            resolve();
        });
    }

    return {
        user,
        resetToken,
        login,
        logout,
        getUserInfo,
    };
});


//如何在组件外部使用 Pinia Store：https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
export function useUserStoreHook() {
    return useUserStore(store);
}