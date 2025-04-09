import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

import { comparePassword } from "../utils/password-hash";
import prisma from "../../prisma/prisma-client";
import { User } from "@prisma/client";
import { JWT_SECRET } from "./environment.config";

passport.use(
  new LocalStrategy((username: string, password: string, done) => {
    const verifyUser = async () => {
      console.log(`LocalStrategy: Attempting login for ${username}`);
      try {
        const user = await prisma.user.findUnique({
          where: { username: username },
        });
        if (!user) {
          console.log(`LocalStrategy: User ${username} not found`);
          return done(null, false, { message: "Incorrect username." });
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
          console.log(`LocalStrategy: Incorrect password for ${username}.`);
          return done(null, false, { message: "Incorrect password." });
        }
        console.log(`LocalStrategy: Login successfull for ${username}.`);
        return done(null, user);
      } catch (error) {
        console.error(
          `LocalStrategy: Error during authentication for ${username}`,
          error,
        );
        return done(error);
      }
    };
    verifyUser().catch((err) => {
      console.error("Unhandled error in verifyUser: ", err);
      done(err);
    });
  }),
);

interface JwtPayload {
  sub: bigint;
  [key: string]: unknown;
}

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET || "", // Ensure it's never undefined
};

passport.use(
  new JwtStrategy(
    jwtOptions,
    (
      jwt_payload: JwtPayload,
      done: (error: Error | null, user?: User | false, info?: object) => void,
    ) => {
      async function verifyUser(): Promise<void> {
        console.log("JWT strategy: received payload: ", jwt_payload);
        try {
          const id: bigint = BigInt(jwt_payload.sub);
          if (!id) {
            console.log("Jwt strategy: Payload missing user ID (sub)");
            return done(null, false);
          }

          const user = await prisma.user.findUnique({
            where: { id: id },
          });

          if (user) {
            console.log(`Jwt strategy: User ${id} found`);
            return done(null, user);
          } else {
            console.log(`Jwt strategy: User with username ${id} not found.`);
            return done(null, false);
          }
        } catch (error) {
          console.error(
            `Jwt strategy: Error during token verification.`,
            error,
          );
          return done(
            error instanceof Error ? error : new Error(String(error)),
            false,
          );
        }
      }

      verifyUser().catch((err: unknown) => {
        done(err instanceof Error ? err : new Error(String(err)));
      });
    },
  ),
);

export default passport;
