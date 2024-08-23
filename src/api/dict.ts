import request from "@/utils/request";

const DICT_BASE_URL = "/api/v1/dict";

class DictAPI {

  //获取字典的数据项
  static getOptions(code: string) {
    return request<any, OptionType[]>({
      url: `${DICT_BASE_URL}/${code}/options`,
      method: "get",
    });
  }
}

export default DictAPI;
