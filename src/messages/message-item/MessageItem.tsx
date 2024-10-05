import "./MessageItem.css";
import { Message } from "../types.ts";

interface MessageItemProps {
  message: Message;
}

export const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <a className="list-group-item clearfix">
      <div className="">
        <span className="messageHeader">{message.sender}</span>
        <div className="messageText">{message.msgText}</div>
      </div>
    </a>
  );
};
