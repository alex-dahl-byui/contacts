import Container from "react-bootstrap/Container";
import { ContactList } from "./contact-list/ContactList.tsx";
import { ContactDetail } from "./contact-detail/ContactDetail.tsx";
import { useState } from "react";
import { IContact } from "./types.ts";

export const Contact = () => {
  const [currentContact, setCurrentContact] = useState<undefined | IContact>();

  return (
    <Container className="row">
      <Container className="col-md-5">
        <ContactList setContact={setCurrentContact} />
      </Container>
      <Container className="col-md-4">
        <ContactDetail contact={currentContact} />
      </Container>
    </Container>
  );
};
