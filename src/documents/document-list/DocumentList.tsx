import "./DocumentList.css";
import Card from "react-bootstrap/Card";
import { Document } from "../types.ts";
import { DocumentItem } from "../document-item/DocumentItem.tsx";
import Container from "react-bootstrap/Container";

interface DocumentListProps {
  setDocument: (document: Document) => void;
}

export const DocumentList = ({ setDocument }: DocumentListProps) => {
  const documents: Document[] = [
    {
      name: "CIT 260 - Object Oriented Programming",
      description:
        "Yawl overhaul scourge of the seven seas pink plunder loaded to the gunwalls Sink me rope's end man-of-war Corsair bring a spring upon her cable come about salmagundi dead men tell no tales lookout. Gold Road scourge of the seven seas galleon yard swing the lead lookout Sea Legs lass topmast holystone parrel plunder fore gun tender. ",
      url: "https://example.com/",
      id: 1,
    },
    {
      name: "CIT 366 - Full Web Stack Development",
      description:
        "Yawl overhaul scourge of the seven seas pink plunder loaded to the gunwalls Sink me rope's end man-of-war Corsair bring a spring upon her cable come about salmagundi dead men tell no tales lookout. Gold Road scourge of the seven seas galleon yard swing the lead lookout Sea Legs lass topmast holystone parrel plunder fore gun tender. ",
      url: "https://example.com/",
      id: 2,
    },
    {
      name: "CIT 425 - Data Warehousing",
      description:
        "Yawl overhaul scourge of the seven seas pink plunder loaded to the gunwalls Sink me rope's end man-of-war Corsair bring a spring upon her cable come about salmagundi dead men tell no tales lookout. Gold Road scourge of the seven seas galleon yard swing the lead lookout Sea Legs lass topmast holystone parrel plunder fore gun tender. ",
      url: "https://example.com/",
      id: 3,
    },
    {
      name: "CIT 460 - Enterprise Development",
      description:
        "Yawl overhaul scourge of the seven seas pink plunder loaded to the gunwalls Sink me rope's end man-of-war Corsair bring a spring upon her cable come about salmagundi dead men tell no tales lookout. Gold Road scourge of the seven seas galleon yard swing the lead lookout Sea Legs lass topmast holystone parrel plunder fore gun tender. ",
      url: "https://example.com/",
      id: 4,
    },
    {
      name: "CIT 495 - Senior Practicum",
      description:
        "Yawl overhaul scourge of the seven seas pink plunder loaded to the gunwalls Sink me rope's end man-of-war Corsair bring a spring upon her cable come about salmagundi dead men tell no tales lookout. Gold Road scourge of the seven seas galleon yard swing the lead lookout Sea Legs lass topmast holystone parrel plunder fore gun tender. ",
      url: "https://example.com/",
      id: 5,
    },
  ];

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
          {documents.map((document) => (
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
