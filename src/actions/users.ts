import prisma from "../../prisma/prisma-client";
import { UserRole } from "@prisma/client";
export const storeUser = async ({
  username,
  name,
  password,
  email,
  mobileNumber,
  state,
  country,
  role,
}: {
  username: string;
  name: string;
  password: string;
  email: string;
  mobileNumber: string;
  state: string;
  country: string;
  role: UserRole;
}) => {
  try {
    await prisma.user.create({
      data: {
        username,
        name,
        password,
        email,
        mobileNumber,
        state,
        country,
        role,
      },
    });
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
