import { Router } from "express";
import { welcome } from "../controllers/welcome";

const router = Router();

router.get("/", welcome);

export default router;
