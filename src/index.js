import app from "./app.js";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";

// Esto es para manejar las solicitudes en un entorno de servidorless
export default async function handler(req, res) {
    try {
        await connectDB();
        // Middleware para manejar las solicitudes
        app(req, res);
    } catch (error) {
        console.error("Error starting the server:", error);
        res.status(500).json({ error: "Server error" });
    }
}
