import "./DocumentItem.css";
import { Document } from "../types.ts";

interface DocumentItemProps {
  document: Document;
  setDocument: (document: Document) => void;
}

export const DocumentItem = ({ document, setDocument }: DocumentItemProps) => {
  return (
    <a
      className="list-group-item clearfix documentDiv"
      style={{ borderTopWidth: "1px" }}
      onClick={() => setDocument(document)}
    >
      {document?.name}
    </a>
  );
};
