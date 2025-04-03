import { Router } from "express";
<<<<<<< HEAD
import {
  createUser,
  deleteUser,
  editUser,
  getAllUsers,
  // getUser,
} from "../controllers/user";
import { isSelf, requireJwtAuth } from "../utils/middlewares";
=======
import { createUser, deleteUser, editUser, getAllUsers } from "../controllers/user";
>>>>>>> 62b7d79 (add delete route to user router.)

const userRouter = Router();
// TODO this or requireJwtAuth
userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);
<<<<<<< HEAD
userRouter.put("/:id", requireJwtAuth, isSelf, editUser);
userRouter.delete("/:id", requireJwtAuth, isSelf, deleteUser);
=======
userRouter.put("/:id", editUser);
userRouter.delete("/:id", deleteUser)
>>>>>>> 62b7d79 (add delete route to user router.)
export default userRouter;
