import { Router } from "express";
import {
    createPlan,
    deletePlan,
    getPlan,
    getPlans,
    updatePlan,
} from "../controllers/plan.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createPlanSchema, editPlanSchema } from "../schemas/plan.schema.js";

const router = Router();

router.get("/", auth, getPlans);

router.post("/", auth, validateSchema(createPlanSchema), createPlan);

router.get("/:id", auth, getPlan);

router.put("/:id", auth, validateSchema(editPlanSchema), updatePlan);

router.delete("/:id", auth, deletePlan);

export default router;
