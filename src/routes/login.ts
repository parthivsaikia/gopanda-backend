import { loginUser } from "../controllers/login";

import { Router } from "express";
import { Request, Response, NextFunction } from "express";

const loginRouter = Router();

loginRouter.post("/", (req: Request, res: Response, next: NextFunction) => {
  loginUser(req, res, next);
});

export default loginRouter;
