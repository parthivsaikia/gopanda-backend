import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "../../prisma/prisma-client";
import { getEnvVariables } from "../utils/env";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: getEnvVariables("GITHUB_CLIENT_ID"),
      clientSecret: getEnvVariables("GITHUB_CLIENT_SECRET"),
    },
  },
});
