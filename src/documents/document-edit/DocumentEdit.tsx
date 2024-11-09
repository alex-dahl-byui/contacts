import { useContext, useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Document } from "../types.ts";
import { Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { DocumentsContext } from "../hooks/documents.tsx";

import "./DocumentEdit.css";

const emptyDocument: Document = {
  description: "",
  name: "",
  url: "",
  id: crypto.randomUUID(),
};

export const DocumentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addDocument, updateDocument, getDocument } =
    useContext(DocumentsContext);

  const editMode = useMemo(() => !!id, [id]);
  const [document, setDocument] = useState<Document>(
    editMode && id
      ? structuredClone(getDocument(id) ?? emptyDocument)
      : emptyDocument,
  );
  const [originalDocument, setOriginalDocument] = useState<
    Document | undefined
  >(undefined);

  useEffect(() => {
    if (editMode) {
      setOriginalDocument(structuredClone(getDocument(id ?? "0")));
    }
  }, [editMode, getDocument, id]);

  const handleSubmit = () => {
    if (editMode) {
      updateDocument(originalDocument ?? emptyDocument, document);
    } else {
      addDocument(document);
    }

    navigate("/documents");
  };

  const handleCancel = () => {
    navigate("/documents");
  };

  const documentHasName = !!document.name;
  const documentHasUrl = !!document.url;
  const isFormValid = documentHasUrl && documentHasName;
  return (
    <Card className="panel panel-default">
      <Card.Body className="panel-body">
        <form id="document-edit" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-12 form-group">
              <label htmlFor="name">Document Title:</label>
              <input
                required
                type="text"
                id="name"
                className={`form-control ${documentHasName ? "" : "invalid"}`}
                size={120}
                max="120"
                value={document.name}
                onChange={(event) =>
                  setDocument((prevState) => ({
                    ...prevState,
                    name: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 form-group">
              <label htmlFor="description">Document Description:</label>
              <input
                type="text"
                id="description"
                className="form-control"
                size={120}
                max="255"
                value={document.description}
                onChange={(event) =>
                  setDocument((prevState) => ({
                    ...prevState,
                    description: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 form-group">
              <label htmlFor="url">Document URL:</label>
              <input
                required
                type="text"
                id="url"
                className={`form-control ${documentHasUrl ? "" : "invalid"}`}
                size={150}
                max="255"
                value={document.url}
                onChange={(event) =>
                  setDocument((prevState) => ({
                    ...prevState,
                    url: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          {isFormValid ? null : (
            <Alert variant="danger">
              The Document Title and Document URL are required fields.
            </Alert>
          )}

          <div className="row">
            <div className="col-xs-12 btn-toolbar">
              <Button
                className="btn btn-success"
                variant="success"
                type="submit"
                disabled={!isFormValid}
              >
                Save
              </Button>
              <Button
                className="btn btn-primary"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Card.Body>
    </Card>
  );
};
