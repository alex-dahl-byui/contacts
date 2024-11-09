import React from "react";
import { Document } from "../types.ts";
import { useCallback, useState } from "react";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS.ts";

interface DocumentsContextType {
  documents: Document[];
  getDocument: (id: string) => Document | undefined;
  deleteDocument: (document?: Document) => void;
  addDocument: (newDocument: Document) => void;
  updateDocument: (originalDocument: Document, newDocument: Document) => void;
}

export const DocumentsContext = React.createContext<DocumentsContextType>({
  documents: [],
  getDocument: () => undefined,
  deleteDocument: () => null,
  addDocument: () => null,
  updateDocument: () => null,
});

interface DocumentContextProviderProps {
  children: React.ReactNode;
}
export const DocumentContextProvider = ({
  children,
}: DocumentContextProviderProps) => {
  const [documents, setDocuments] = useState<Document[]>(MOCKDOCUMENTS);

  const getDocument = useCallback(
    (id: string) => documents.find((doc) => doc.id === id),
    [documents],
  );

  const deleteDocument = useCallback((document?: Document) => {
    if (!document) {
      return;
    }
    setDocuments((prevState) =>
      prevState.filter((doc) => doc.id !== document.id),
    );
  }, []);

  const addDocument = useCallback((newDocument: Document) => {
    if (!newDocument) {
      return;
    }
    const newDocumentCopy = structuredClone(newDocument);
    newDocumentCopy.id = crypto.randomUUID();
    setDocuments((prevState) => [...prevState, newDocumentCopy]);
  }, []);

  const updateDocument = useCallback(
    (originalDocument: Document, newDocument: Document) => {
      if (!originalDocument || !newDocument) {
        return;
      }

      newDocument.id = originalDocument.id;

      setDocuments((prevState) => {
        const pos = prevState.findIndex(
          (doc) => doc.id === originalDocument.id,
        );
        if (pos < 0) {
          return prevState;
        }

        const newState = structuredClone(prevState);
        newState.splice(pos, 1, newDocument);
        return newState;
      });
    },
    [],
  );

  return (
    <DocumentsContext.Provider
      value={{
        documents,
        getDocument,
        deleteDocument,
        addDocument,
        updateDocument,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};
