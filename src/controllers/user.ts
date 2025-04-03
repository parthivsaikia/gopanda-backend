import { NextFunction, Request, Response } from "express";
import { UserInputEditUserDTO, UserInputUserDTO } from "../utils/types";
import bcrypt from "bcrypt";
import {
  storeUser,
  getUsers,
  changeUserData,
  deleteUserAction,
} from "../actions/users";
import { convertBigIntToString } from "../utils/typeconverter";

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
    const users = (await getUsers());
    const jsonUsers = users.map(user => convertBigIntToString(user));
    return res.status(200).json(jsonUsers);
  } catch (error) {
    next(error);
  }
};

export async function editUser(
  req: Request<{ id: string }, unknown, UserInputEditUserDTO>,
  res: Response,
  next: NextFunction,
) {
  const id = BigInt(req.params.id);
  const data = req.body;
  try {
    const editedUser = await changeUserData(data, id);
    if (!editedUser) {
      res.status(404).json({ error: "user not found to edit." });
    }
    res.json(convertBigIntToString(editedUser));
  } catch (err) {
    next(err);
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const id = BigInt(req.params.id);
  try {
    await deleteUserAction(id);
  } catch (error) {
    next(error);
  }
};