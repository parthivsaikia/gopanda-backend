import { Request, Response } from "express";
import { SignupUser } from "../utils/types";
import bcrypt from "bcrypt";
import { storeUser, getUsers } from "../actions/users";

export const createUser = async (
  req: Request<unknown, unknown, SignupUser>,
  res: Response,
) => {
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
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(password, saltRound);
  try {
    const user = await storeUser({
      username,
      name,
      password: hashedPassword,
      email,
      mobileNumber,
      state,
      country,
      role,
    });
    res.json(user);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `Error in creating user : ${error.message}`
        : `unknown error`;
    res.status(400).json(errorMessage);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await getUsers();
  res.json(users);
};
