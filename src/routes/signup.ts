import { Request, Response, Router } from "express";
import { auth } from "../lib/auth";
import { SignupUser } from "../utils/types";
import prisma from "../../prisma/prisma-client";
const signUpRouter = Router();

signUpRouter.post(
  "/",
  async (
    req: Request<unknown, unknown, SignupUser>,
    res: Response,
  ): Promise<void> => {
    const { name, email, password } = req.body;
    try {
      const response = await auth.api.signUpEmail({
        body: {
          name,
          email,
          password,
        },
        asResponse: true,
      });
      prisma.user.create({
        data: {
          username: email,
        },
      });
      res.json(response);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Signup failed due to unknown error.";
      res.status(500).json(errorMessage);
    }
  },
);
