import { defineMock } from "./base";

export default defineMock([
    {
        url: "roles/options",
        method: ["GET"],
        body: {
            code: "10000",
            data: [
                {
                    value: 1,
                    label: "系统管理员",
                },
                {
                    value: 2,
                    label: "运营人员",
                },
            ],
            msg: "success",
        },
    },

]);
