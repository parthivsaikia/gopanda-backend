import { Request, Response } from "express";
import { SignupUser } from "../utils/types";
import { auth } from "../lib/auth";
import { createUser } from "../actions/users";

export const userSignup = async (
  req: Request<unknown, unknown, SignupUser>,
  res: Response,
): Promise<void> => {
  const {
    username,
    name,
    password,
    email,
    mobileNumber,
    state,
    country,
    role,
  } = req.body;

  try {
    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      asResponse: true,
    });
    await createUser({
      username,
      name,
      password,
      email,
      mobileNumber,
      state,
      country,
      role,
    });
    res.json(response);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Signup failed due to unknown error.";
    res.status(500).json(errorMessage);
  }
};
