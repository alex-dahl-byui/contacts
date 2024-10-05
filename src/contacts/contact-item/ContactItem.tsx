import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { IContact } from "../types.ts";

interface ContactItemProps {
  contact: IContact;
}
export const ContactItem = ({ contact }: ContactItemProps) => {
  return (
    <Card key={contact.id}>
      <Card.Body>
        <Container className="d-flex justify-content-between align-items-center">
          <Card.Title as="h6">{contact.name}</Card.Title>
          <img src={contact.imageUrl} alt={contact.name} height={150} />
        </Container>
      </Card.Body>
    </Card>
  );
};
