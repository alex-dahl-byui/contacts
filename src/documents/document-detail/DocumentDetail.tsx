import "./DocumentDetail.css";
import { Document } from "../types.ts";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

interface DocumentDetailPros {
  document: Document;
}

export const DocumentDetail = ({ document }: DocumentDetailPros) => {
  return (
    <Card className="panel panel-default">
      <Card.Header className="panel-heading">
        <Container>
          <h4 className="title margin-left-right">{document?.name}</h4>
          <Container
            className="d-flex justify-content-end align-items-center"
            style={{ gap: 2 }}
          >
            <a className="btn btn-primary">View</a>
            <a className="btn btn-info">Edit</a>
            <a className="btn btn-danger">Delete</a>
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
