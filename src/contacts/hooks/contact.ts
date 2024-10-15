import { IContact } from "../types.ts";
import { useState } from "react";
import { MOCKCONTACTS } from "./MOCKCONTACTS.ts";

export const useGetContacts = () => {
  const [contacts] = useState<IContact[]>(MOCKCONTACTS);

  const getContacts = () => structuredClone(contacts);

  const getContact = (id: string) =>
    contacts.find((contact) => contact.id === id);

  return { getContact, getContacts };
};
