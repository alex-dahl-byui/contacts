import { Document } from "../types.ts";
import { useState } from "react";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS.ts";

export const useGetDocuments = () => {
  const [documents] = useState<Document[]>(MOCKDOCUMENTS);

  const getDocuments = () => structuredClone(documents);

  const getDocument = (id: string) => documents.find((doc) => doc.id === id);

  return { getDocuments, getDocument };
};
