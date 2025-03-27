import { Response, Router } from "express";
import { auth } from "../lib/auth";
import { Request } from "express";
import { fromNodeHeaders } from "better-auth/node";

const sessionRouter = Router();

sessionRouter.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    res.json(session);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occured";
    res.status(500).json({ error: errorMessage });
  }
});

export default sessionRouter;
