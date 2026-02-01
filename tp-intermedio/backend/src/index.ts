import express, { Request, Response } from "express";
import path from "path";

import "dotenv/config";
import authRoutes from "./routes/auth.routes";
import categoriesRoutes from "./routes/categories.routes";
import productsRoutes from "./routes/product.routes";
import { authenticate, authorize } from "./middlewares/auth.middleware";
import { connectDB } from "./config/database";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/auth", authRoutes);

app.get("/public", (req: Request, res: Response) => {
  res.json({
    message: "Cualquiera puede entrar!",
  });
});

app.get("/protected", authenticate, (req, res) => {
  res.json({
    message: "Acceso permitido",
  });
});

// Ruta de administrador (requiere autenticación y rol admin)
app.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
  res.json({
    message: "Acceso de administrador permitido",
  });
});

app.get("/api/saludo", (req: Request, res: Response) => {
  res.json({ mensaje: "Hola desde la API 🚀" });
});

app.use("/api/categoria", categoriesRoutes);
app.use("/api/producto", productsRoutes);

// Conectar a MongoDB y luego iniciar el servidor HTTP
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
  });
});
