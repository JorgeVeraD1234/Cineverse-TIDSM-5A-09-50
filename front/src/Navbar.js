import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

const MyNavbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="Home">Mi Sitio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="Movies">Movies</Nav.Link>
            <Nav.Link href="#link">Enlace</Nav.Link>
            <NavDropdown title="Opciones" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Acción 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Acción 2</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">Otra acción</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
