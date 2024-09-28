import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Contact } from "../types.ts";

export const ContactList = () => {
  const contacts: Contact[] = [
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
        <>
          {contacts.map((contact) => (
            <Card key={contact.id}>
              <Card.Body>
                <Container className="d-flex justify-content-between align-items-center">
                  <Card.Title as="h6">{contact.name}</Card.Title>
                  <img src={contact.imageUrl} alt={contact.name} height={150} />
                </Container>
              </Card.Body>
            </Card>
          ))}
        </>
      </Card.Body>
    </Card>
  );
};
