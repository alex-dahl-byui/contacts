import "./MessageItem.css";
import { Message } from "../types.ts";
import { ContactContext } from "../../contacts/hooks/contact.tsx";
import { useContext, useEffect, useState } from "react";
import { IContact } from "../../contacts/types.ts";

interface MessageItemProps {
  message: Message;
}

export const MessageItem = ({ message }: MessageItemProps) => {
  const { getContact } = useContext(ContactContext);

  const [contact, setContact] = useState<IContact | undefined>(undefined);

  useEffect(() => {
    setContact(getContact(message.sender));
  }, [getContact, message.sender]);

  return (
    <a className="list-group-item clearfix">
      <div className="">
        <span className="messageHeader">{contact?.name}</span>
        <div className="messageText">{message.msgText}</div>
      </div>
    </a>
  );
};
