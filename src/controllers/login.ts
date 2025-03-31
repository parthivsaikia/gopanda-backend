import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  const authenticateMiddleware = passport.authenticate(
    "local",
    { session: false },
    (
      err: Error | null,
      user: User | false,
      info: { message: string } | undefined,
    ) => {
      if (err) {
        console.log("login error: ", err);
        return next(err);
      }
      if (!user) {
        console.log("Login failed: ", info?.message);
        return res
          .status(401)
          .json({ message: info?.message || "Authentication failed." });
      }
      req.logIn(user, { session: false }, (loginErr) => {
        if (loginErr) {
          console.log("Error attaching user to request: ", loginErr);
          return res.status(500).json({ message: "Login error" });
        }
        const payload = {
          sub: user.id.toString(),
          username: user.username,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET || "", {
          expiresIn: "1h",
        });
        console.log(`Login successfull for ${user.username}`);
        return res.json({
          message: "login successful",
          token: `Bearer ${token}`,
        });
      });
    },
  ) as (req: Request, res: Response, next: NextFunction) => void;
  authenticateMiddleware(req, res, next);
};
