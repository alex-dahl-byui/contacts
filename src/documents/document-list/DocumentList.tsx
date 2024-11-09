import "./DocumentList.css";
import Card from "react-bootstrap/Card";
import { DocumentItem } from "../document-item/DocumentItem.tsx";
import Container from "react-bootstrap/Container";
import { DocumentsContext } from "../hooks/documents.tsx";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";

export const DocumentList = () => {
  const { documents } = useContext(DocumentsContext);

  return (
    <Card className="panel panel-default">
      <Card.Header className="panel-heading">
        <Container className="d-flex justify-content-between align-items-center">
          <span className="pull-left title">Documents</span>
          <Nav.Link href="/documents/new">
            <a className="btn btn-success pull-right">Add Document</a>
          </Nav.Link>
        </Container>
      </Card.Header>
      <Card.Body className="panel-body">
        <Container
          className="d-flex justify-content-start align-items-center"
          style={{ flexWrap: "wrap" }}
        >
          {documents.map((document) => (
            <DocumentItem document={document} key={document.id} />
          ))}
        </Container>
      </Card.Body>
    </Card>
  );
};
