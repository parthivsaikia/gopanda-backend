import { Router } from "express";
import { getProfile } from "../controllers/profile";
const profileRouter = Router();
profileRouter.get("/:id", getProfile);

export default profileRouter;