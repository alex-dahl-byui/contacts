import React, { useEffect } from "react";
import { Document } from "../types.ts";
import { useCallback, useState } from "react";

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
  const [documents, setDocuments] = useState<Document[]>([]);

  const getDocuments = useCallback(async () => {
    try {
      const docsRes = await fetch("http://localhost:3000/document");
      const docs = await docsRes.json();
      setDocuments(docs);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    getDocuments();
  }, [getDocuments]);

  const getDocument = useCallback(
    (id: string) => documents.find((doc) => doc.id === id),
    [documents],
  );

  const deleteDocument = useCallback(
    async (document?: Document) => {
      if (!document) {
        return;
      }
      try {
        await fetch(`http://localhost:3000/document/${document.id}`, {
          method: "DELETE",
        });

        getDocuments();
      } catch (e) {
        console.error(e);
      }
    },
    [getDocuments],
  );

  const addDocument = useCallback(async (newDocument: Document) => {
    try {
      await fetch("http://localhost:3000/document", {
        method: "POST",
        body: JSON.stringify(newDocument),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const updateDocument = useCallback(
    async (originalDocument: Document, newDocument: Document) => {
      if (!originalDocument || !newDocument) {
        return;
      }

      newDocument.id = originalDocument.id;

      try {
        await fetch(`http://localhost:3000/document/${originalDocument.id}`, {
          method: "PUT",
          body: JSON.stringify(newDocument),
          headers: {
            "Content-Type": "application/json",
          },
        });

        getDocuments();
      } catch (e) {
        console.error(e);
      }
    },
    [getDocuments],
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
