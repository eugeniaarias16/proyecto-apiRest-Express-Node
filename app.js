import express, { json } from "express";
import cors from "cors";
import { bookRouter } from "./src/routes/books.js";

const app = express();
app.use(json());
app.disable("x-powered-by");

const PORT = process.env.PORT ?? 3001;

//Configuracion CORS avanzada
app.use(
    cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = ["http://localhost:3001"];

      if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS."));
    },
  })
);
// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("¡Bienvenido a mi API con Express!");
});

app.use("/books", bookRouter);

// middleware para rutas no encontradas
app.use((req, res) => {
  console.log(`Ruta no encontrada: ${req.method} ${req.url}`);
  res.status(404).json({ error: "Ruta no encontrada" });
});


//Iniacilizar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
