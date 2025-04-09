import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { getProfileAction } from "../actions/profiles";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const requestUser = req.user as User;
    const user = await getProfileAction(id);
    if (!user) {
      res.status(404).json({ error: "profile not found." });
      return;
    }
    if (user.id === BigInt(requestUser.id) || user.role === "TravelAgent") {
      return res.json(user);
    }
    res.status(405).json("Cannot view other's profile.");
  } catch (error) {
    next(error);
  }
};
