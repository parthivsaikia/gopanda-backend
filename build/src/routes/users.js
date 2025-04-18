"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const middlewares_1 = require("../utils/middlewares");
const userRouter = (0, express_1.Router)();
userRouter.post("/", user_1.createUser);
userRouter.get("/", user_1.getAllUsers);
userRouter.put("/:id", middlewares_1.requireJwtAuth, middlewares_1.isSelf, user_1.editUser);
userRouter.delete("/:id", middlewares_1.requireJwtAuth, middlewares_1.isSelf, user_1.deleteUser);
userRouter.get("/:id", middlewares_1.requireJwtAuth, middlewares_1.isSelf, user_1.getUser);
exports.default = userRouter;
