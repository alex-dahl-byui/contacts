import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { ContactItem } from "../contact-item/ContactItem.tsx";
import { ContactContext } from "../hooks/contact.tsx";
import Nav from "react-bootstrap/Nav";
import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";

export const ContactList = () => {
  const { contacts } = useContext(ContactContext);
  const [search, setSearch] = useState("");

  return (
    <Card>
      <Card.Header as="h5">
        <Container>
          <div className="row">
            <span className="pad-left-right">Contacts</span>
          </div>
          <Container className="d-flex justify-content-between align-items-center">
            <Form.Control
              type="email"
              placeholder="search"
              size="sm"
              onChange={(event) => setSearch(event.target.value)}
            />
            <Nav.Link href="/contacts/new">
              <Button
                variant="success"
                size="sm"
                style={{ minWidth: "102px", marginLeft: "10px" }}
              >
                New Contact
              </Button>
            </Nav.Link>
          </Container>
        </Container>
      </Card.Header>
      <Card.Body>
        {contacts
          .filter((contact) =>
            contact.name.toLowerCase().includes(search.toLowerCase()),
          )
          .map((contact) => (
            <ContactItem contact={contact} key={contact.id} />
          ))}
      </Card.Body>
    </Card>
  );
};
