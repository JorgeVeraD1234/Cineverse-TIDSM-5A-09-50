import React, { useState } from "react";
import "./App.css";
import moviesData from "./moviesData";


const MovieCategory = ({ title, movies }) => {
  return (
    <div className="category">
      <h2>{title}</h2>
      <div className="movies-list">
        {movies.map((movie, index) => (
          <img key={index} src={movie.image} alt={movie.title} className="movie-poster" />
        ))}
      </div>
    </div>
  );
};
 
function FilterMovie() {
  const [search, setSearch] = useState("");

  // Filtrar películas por búsqueda
  const filteredCategories = moviesData
    .map((category) => ({
      ...category,
      movies: category.movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((category) => category.movies.length > 0);

  return (
    <div className="app">
      {/* 🔍 Barra de búsqueda */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar películas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* 🎬 Categorías de Películas */}
      {filteredCategories.length > 0 ? (
        filteredCategories.map((category, index) => (
          <MovieCategory key={index} title={category.title} movies={category.movies} />
        ))
      ) : (
        <p className="no-results">No se encontraron películas</p>
      )}
    </div>
  );
}

export default FilterMovie;

//hecho por Jesus Abraham Romo Montoya