// TODO:
import prisma from "../../prisma/prisma-client";

export const getProfileAction = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: BigInt(id) },
      omit: { password: true },
    });
    if (!user) {
      throw new Error("user not found.");
    }
    return user;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `error in finding profile of user ${id}`
        : `unknown error while finding profile`;
    throw new Error(errorMessage);
  }
};
