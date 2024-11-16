import { Message } from "../types.ts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { Document } from "../../documents/types.ts";

export const useGetMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const dbRef = useMemo(() => ref(getDatabase()), []);
  const db = useMemo(() => getDatabase(), []);

  const fetchMessages = useCallback(() => {
    get(child(dbRef, "messages/"))
      .then((snapShot) => {
        if (snapShot.exists()) {
          setMessages(snapShot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dbRef]);

  const setNewMessages = useCallback(
    (newMessages: Document[]) => {
      set(ref(db, "/messages"), newMessages).then(() => fetchMessages());
    },
    [db, fetchMessages],
  );

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const getMessages = () => structuredClone(messages);

  const getMessage = (id: string) =>
    messages.find((message) => message.id === id);

  const addMessage = (message: Message) => {
    setNewMessages([...getMessages(), message]);
  };

  return { getMessages, getMessage, addMessage };
};
