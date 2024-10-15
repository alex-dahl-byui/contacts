import "./DocumentList.css";
import Card from "react-bootstrap/Card";
import { Document } from "../types.ts";
import { DocumentItem } from "../document-item/DocumentItem.tsx";
import Container from "react-bootstrap/Container";
import { useGetDocuments } from "../hooks/documents.ts";

interface DocumentListProps {
  setDocument: (document: Document) => void;
}

export const DocumentList = ({ setDocument }: DocumentListProps) => {
  const { getDocuments } = useGetDocuments();
  return (
    <Card className="panel panel-default">
      <Card.Header className="panel-heading">
        <Container className="d-flex justify-content-between align-items-center">
          <span className="pull-left title">Documents</span>
          <a className="btn btn-success pull-right">Add Document</a>
        </Container>
      </Card.Header>
      <Card.Body className="panel-body">
        <Container
          className="d-flex justify-content-start align-items-center"
          style={{ flexWrap: "wrap" }}
        >
          {getDocuments().map((document) => (
            <DocumentItem
              document={document}
              key={document.id}
              setDocument={setDocument}
            />
          ))}
        </Container>
      </Card.Body>
    </Card>
  );
};
