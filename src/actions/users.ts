import prisma from "../../prisma/prisma-client";
import { PrismaInputUserDTO, UserInputEditUserDTO } from "../utils/types";

export const storeUser = async (userData: PrismaInputUserDTO) => {
  try {
    const user = await prisma.user.create({
      data: userData,
      omit: {
        password: true,
      },
    });
    return user;
  } catch (error) {
    const errorMsg =
      error instanceof Error
        ? `Error in storing user to db: ${error.message}`
        : `unknown error`;
    throw new Error(errorMsg);
  }
};

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        state: true,
        country: true,
        role: true,
      },
    });
    return users;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unknown error while retrieving users";
    throw new Error(`Error while retrieving users ${errorMessage}`);
  }
};

export async function findUser(id: bigint) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      omit: {
        password: true,
      },
    });
    return user;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `error in finding user: ${error.message}`
        : `unknown error occured while finding user.`;
    throw new Error(errorMessage);
  }
}

export const changeUserData = async (
  data: UserInputEditUserDTO,
  id: bigint,
) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: data,
      omit: { password: true },
    });
    return updatedUser;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `error in changing user: ${error.message}`
        : `unknown error occured while changing user.`;
    throw new Error(errorMessage);
  }
};

export const deleteUserAction = async (id: bigint) => {
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `error in deleting user: ${error.message}`
        : `unknown error occured while deleting user.`;
    throw new Error(errorMessage);
  }
};
