import { Router } from "express";
import { createUser, deleteUser, editUser, getAllUsers } from "../controllers/user";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);
userRouter.put("/:id", editUser);
userRouter.delete("/:id", deleteUser)
export default userRouter;
