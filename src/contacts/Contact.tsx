import Container from "react-bootstrap/Container";
import { ContactList } from "./contact-list/ContactList.tsx";
import { Outlet } from "react-router-dom";

export const Contact = () => {
  return (
    <Container className="row">
      <Container className="col-md-5">
        <ContactList />
      </Container>
      <Container className="col-md-4">
        <Outlet />
      </Container>
    </Container>
  );
};
