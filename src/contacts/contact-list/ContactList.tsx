import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { IContact } from "../types.ts";
import { ContactItem } from "../contact-item/ContactItem.tsx";

interface ContactListProps {
  setContact: (contact: IContact) => void;
}

export const ContactList = ({ setContact }: ContactListProps) => {
  const contacts: IContact[] = [
    {
      id: "1",
      name: "R. Kent Jackson",
      email: "jacksonk@byui.edu",
      phone: "208-496-3771",
      imageUrl: "images/jacksonk.jpg",
      group: null,
    },
    {
      id: "2",
      name: "Rex Barzee",
      email: "barzeer@byui.edu",
      phone: "208-496-3768",
      imageUrl: "/images/barzeer.jpg",
      group: null,
    },
  ];
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
        {contacts.map((contact) => (
          <span onClick={() => setContact(contact)}>
            <ContactItem contact={contact} />
          </span>
        ))}
      </Card.Body>
    </Card>
  );
};
