import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useGetContacts } from "../hooks/contact.ts";
import Nav from "react-bootstrap/Nav";

export const ContactDetail = () => {
  const { id } = useParams();
  const { getContact, deleteContact } = useGetContacts();
  const contact = getContact(id ?? "");
  const navigate = useNavigate();

  return (
    <Card>
      <Card.Header as="h5">
        <Container>{contact?.name}</Container>
        <Container className="d-flex justify-content-between align-items-center">
          <Container>
            <img src={contact?.imageUrl} alt={contact?.name} height={150} />
          </Container>
          <Container>
            <Nav.Link href={`/contacts/${contact?.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Nav.Link>
            <Button
              variant="danger"
              onClick={() => {
                deleteContact(contact);
                navigate("/contacts");
              }}
            >
              Delete
            </Button>
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
