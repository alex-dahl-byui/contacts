import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { IContact } from "../types.ts";
import { ContactItem } from "../contact-item/ContactItem.tsx";
import { useGetContacts } from "../hooks/contact.ts";

interface ContactListProps {
  setContact: (contact: IContact) => void;
}

export const ContactList = ({ setContact }: ContactListProps) => {
  const { getContacts } = useGetContacts();

  return (
    <Card>
      <Card.Header as="h5">
        <Container className="d-flex justify-content-between align-items-center">
          <span>Contacts</span>
          <Button variant="success" size="sm">
            New Contact
          </Button>
        </Container>
      </Card.Header>
      <Card.Body>
        {getContacts().map((contact) => (
          <span onClick={() => setContact(contact)}>
            <ContactItem contact={contact} />
          </span>
        ))}
      </Card.Body>
    </Card>
  );
};
