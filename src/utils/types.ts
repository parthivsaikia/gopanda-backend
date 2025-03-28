import { UserRole } from "@prisma/client";

export interface SignupUser {
  username: string;
  name: string;
  password: string;
  email: string;
  mobileNumber: string;
  state: string;
  country: string;
  role: UserRole;
}
