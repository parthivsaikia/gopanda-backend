import { Router } from "express";
import { userSignup } from "../controllers/user";
import { getAllUsers } from "../controllers/user";

const userRouter = Router();

userRouter.post("/", userSignup);
userRouter.get("/", getAllUsers);
export default userRouter;
