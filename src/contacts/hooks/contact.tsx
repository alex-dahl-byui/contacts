import React, { useEffect } from "react";
import { IContact } from "../types.ts";
import { useCallback, useState } from "react";

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
  const [contacts, setContacts] = useState<IContact[]>([]);

  const getContacts = useCallback(async () => {
    try {
      const conRes = await fetch("http://localhost:3000/contact");
      const con = await conRes.json();
      setContacts(con);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  const getContact = useCallback(
    (id: string) => contacts.find((contact) => contact.id === id),
    [contacts],
  );

  const deleteContact = useCallback(
    async (contact?: IContact) => {
      if (!contact) {
        return;
      }
      try {
        await fetch(`http://localhost:3000/contact/${contact.id}`, {
          method: "DELETE",
        });

        getContacts();
      } catch (e) {
        console.error(e);
      }
    },
    [getContacts],
  );

  const addContact = useCallback(async (newContact: IContact) => {
    try {
      await fetch("http://localhost:3000/contact", {
        method: "POST",
        body: JSON.stringify(newContact),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const updateContact = useCallback(
    async (originalContact: IContact, newContact: IContact) => {
      if (!originalContact || !newContact) {
        return;
      }

      newContact.id = originalContact.id;

      try {
        await fetch(`http://localhost:3000/contact/${originalContact.id}`, {
          method: "PUT",
          body: JSON.stringify(newContact),
          headers: {
            "Content-Type": "application/json",
          },
        });

        getContacts();
      } catch (e) {
        console.error(e);
      }
    },
    [getContacts],
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
