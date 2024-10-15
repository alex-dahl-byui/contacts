import { Message } from "../types.ts";
import { useState } from "react";
import { MOCKMESSAGES } from "./MOCKMESSAGES.ts";

export const useGetMessages = () => {
  const [messages, setMessages] = useState<Message[]>(MOCKMESSAGES);

  const getMessages = () => structuredClone(messages);

  const getMessage = (id: string) =>
    messages.find((message) => message.id === id);

  const addMessage = (message: Message) => {
    setMessages([...getMessages(), message]);
  };

  return { getMessages, getMessage, addMessage };
};
