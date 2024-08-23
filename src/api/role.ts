import request from "@/utils/request";

const ROLE_BASE_URL = "/api/v1/roles";

class RoleAPI {

    //获取角色下拉数据源
    static getOptions() {
        return request<any, OptionType[]>({
            url: `${ROLE_BASE_URL}/options`,
            method: "get",
        });
    }
}

export default RoleAPI;