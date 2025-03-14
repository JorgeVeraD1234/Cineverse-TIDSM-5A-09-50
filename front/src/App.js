import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const App = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  }); // Estado para almacenar los datos del formulario
  const [error, setError] = useState(""); // Estado para manejar mensajes de error
  const navigate = useNavigate(); // Hook de React Router para redireccionar

  // Manejar cambios en los campos del formulario
  const onChangeLogin = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Enviar datos del formulario al backend
  const onSubmitData = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos

    try {
      const res = await axios.post("http://localhost:3000/api/users/login", data); // Llamada al backend
      const user = res.data.user; // Datos del usuario obtenidos desde el backend
      localStorage.setItem("user", JSON.stringify(user)); // Guardar usuario en LocalStorage

      // Navegar a la página de inicio después del inicio de sesión exitoso
      navigate("/Home");
    } catch (error) {
      // Mostrar errores si la autenticación falla
      if (error.response && error.response.data) {
        setError(error.response.data.message); // Mensaje personalizado del backend
      } else {
        setError("Ocurrió un error. Por favor, inténtalo de nuevo.");
      }
    }
  };

  return (
    <Container className="mt-3">
      <Card className="mb-5" style={{ width: "30rem", margin: "auto" }}>
        <Card.Body>
          <Card.Title className="text-center">Inicia Sesión</Card.Title>

          {/* Mostrar errores si los hay */}
          {error && <p className="text-danger text-center">{error}</p>}

          {/* Formulario de inicio de sesión */}
          <Form onSubmit={onSubmitData}>
            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo electrónico"
                name="email"
                value={data.email}
                onChange={onChangeLogin}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                name="password"
                value={data.password}
                onChange={onChangeLogin}
                required
              />
            </Form.Group>

            {/* Botón para enviar el formulario */}
            <Row className="text-center">
              <Col>
                <Button type="submit" variant="primary">
                  Ingresar
                </Button>
              </Col>
            </Row>
          </Form>

          {/* Enlace para el registro de nuevos usuarios */}
          <Row className="text-center mt-3">
            <Col>
              <p>
                ¿No tienes cuenta? <Link to="/Register">¡Regístrate!</Link>
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default App;
