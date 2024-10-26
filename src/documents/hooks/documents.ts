import { Document } from "../types.ts";
import { useCallback, useState } from "react";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS.ts";

export const useGetDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>(MOCKDOCUMENTS);

  const getDocuments = useCallback(
    () => structuredClone(documents),
    [documents],
  );

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

  return { getDocuments, getDocument, deleteDocument };
};
