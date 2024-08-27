import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { DOMAIN, TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        //primero valido al usuario
        const userFound = await User.findOne({ email });
        if (userFound) {
            return res.status(400).json(["The email already exists"]);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        //guardo el usuario y creo el token
        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });

        // Configura la cookie
        //res.cookie("token", token, {
        //    httpOnly: true,
        //    secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
        //    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Necesario para cookies en diferentes dominios
        //});

        res.cookie("token", token);

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email });

        if (!userFound) {
            return res.status(400).json({ message: "User not found" });
        }

        //.compare devuelve true o false
        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = await createAccessToken({ id: userFound._id });

        // Configura la cookie
        //res.cookie("token", token, {
        //    httpOnly: true,
        //    secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
        //    sameSite: "strict", // Necesario para cookies en diferentes dominios
        //});

        //res.cookie("token", token);

        res.cookie("token", token, {
            domain: DOMAIN,
            secure: true,
            sameSite: "none",
        });

        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//verifica si el usuario existe
export const verifyToken = async (req, res) => {
    const { token } = req.cookies; // Lee el token de las cookies

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        // Verifica el token
        const decoded = jwt.verify(token, TOKEN_SECRET);
        const userFound = await User.findById(decoded.id);

        if (!userFound) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    } catch (error) {
        return res
            .status(401)
            .json({ message: "Unauthorized", error: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

//export const profile = async (req, res) => {
//    //console.log(req.user);
//    const userFound = await User.findById(req.user.id);
//
//    if (!userFound) return res.status(400).json({ message: "User not found" });
//
//    return res.json({
//        id: userFound._id,
//        username: userFound.username,
//        email: userFound.email,
//        createdAt: userFound.createdAt,
//        updatedAt: userFound.updatedAt,
//    });
//};
