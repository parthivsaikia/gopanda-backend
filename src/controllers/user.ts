import { NextFunction, Request, Response } from "express";
import { UserInputUserDTO } from "../utils/types";
import bcrypt from "bcrypt";
import { storeUser, getUsers } from "../actions/users";

export const createUser = async (
  req: Request<unknown, unknown, UserInputUserDTO>,
  res: Response,
  next: NextFunction,
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
  if (!username || !password || !email) {
    // Use return here as it's a client error, not unexpected
    res
      .status(400)
      .json({ message: "Username, email, and password are required." });
    return;
  }
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
    res.status(201).json({ ...user, id: Number(user.id) });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
