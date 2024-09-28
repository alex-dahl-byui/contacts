import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Header.css";

export const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#home">WeLearn CMS</Navbar.Brand>

        <Navbar.Collapse>
          <Nav className="me-auto navBarContainer">
            <Nav.Link href="#home">Documents</Nav.Link>
            <Nav.Link href="#link">Messages</Nav.Link>
            <Nav.Link href="#link2">Contacts</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <NavDropdown title="User" drop="start" className="dropdown-menu-end">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Container>
    </Navbar>
  );
};
