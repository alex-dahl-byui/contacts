import { Message } from "../types.ts";
import { useCallback, useEffect, useState } from "react";

export const useGetMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = useCallback(async () => {
    try {
      const mesRes = await fetch("http://localhost:3000/message");
      const mes = await mesRes.json();
      setMessages(mes);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const addMessage = useCallback(async (newMessages: Message) => {
    try {
      await fetch("http://localhost:3000/message", {
        method: "POST",
        body: JSON.stringify(newMessages),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const getMessages = () => structuredClone(messages);

  const getMessage = (id: string) =>
    messages.find((message) => message.id === id);

  return { getMessages, getMessage, addMessage };
};
