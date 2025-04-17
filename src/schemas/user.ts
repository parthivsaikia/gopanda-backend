import { type } from "arktype";
import { Prisma } from "@prisma/client";
import { UserRole } from "@prisma/client";

type PrismaInputUserDTO = Prisma.UserCreateInput;

export const UserInputDTO = type({
  username: "string > 7",
  name: "string",
  password: "string > 7",
  email: "string.email",
  mobileNumber: "string",
  state: "string",
  country: "string",
  role: type.valueOf(UserRole),
});

export type UserInputDTO = typeof UserInputDTO.infer;
