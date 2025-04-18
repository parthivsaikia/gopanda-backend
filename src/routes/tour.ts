import { Router } from "express";
import { createTour, deleteTour, getAllTours, getTour, updateTour } from "../controllers/tour";
import { isAgent, isSelf, requireJwtAuth } from "../utils/middlewares";
const tourRouter = Router();

tourRouter.get("/", getAllTours);
tourRouter.post("/", requireJwtAuth, isAgent, isSelf, createTour);
tourRouter.put("/:id", requireJwtAuth, isSelf, updateTour);
tourRouter.delete("/:id", requireJwtAuth, isSelf, deleteTour);
tourRouter.get("/:id", getTour);

export default tourRouter;
