import { Response, Router } from "express";
import { auth } from "../lib/auth";
import { Request } from "express";
import { fromNodeHeaders } from "better-auth/node";

const sessionRouter = Router();

sessionRouter.get("/");

export default sessionRouter;
