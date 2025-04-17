import { Router } from "express";
import { getProfile } from "../controllers/profile";
import { requireJwtAuth } from "../utils/middlewares";
const profileRouter = Router();
profileRouter.get("/:id", requireJwtAuth, getProfile);

export default profileRouter;
