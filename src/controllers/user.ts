import { Request, Response } from "express";
import { SignupUser } from "../utils/types";
import bcrypt from "bcrypt";

import { storeUser, getUsers } from "../actions/users";

export const createUser = async (req: Request<unknown, unknown, SignupUser>, res: Response) => {
  const { username, name, password, email, mobileNumber, state, country, role } = req.body;
  const saltRound = 10
  const hashedPassword =
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await getUsers();
  res.json(users);
};
