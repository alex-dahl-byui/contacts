import React, { useEffect, useMemo } from "react";
import { IContact } from "../types.ts";
import { useCallback, useState } from "react";

import { getDatabase, ref, child, get, set } from "firebase/database";

interface ContactContextType {
  contacts: IContact[];
  getContact: (id: string) => IContact | undefined;
  deleteContact: (contact?: IContact) => void;
  addContact: (newContact: IContact) => void;
  updateContact: (originalContact: IContact, newContact: IContact) => void;
  removeGroupMember: (contactId: string, memberId: string) => void;
}

export const ContactContext = React.createContext<ContactContextType>({
  contacts: [],
  getContact: () => undefined,
  deleteContact: () => null,
  addContact: () => null,
  updateContact: () => null,
  removeGroupMember: () => null,
});

interface ContactContextProviderProps {
  children: React.ReactNode;
}

export const ContactContextProvider = ({
  children,
}: ContactContextProviderProps) => {
  const dbRef = useMemo(() => ref(getDatabase()), []);
  const db = useMemo(() => getDatabase(), []);

  const [contacts, setContacts] = useState<IContact[]>([]);

  const getContacts = useCallback(() => {
    get(child(dbRef, "contacts/"))
      .then((snapShot) => {
        if (snapShot.exists()) {
          setContacts(snapShot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dbRef]);

  const setNewContacts = useCallback(
    (newContacts: IContact[]) => {
      set(ref(db, "/contacts"), newContacts).then(() => getContacts());
    },
    [db, getContacts],
  );

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const getContact = useCallback(
    (id: string) => contacts.find((contact) => contact.id === id),
    [contacts],
  );

  const deleteContact = useCallback(
    (contact?: IContact) => {
      if (!contact) {
        return;
      }
      setNewContacts(contacts.filter((con) => con.id !== contact.id));
    },
    [contacts, setNewContacts],
  );

  const addContact = useCallback(
    (newContact: IContact) => {
      if (!newContact) {
        return;
      }
      const newContactCopy = structuredClone(newContact);
      newContactCopy.id = crypto.randomUUID();
      setNewContacts([...contacts, newContactCopy]);
    },
    [contacts, setNewContacts],
  );

  const updateContact = useCallback(
    (originalContact: IContact, newContact: IContact) => {
      if (!originalContact || !newContact) {
        return;
      }

      newContact.id = originalContact.id;

      const pos = contacts.findIndex(
        (contact) => contact.id === originalContact.id,
      );
      if (pos >= 0) {
        const newState = [...contacts];
        newState[pos] = newContact;
        setNewContacts(newState);
      }
    },
    [contacts, setNewContacts],
  );

  const removeGroupMember = useCallback(
    (contactId: string, memberId: string) => {
      setContacts((prevState) => {
        return prevState.map((contact) => {
          if (contact.id === contactId && contact.group) {
            return {
              ...contact,
              group: contact.group.filter((member) => member.id !== memberId),
            };
          }
          return contact;
        });
      });
    },
    [],
  );

  return (
    <ContactContext.Provider
      value={{
        contacts,
        getContact,
        deleteContact,
        addContact,
        updateContact,
        removeGroupMember,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
