import React, { useState } from "react";
import { Container, Card, Button, Modal, Form } from "react-bootstrap";

const MovieReseña = () => {
    const [showModal, setShowModal] = useState(false);
    const [review, setReview] = useState("");

    const verTrailer = () => {
        window.open("https://youtu.be/3QbfHIKyd4I?si=wojcTiOiziNSsiq3", "_blank");
    };

    const mostrarFormulario = () => {
        setShowModal(true);
    };

    const cerrarFormulario = () => {
        setShowModal(false);
    };

    const guardarResena = () => {
        if (review.trim() !== "") {
            alert(`Reseña guardada: ${review}`);
            setReview(""); // Limpiar el campo de texto
            cerrarFormulario(); // Cerrar el formulario después de guardar
        } else {
            alert("Escribe una reseña antes de guardar.");
        }
    };

    return (
        <Container className="mt-4">
            {/* Header */}
            <header className="mb-4 text-center">
                <img
                    src="abismo-secreto.jpg"
                    alt="El Abismo Secreto"
                    style={{ maxWidth: "100%", height: "auto" }}
                />
            </header>

            {/* Información */}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>El Abismo Secreto</Card.Title>
                    <Card.Text>
                        <strong>Fecha de estreno:</strong> 14 de febrero de 2025
                    </Card.Text>
                    <Card.Text>
                        Mandan a dos operativos de élite (Anya Taylor-Joy y Miles Teller) a
                        vigilar lados opuestos de un misterioso abismo y allí intiman desde
                        la distancia, pero deberán aunar fuerzas para sobrevivir al mal que
                        esconde el abismo.
                    </Card.Text>
                </Card.Body>
            </Card>

            {/* Botones de acción */}
            <div className="d-flex justify-content-center mb-4">
                <Button variant="primary" className="me-2" onClick={verTrailer}>
                    Ver Tráiler
                </Button>
                <Button variant="secondary" onClick={mostrarFormulario}>
                    Agregar Reseña
                </Button>
            </div>

            {/* Modal para agregar reseña */}
            <Modal show={showModal} onHide={cerrarFormulario}>
                <Modal.Header closeButton>
                    <Modal.Title>Escribe tu reseña</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Tu reseña</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Escribe aquí tu reseña..."
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cerrarFormulario}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={guardarResena}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default MovieReseña

//hecho por Brian Calvario y corregido por Jorge Vera