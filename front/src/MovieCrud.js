import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button, Table } from "react-bootstrap";
import MyNavbar from "./Navbar";
const MoviesCrud = () => {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [newMovie, setNewMovie] = useState({
    title: "",
    genre: "",
    releaseDate: "",
    rating: "",
    description: "",
  });
  const [selectedMovieId, setSelectedMovieId] = useState("");

  // Obtener todas las películas
  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/movies/get");
      setMovies(response.data);
    } catch (error) {
      console.error("Error al obtener las películas:", error);
    }
  };

  // Obtener una película por ID
  const fetchMovieById = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/movies/get/${selectedMovieId}`);
      setMovie(response.data);
    } catch (error) {
      console.error("Error al obtener la película:", error);
    }
  };

  // Crear una nueva película
  const createNewMovie = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/movies/create", newMovie);
      alert("¡Película creada con éxito!");
      setNewMovie({
        title: "",
        genre: "",
        releaseDate: "",
        rating: "",
        description: "",
      });
      fetchMovies();
    } catch (error) {
      console.error("Error al crear la película:", error);
    }
  };

  // Actualizar una película
  const updateMovie = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/movies/update/${selectedMovieId}`, newMovie);
      alert("¡Película actualizada con éxito!");
      fetchMovies();
    } catch (error) {
      console.error("Error al actualizar la película:", error);
    }
  };

  // Eliminar una película
  const deleteMovie = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/movies/delete/${selectedMovieId}`);
      alert("¡Película eliminada con éxito!");
      fetchMovies();
    } catch (error) {
      console.error("Error al eliminar la película:", error);
    }
  };

  // Obtener las películas al cargar el componente
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Container>
          <MyNavbar />
      <h1 className="my-4 text-center">Gestión de Películas</h1>

      {/* Crear una nueva película */}
      <Card className="mb-4">
        <Card.Header>Crear Película</Card.Header>
        <Card.Body>
          <Form onSubmit={createNewMovie}>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Título"
                    value={newMovie.title}
                    onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Género</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Género"
                    value={newMovie.genre}
                    onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Fecha de lanzamiento</Form.Label>
                  <Form.Control
                    type="date"
                    value={newMovie.releaseDate}
                    onChange={(e) => setNewMovie({ ...newMovie, releaseDate: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Calificación</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Calificación"
                    value={newMovie.rating}
                    onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Descripción"
                    value={newMovie.description}
                    onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
                    rows={2}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="mt-3">
              Crear Película
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Ver todas las películas */}
      <Card className="mb-4">
        <Card.Header>Lista de Películas</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Título</th>
                <th>Género</th>
                <th>Fecha de lanzamiento</th>
                <th>Calificación</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre}</td>
                  <td>{movie.releaseDate}</td>
                  <td>{movie.rating}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Ver una película específica */}
      <Card className="mb-4">
        <Card.Header>Ver Película</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="ID de la película"
                value={selectedMovieId}
                onChange={(e) => setSelectedMovieId(e.target.value)}
              />
            </Form.Group>
            <Button variant="info" onClick={fetchMovieById} className="mt-3">
              Buscar
            </Button>
          </Form>
          {movie && (
            <div className="mt-3">
              <h5>{movie.title}</h5>
              <p>Género: {movie.genre}</p>
              <p>Fecha de lanzamiento: {movie.releaseDate}</p>
              <p>Calificación: {movie.rating}</p>
              <p>Descripción: {movie.description}</p>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Actualizar una película */}
      <Card className="mb-4">
        <Card.Header>Actualizar Película</Card.Header>
        <Card.Body>
          <Form onSubmit={updateMovie}>
            <Form.Group>
              <Form.Label>ID de la película</Form.Label>
              <Form.Control
                type="text"
                placeholder="ID"
                value={selectedMovieId}
                onChange={(e) => setSelectedMovieId(e.target.value)}
              />
            </Form.Group>
            <Button variant="warning" type="submit" className="mt-3">
              Actualizar
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Eliminar una película */}
      <Card>
        <Card.Header>Eliminar Película</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>ID de la película</Form.Label>
              <Form.Control
                type="text"
                placeholder="ID"
                value={selectedMovieId}
                onChange={(e) => setSelectedMovieId(e.target.value)}
              />
            </Form.Group>
            <Button variant="danger" onClick={deleteMovie} className="mt-3">
              Eliminar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MoviesCrud;
