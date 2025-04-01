import { Router } from "express";
const profileRouter = Router();
import { Request, Response } from "express";
import { User } from "@prisma/client";
import { requireJwtAuth } from "../utils/middlewares";

// interface AuthenticatedRequest extends Request {
//   user?: User; // Make user optional or handle cases where it might not exist if needed
// }

// const requireJwtAuth: RequestHandler = passport.authenticate("jwt", {
//   session: false,
// }) as RequestHandler;

profileRouter.get("/", requireJwtAuth, (req: Request, res: Response) => {
  const user = req.user as User | undefined;
  console.log("Accessing protected profile route");
  if (!user) {
    return res
      .status(401)
      .json({ message: "Authentication succeeded but user data is missing." });
  }
  res.json({
    message: "You made it to the secure route!",
    user: {
      id: user.id.toString(), // Convert BigInt ID to string for JSON
      username: user.username,
      name: user.name,
      email: user.email,
      // Add other fields you want to return, EXCLUDING password
      role: user.role,
      state: user.state,
      country: user.country,
      mobileNumber:user.mobileNumber,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
    hi: "hii",
  });
});

export default profileRouter;