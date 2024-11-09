import React from "react";
import { IContact } from "../types.ts";
import { useCallback, useState } from "react";
import { MOCKCONTACTS } from "./MOCKCONTACTS.ts";

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
  const [contacts, setContacts] = useState<IContact[]>(MOCKCONTACTS);

  const getContact = useCallback(
    (id: string) => contacts.find((contact) => contact.id === id),
    [contacts],
  );

  const deleteContact = useCallback((contact?: IContact) => {
    if (!contact) {
      return;
    }
    setContacts((prevState) =>
      prevState.filter((con) => con.id !== contact.id),
    );
  }, []);

  const addContact = useCallback((newContact: IContact) => {
    if (!newContact) {
      return;
    }
    const newContactCopy = structuredClone(newContact);
    newContactCopy.id = crypto.randomUUID();
    setContacts((prevState) => [...prevState, newContactCopy]);
  }, []);

  const updateContact = useCallback(
    (originalContact: IContact, newContact: IContact) => {
      if (!originalContact || !newContact) {
        return;
      }

      newContact.id = originalContact.id;

      setContacts((prevState) => {
        const pos = prevState.indexOf(originalContact);
        if (pos < 0) {
          return prevState;
        }

        const newState = [...prevState];
        newState[pos] = newContact;
        return newState;
      });
    },
    [],
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
