import prisma from "../../prisma/prisma-client";
import { UserRole } from "@prisma/client";
export const createUser = async ({
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
};
