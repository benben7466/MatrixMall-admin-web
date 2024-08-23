import {defineMock} from "./base";
import {MessageTypeEnum} from "@/enums/MessageTypeEnum";

export default defineMock([
    {
        url: "message/gets",
        method: ["GET"],
        body: {
            code: "10000",
            data: [
                {id: 1, title: "欢迎使用本系统，我们会不断的完善功能。", type: MessageTypeEnum.MESSAGE},
                {id: 2, title: "新功能：支持多语言功能，支持用户定义配置。", type: MessageTypeEnum.MESSAGE},
                {id: 3, title: "重要提醒：定期关注我们。", type: MessageTypeEnum.MESSAGE},
                {id: 4, title: "通知：您有一条未读的系统消息，请及时查看。", type: MessageTypeEnum.NOTICE},
                {id: 5, title: "新订单通知：您有一笔新的订单需要处理。", type: MessageTypeEnum.NOTICE},
                {id: 6, title: "待办事项：完成用户权限设置。", type: MessageTypeEnum.TODO},
                {id: 7, title: "待办事项：更新产品列表。", type: MessageTypeEnum.TODO},
            ],
            msg: "success",
        },
    },

]);