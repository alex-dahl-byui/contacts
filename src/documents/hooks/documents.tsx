import React, { useEffect, useMemo } from "react";
import { Document } from "../types.ts";
import { useCallback, useState } from "react";
import { child, get, getDatabase, ref, set } from "firebase/database";

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
  const dbRef = useMemo(() => ref(getDatabase()), []);
  const db = useMemo(() => getDatabase(), []);
  const [documents, setDocuments] = useState<Document[]>([]);

  const getDocuments = useCallback(() => {
    get(child(dbRef, "documents/"))
      .then((snapShot) => {
        if (snapShot.exists()) {
          setDocuments(snapShot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dbRef]);

  const setNewDocuments = useCallback(
    (newDocuments: Document[]) => {
      set(ref(db, "/documents"), newDocuments).then(() => getDocuments());
    },
    [db, getDocuments],
  );

  useEffect(() => {
    getDocuments();
  }, [getDocuments]);

  const getDocument = useCallback(
    (id: string) => documents.find((doc) => doc.id === id),
    [documents],
  );

  const deleteDocument = useCallback(
    (document?: Document) => {
      if (!document) {
        return;
      }
      setNewDocuments(documents.filter((doc) => doc.id !== document.id));
    },
    [documents, setNewDocuments],
  );

  const addDocument = useCallback(
    (newDocument: Document) => {
      if (!newDocument) {
        return;
      }
      const newDocumentCopy = structuredClone(newDocument);
      newDocumentCopy.id = crypto.randomUUID();
      setNewDocuments([...documents, newDocumentCopy]);
    },
    [documents, setNewDocuments],
  );

  const updateDocument = useCallback(
    (originalDocument: Document, newDocument: Document) => {
      if (!originalDocument || !newDocument) {
        return;
      }

      newDocument.id = originalDocument.id;

      const pos = documents.findIndex((doc) => doc.id === originalDocument.id);
      if (pos < 0) {
        return;
      }

      const newState = structuredClone(documents);
      newState.splice(pos, 1, newDocument);
      setNewDocuments(newState);
    },
    [documents, setNewDocuments],
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
