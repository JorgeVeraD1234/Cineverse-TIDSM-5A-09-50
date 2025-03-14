import React, { useState } from "react";
import { Card, Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const RegisterForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeRegister = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envía los datos al backend
      const response = await axios.post("http://localhost:3000/api/users/register", data);
      console.log("Usuario creado exitosamente:", response.data); // Imprime la respuesta del backend
      alert("¡Registro exitoso!"); // Mensaje de éxito al usuario
    } catch (error) {
      console.error("Error al crear el usuario:", error.response?.data || error.message);
      alert("Error al crear el usuario. Por favor, verifica los datos e intenta de nuevo.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: "500px" }} className="shadow-lg">
        <Card.Body className="p-4">
          <Card.Title>Formulario de Registro de Usuario</Card.Title>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                name="name"
                type="text"
                value={data.name}
                onChange={onChangeRegister}
                placeholder="Ingresa tu nombre"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={data.email}
                onChange={onChangeRegister}
                placeholder="Ingresa tu correo electrónico"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={data.password}
                onChange={onChangeRegister}
                placeholder="Ingresa tu contraseña"
              />
            </Form.Group>
            <Button className="mt-3" type="submit">
              Registrarse
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterForm;
