export const enum MessageTypeEnum {
  MESSAGE = "MESSAGE",//消息
  NOTICE = "NOTICE",//通知
  TODO = "TODO",//待办
}

export const MessageTypeLabels = {
  [MessageTypeEnum.MESSAGE]: "消息",
  [MessageTypeEnum.NOTICE]: "通知",
  [MessageTypeEnum.TODO]: "待办",
};
