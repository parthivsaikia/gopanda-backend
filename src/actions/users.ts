import prisma from "../../prisma/prisma-client";;
import { PrismaInputUserDTO, UserInputEditUserDTO } from "../utils/types";

export const storeUser = async (userData: PrismaInputUserDTO) => {
  try {
    const user = await prisma.user.create({
      data: userData,
      omit: {
        password: true
      }
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
  const user = await prisma.user.findUnique({
    where: {
      id: id
    },
    omit: {
      password: true
    }
  });
  return user;
}

export const changeUserData = async (data: UserInputEditUserDTO, id: bigint) => {

  const updatedUser = await prisma.user.update({
    where: {
      id: id
    },
    data: data,
    omit: {password: true}
  });
  return updatedUser;
};

