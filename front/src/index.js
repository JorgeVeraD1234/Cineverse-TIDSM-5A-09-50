import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import FilterMovie from "./MovieM";
import RegisterForm from "./RegisterForm";
import MoviesData from "./moviesData";
import MovieReseña from "./reseñamovie";
import "bootstrap/dist/css/bootstrap.min.css";

// Configura las rutas
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/Inicio",
    element: <MoviesData />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/Reseña",
    element: <MovieReseña />,
  },
]);

// Renderiza la aplicación con RouterProvider
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={routes} />);
