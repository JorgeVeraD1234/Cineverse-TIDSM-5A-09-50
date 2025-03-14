import React, { useState, useEffect } from "react";
import axios from "axios";

const MoviesCrud = () => {
  const [movies, setMovies] = useState([]); // Estado para almacenar todas las películas
  const [movie, setMovie] = useState(null); // Estado para almacenar una película específica
  const [newMovie, setNewMovie] = useState({
    title: "",
    genre: "",
    releaseDate: "",
    rating: "",
    description: "",
  }); // Estado para los datos de una nueva película
  const [selectedMovieId, setSelectedMovieId] = useState(""); // ID de película para ver/actualizar/eliminar

  // Obtener todas las películas
  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/movies/get");
      setMovies(response.data);
    } catch (error) {
      console.error("Error al obtener las películas:", error);
    }
  };

  // Obtener una sola película por ID
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
      const response = await axios.post("http://localhost:3000/api/movies/create", newMovie);
      alert("¡Película creada con éxito!");
      setNewMovie({
        title: "",
        genre: "",
        releaseDate: "",
        rating: "",
        description: "",
      });
      fetchMovies(); // Refrescar la lista de películas
    } catch (error) {
      console.error("Error al crear la película:", error);
    }
  };

  // Actualizar una película
  const updateMovie = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/movies/update/${selectedMovieId}`, newMovie);
      alert("¡Película actualizada con éxito!");
      fetchMovies(); // Refrescar la lista de películas
    } catch (error) {
      console.error("Error al actualizar la película:", error);
    }
  };

  // Eliminar una película
  const deleteMovie = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/movies/delete/${selectedMovieId}`);
      alert("¡Película eliminada con éxito!");
      fetchMovies(); // Refrescar la lista de películas
    } catch (error) {
      console.error("Error al eliminar la película:", error);
    }
  };

  // Obtener las películas al cargar el componente
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestión de Películas</h1>

      {/* Crear una nueva película */}
      <section>
        <h2>Crear Película</h2>
        <form onSubmit={createNewMovie}>
          <input
            type="text"
            placeholder="Título"
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Género"
            value={newMovie.genre}
            onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
            required
          />
          <input
            type="date"
            value={newMovie.releaseDate}
            onChange={(e) => setNewMovie({ ...newMovie, releaseDate: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Calificación"
            value={newMovie.rating}
            onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
            required
          />
          <textarea
            placeholder="Descripción"
            value={newMovie.description}
            onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
            required
          />
          <button type="submit">Crear</button>
        </form>
      </section>

      {/* Ver todas las películas */}
      <section>
        <h2>Lista de Películas</h2>
        <ul>
          {movies.map((movie) => (
            <li key={movie._id}>
              {movie.title} - {movie.genre}
            </li>
          ))}
        </ul>
      </section>

      {/* Ver una película específica */}
      <section>
        <h2>Ver Película</h2>
        <input
          type="text"
          placeholder="ID de la película"
          value={selectedMovieId}
          onChange={(e) => setSelectedMovieId(e.target.value)}
        />
        <button onClick={fetchMovieById}>Buscar</button>
        {movie && (
          <div>
            <h3>{movie.title}</h3>
            <p>Género: {movie.genre}</p>
            <p>Fecha de lanzamiento: {movie.releaseDate}</p>
            <p>Calificación: {movie.rating}</p>
            <p>Descripción: {movie.description}</p>
          </div>
        )}
      </section>

      {/* Actualizar una película */}
      <section>
        <h2>Actualizar Película</h2>
        <form onSubmit={updateMovie}>
          <input
            type="text"
            placeholder="ID de la película a actualizar"
            value={selectedMovieId}
            onChange={(e) => setSelectedMovieId(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nuevo título"
            value={newMovie.title}
            onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Nuevo género"
            value={newMovie.genre}
            onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
          />
          <input
            type="date"
            placeholder="Nueva fecha de lanzamiento"
            value={newMovie.releaseDate}
            onChange={(e) => setNewMovie({ ...newMovie, releaseDate: e.target.value })}
          />
          <input
            type="number"
            placeholder="Nueva calificación"
            value={newMovie.rating}
            onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
          />
          <textarea
            placeholder="Nueva descripción"
            value={newMovie.description}
            onChange={(e) => setNewMovie({ ...newMovie, description: e.target.value })}
          />
          <button type="submit">Actualizar</button>
        </form>
      </section>

      {/* Eliminar una película */}
      <section>
        <h2>Eliminar Película</h2>
        <input
          type="text"
          placeholder="ID de la película a eliminar"
          value={selectedMovieId}
          onChange={(e) => setSelectedMovieId(e.target.value)}
        />
        <button onClick={deleteMovie}>Eliminar</button>
      </section>
    </div>
  );
};

export default MoviesCrud;
