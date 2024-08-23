import request from "@/utils/request";

const LOG_BASE_URL = "/api/v1/logs";

class LogAPI {
  //获取访问趋势
  static getVisitStats() {
    return request<any, VisitStatsVO[]>({
      url: `${LOG_BASE_URL}/visit-stats`,
      method: "get",
    });
  }
}

export default LogAPI;

//访问统计
export interface VisitStatsVO {
  title: string;//标题
  type: "pv" | "uv" | "ip";//类型
  todayCount: number;//今日访问量
  totalCount: number;//总访问量
  growthRate: number;//同比增长率
  totalCountOutput: number;//总数
}
