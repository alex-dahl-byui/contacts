import "./MessageItem.css";
import { Message } from "../types.ts";
import { useGetContacts } from "../../contacts/hooks/contact.ts";
import { useEffect, useState } from "react";
import { IContact } from "../../contacts/types.ts";

interface MessageItemProps {
  message: Message;
}

export const MessageItem = ({ message }: MessageItemProps) => {
  const { getContact } = useGetContacts();

  const [contact, setContact] = useState<IContact | undefined>(undefined);

  useEffect(() => {
    setContact(getContact(message.id));
  }, [getContact, message.id]);

  return (
    <a className="list-group-item clearfix">
      <div className="">
        <span className="messageHeader">{contact?.name}</span>
        <div className="messageText">{message.msgText}</div>
      </div>
    </a>
  );
};
