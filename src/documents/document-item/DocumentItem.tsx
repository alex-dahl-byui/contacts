import "./DocumentItem.css";
import { Document } from "../types.ts";
import Nav from "react-bootstrap/esm/Nav";
import { useParams } from "react-router-dom";

interface DocumentItemProps {
  document: Document;
}

export const DocumentItem = ({ document }: DocumentItemProps) => {
  const { id } = useParams();
  return (
    <Nav.Link href={`/documents/${document.id}`}>
      <a
        className="list-group-item clearfix documentDiv"
        style={{
          borderTopWidth: "1px",
          backgroundColor: id === document.id ? "#2f79b8" : "initial",
          color: id === document.id ? "#fff" : "default",
        }}
      >
        {document?.name}
      </a>
    </Nav.Link>
  );
};
