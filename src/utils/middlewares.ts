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
  } catch {
    return res.status(500).json({ error: "server error" });
  }
};

export const requireJwtAuth = passport.authenticate("jwt", {
  session: false,
}) as RequestHandler;
