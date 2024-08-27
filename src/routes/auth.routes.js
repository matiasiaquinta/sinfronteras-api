import { Router } from "express";
import {
    login,
    logout,
    register,
    verifyToken,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", verifyToken);

export default router;
