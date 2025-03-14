import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en el registro");
      }

      setSuccess(true);
      setError(null);
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      setSuccess(false);
      setError(error.message);
    }
  };

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: "30rem" }} className="p-4 shadow">
        <Card.Body>
          <Card.Title className="text-center mb-4">Formulario de Registro</Card.Title>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">¡Usuario creado con éxito!</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ingrese su nombre"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingrese su correo electrónico"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingrese su contraseña"
                required
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Registrarse
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterForm;