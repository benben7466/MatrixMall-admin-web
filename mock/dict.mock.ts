import { defineMock } from "./base";

export default defineMock([
  {
    url: "dict/:code/options",
    method: ["GET"],
    body: ({ params }) => {
      const code = params.code;

      let list = null;

      if (code == "gender") {
        list = [
          {
            value: "1",
            label: "男",
          },
          {
            value: "2",
            label: "女",
          },
          {
            value: "0",
            label: "保密",
          },
        ];
      }

      return {
        code: "10000",
        data: list,
        msg: "一切ok",
      };
    },
  },

]);