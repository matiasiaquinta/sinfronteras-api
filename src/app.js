import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import alumnosRoutes from "./routes/alumnos.routes.js";
import planRoutes from "./routes/plan.routes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

// Middleware de CORS
app.use(
    cors({
        origin: FRONTEND_URL,
        methods: ["POST", "GET"],
        credentials: true,
    })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/alumnos", alumnosRoutes);
app.use("/api/planes", planRoutes);

// Ruta raíz para pruebas
app.get("/", (req, res) => {
    res.json("Hello");
});

export default app;
