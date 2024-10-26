import { IContact } from "../types.ts";
import { useCallback, useState } from "react";
import { MOCKCONTACTS } from "./MOCKCONTACTS.ts";

export const useGetContacts = () => {
  const [contacts, setContacts] = useState<IContact[]>(MOCKCONTACTS);

  const getContacts = useCallback(() => structuredClone(contacts), [contacts]);

  const getContact = useCallback(
    (id: string) => contacts.find((contact) => contact.id === id),
    [contacts],
  );

  const deleteContact = useCallback((contact?: IContact) => {
    if (!contact) {
      return;
    }
    setContacts((prevState) =>
      prevState.filter((doc) => doc.id !== contact.id),
    );
  }, []);

  return { getContact, getContacts, deleteContact };
};
