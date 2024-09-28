import Container from "react-bootstrap/Container";
import { ContactList } from "./contact-list/ContactList.tsx";
import { ContactDetail } from "./contact-detail/ContactDetail.tsx";

export const Contact = () => {
  return (
    <Container className="row">
      <Container className="col-md-5">
        <ContactList />
      </Container>
      <Container className="col-md-4">
        <ContactDetail />
      </Container>
    </Container>
  );
};
