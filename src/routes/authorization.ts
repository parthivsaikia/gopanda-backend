import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";
const authRouter = Router();

authRouter.all("/", toNodeHandler(auth));

export default authRouter;
