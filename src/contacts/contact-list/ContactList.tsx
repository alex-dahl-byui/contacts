import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { ContactItem } from "../contact-item/ContactItem.tsx";
import { ContactContext } from "../hooks/contact.tsx";
import Nav from "react-bootstrap/Nav";
import { useContext } from "react";

export const ContactList = () => {
  const { contacts } = useContext(ContactContext);

  return (
    <Card>
      <Card.Header as="h5">
        <Container className="d-flex justify-content-between align-items-center">
          <span>Contacts</span>
          <Nav.Link href="/contacts/new">
            <Button variant="success" size="sm">
              New Contact
            </Button>
          </Nav.Link>
        </Container>
      </Card.Header>
      <Card.Body>
        {contacts.map((contact) => (
          <ContactItem contact={contact} key={contact.id} />
        ))}
      </Card.Body>
    </Card>
  );
};
