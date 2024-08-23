import request from "@/utils/request";

const DEPT_BASE_URL = "/api/v1/dept";

class DeptAPI {

    //获取部门下拉列表
    static getOptions() {
        return request<any, OptionType[]>({
            url: `${DEPT_BASE_URL}/options`,
            method: "get",
        });
    }
}

export default DeptAPI;