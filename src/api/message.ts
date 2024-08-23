import request from "@/utils/request";
import {MessageTypeEnum} from "@/enums/MessageTypeEnum";

const MESSAGE_BASE_URL = "/api/v1/message";

class MessageAPI {

    //获取消息
    static getMessages() {
        return request<any, MessageInfo[]>({
            url: `${MESSAGE_BASE_URL}/gets`,
            method: "get",
        });
    }
}

export default MessageAPI;

//用户信息
export interface MessageInfo {
    id: number;
    title: string;
    type: MessageTypeEnum;
}