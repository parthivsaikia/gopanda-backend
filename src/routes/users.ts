import { Router } from "express";
import { createUser, editUser, getAllUsers } from "../controllers/user";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);
userRouter.put("/:id", editUser);
export default userRouter;
