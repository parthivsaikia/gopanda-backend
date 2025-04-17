import { Request, Response, NextFunction, RequestHandler } from "express";
import { User } from "@prisma/client";
import passport from "passport";

export const isAgent = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User | undefined;
    if (!user) {
      return res.status(401).json("user not found.");
    }
    if (user.role === "TravelAgent") {
      return next();
    }
    return res.status(403).json({ error: "Not a travel agent" });
  } catch (error) {
    const errorMessage = error instanceof Error ? `error in validating agent: ${error.message}` : `unknown error in validating agent`
    throw new Error(errorMessage)
  }
};

export const requireJwtAuth = passport.authenticate("jwt", {
  session: false,
}) as RequestHandler;

export const isSelf = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user as User;
    if (!user) {
      return res.status(401).json("user not found");
    }
    if (user.id === BigInt(req.params.id)) {
      return next();
    }
    return res.status(403).json({ error: "Cannot view other's profile." });
  } catch (error) {
    const errorMessage = error instanceof Error ? `error in validating self : ${error.message}` : `unknown error in validating self`
    throw new Error(errorMessage)
  }

};
