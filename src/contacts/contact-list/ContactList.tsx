import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { ContactItem } from "../contact-item/ContactItem.tsx";
import { useGetContacts } from "../hooks/contact.ts";
import Nav from "react-bootstrap/Nav";

export const ContactList = () => {
  const { getContacts } = useGetContacts();

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
        {getContacts().map((contact) => (
          <ContactItem contact={contact} />
        ))}
      </Card.Body>
    </Card>
  );
};
