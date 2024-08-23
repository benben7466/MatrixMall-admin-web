import { defineMock } from "./base";

export default defineMock([
  {
    url: "dept/options",
    method: ["GET"],
    body: {
      code: "10000",
      data: [
        {
          value: 1,
          label: "贲氏工作室",
          children: [
            {
              value: 2,
              label: "技术部",
            },
            {
              value: 3,
              label: "市场部",
            },
            {
              value: 4,
              label: "运营部",
            },
          ],
        },
      ],
      msg: "success",
    },
  },

]);