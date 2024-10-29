import "./DocumentDetail.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useNavigate, useParams } from "react-router-dom";
import { DocumentsContext } from "../hooks/documents.tsx";
import { useContext, useMemo } from "react";
import { Nav } from "react-bootstrap";

export const DocumentDetail = () => {
  const { id } = useParams();
  const { getDocument, deleteDocument } = useContext(DocumentsContext);
  const document = useMemo(() => getDocument(id ?? ""), [id, getDocument]);
  const navigate = useNavigate();

  return (
    <Card className="panel panel-default">
      <Card.Header className="panel-heading">
        <Container>
          <h4 className="title margin-left-right">{document?.name}</h4>
          <Container
            className="d-flex justify-content-end align-items-center"
            style={{ gap: 2 }}
          >
            <a
              className="btn btn-primary"
              href={document?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
            <Nav.Link href={`/documents/${document?.id}/edit`}>
              <a className="btn btn-info">Edit</a>
            </Nav.Link>
            <a
              className="btn btn-danger"
              onClick={() => {
                deleteDocument(document);
                navigate("/documents");
              }}
            >
              Delete
            </a>
          </Container>
        </Container>
      </Card.Header>
      <Card.Body className="panel-body">
        <div className="pad-left-right">
          <div className="row">
            <label>Description:</label>
            <span className="label-value">{document?.description}</span>
          </div>
          <br />
          <div className="row">
            <label>URL:</label>
            <span className="label-value">{document?.url}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
