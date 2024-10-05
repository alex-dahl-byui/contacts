import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { IContact } from "../types.ts";
import Button from "react-bootstrap/Button";

interface ContactDetailProps {
  contact?: IContact;
}

export const ContactDetail = ({ contact }: ContactDetailProps) => {
  return (
    <Card>
      <Card.Header as="h5">
        <Container>{contact?.name}</Container>
        <Container className="d-flex justify-content-between align-items-center">
          <Container>
            <img src={contact?.imageUrl} alt={contact?.name} height={150} />
          </Container>
          <Container>
            <Button variant="primary">Edit</Button>
            <Button variant="danger">Delete</Button>
          </Container>
        </Container>
      </Card.Header>
      <Card.Body>
        <Container>
          <strong>Email: </strong>
          {contact?.email}
        </Container>
        <Container>
          <strong>Phone: </strong>
          {contact?.phone}
        </Container>
      </Card.Body>
    </Card>
  );
};
