import { Router } from "express";
import { createTour, getAllTours, updateTour } from "../controllers/tour";
import { isAgent, isSelf, requireJwtAuth } from "../utils/middlewares";
const tourRouter = Router();

tourRouter.get("/", getAllTours);
tourRouter.post("/", requireJwtAuth, isAgent, createTour);
tourRouter.put("/:id", requireJwtAuth, isSelf, updateTour);

export default tourRouter;
