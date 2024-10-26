import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { IContact } from "../types.ts";
import Nav from "react-bootstrap/Nav";

interface ContactItemProps {
  contact: IContact;
}
export const ContactItem = ({ contact }: ContactItemProps) => {
  return (
    <Card key={contact.id}>
      <Card.Body>
        <Container className="d-flex justify-content-between align-items-center">
          <Nav.Link href={`/contacts/${contact.id}`}>
            <Card.Title as="h6">{contact.name}</Card.Title>
            {contact.imageUrl === " " ? null : (
              <img src={contact.imageUrl} alt={contact.name} height={150} />
            )}
          </Nav.Link>
        </Container>
      </Card.Body>
    </Card>
  );
};
