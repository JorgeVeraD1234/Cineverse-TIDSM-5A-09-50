import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import cors from "cors";
import routes from "./otros/routes.js"; // Archivo de rutas único

configDotenv();

const app = express();
app.use(express.json());
app.use(cors());

// Usa las rutas combinadas
app.use("/api", routes);

mongoose.connect(process.env.URL)
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error conectando a MongoDB:", error));

app.listen(3000, () => {
  console.log("El servidor se está ejecutando en el puerto 3000");
});
