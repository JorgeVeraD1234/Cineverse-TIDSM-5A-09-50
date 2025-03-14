import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const MyNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token del almacenamiento local o de sesión
    localStorage.removeItem("token");

    // Redirigir al usuario a la pantalla de inicio de sesión
    navigate("/");
  };

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
          {/* Botón de Logout */}
          <Nav>
            <Nav.Link onClick={handleLogout} style={{ color: "#f44336", cursor: "pointer" }}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
