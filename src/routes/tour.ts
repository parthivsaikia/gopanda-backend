import { Router } from "express";
import { createTour, getAllTours } from "../controllers/tour";
import { isAgent, requireJwtAuth } from "../utils/middlewares";
const tourRouter = Router();

tourRouter.get("/", getAllTours);
tourRouter.post("/", requireJwtAuth, isAgent, createTour)

export default tourRouter;
