import { Router } from "express";
import { createBooking } from "../controllers/booking";
import { requireJwtAuth } from "../utils/middlewares";

const bookingRouter = Router()

bookingRouter.post("/", requireJwtAuth, createBooking)
export default bookingRouter;
