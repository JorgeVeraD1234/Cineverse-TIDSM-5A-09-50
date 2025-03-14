import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import FilterMovie from "./MovieM";
import RegisterForm from "./RegisterForm";
import MoviesData from "./moviesData";
import MovieReseña from "./reseñamovie";
import MoviesCrud from "./MovieCrud";

// Configura las rutas
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Home",
    element: <MoviesData />,
  },
  {
    path: "/Register",
    element: <RegisterForm />,
  },
  {
    path: "/Review",
    element: <MovieReseña />,
  },
  {
    path: "/Movies",
    element: <MoviesCrud />,
  }
]);

// Renderiza la aplicación con RouterProvider
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routes} />);

//hecho por Brian Calvario y corregido por Jorge Vera