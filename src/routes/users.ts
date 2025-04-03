import { Router } from "express";
import { createUser, deleteUser, editUser, getAllUsers, getUser } from "../controllers/user";
import { isSelf, requireJwtAuth } from "../utils/middlewares";

const userRouter = Router();

userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);
userRouter.put("/:id", editUser);
userRouter.delete("/:id", deleteUser)
userRouter.get("/:id", requireJwtAuth, isSelf, getUser)
export default userRouter;
