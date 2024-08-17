/*
    process.env.PORT -> es para que detecte el puerto del servidor.
*/

export const FRONTEND_URL =
    process.env.FRONTEND_URL || "https://sinfronteras.onrender.com";

export const PORT = process.env.PORT || 4000;
export const MONGODB_URI =
    process.env.MONGODB_URI
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "secret";

//export const TOKEN_SECRET = "some secret key";
