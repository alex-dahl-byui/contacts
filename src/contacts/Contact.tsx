import Container from "react-bootstrap/Container";
import { ContactList } from "./contact-list/ContactList.tsx";
import { Outlet } from "react-router-dom";
import { ContactContextProvider } from "./hooks/contact.tsx";

export const Contact = () => {
  return (
    <ContactContextProvider>
      <Container className="row">
        <Container className="col-md-5">
          <ContactList />
        </Container>
        <Container className="col-md-4">
          <Outlet />
        </Container>
      </Container>
    </ContactContextProvider>
  );
};
