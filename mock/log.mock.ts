import { defineMock } from "./base";

export default defineMock([
    {
        url: "logs/visit-stats",
        method: ["GET"],
        body: {
            code: "10000",
            data: [
                {
                    type: "pv",
                    title: "浏览量",
                    todayCount: 101,
                    totalCount: 98989,
                    growthRate: +0.78,
                    granularityLabel: "日",
                },
                {
                    type: "uv",
                    title: "访客数",
                    todayCount: 212,
                    totalCount: 812,
                    growthRate: +0.23,
                    granularityLabel: "日",
                },
                {
                    type: "ip",
                    title: "IP数",
                    todayCount: 252,
                    totalCount: 1265,
                    growthRate: -0.32,
                    granularityLabel: "日",
                },
            ],
            msg: "success",
        },
    },
]);
