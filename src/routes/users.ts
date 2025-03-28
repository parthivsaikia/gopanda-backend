import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/user";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);
export default userRouter;
