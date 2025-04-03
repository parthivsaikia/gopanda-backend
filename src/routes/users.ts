import { Router } from "express";

import {
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
  // getUser,
} from "../controllers/user";
import { isSelf, requireJwtAuth } from "../utils/middlewares";



const userRouter = Router();
// TODO this or requireJwtAuth
userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);
userRouter.put("/:id", requireJwtAuth, isSelf, editUser);
userRouter.delete("/:id", requireJwtAuth, isSelf, deleteUser);

export default userRouter;
