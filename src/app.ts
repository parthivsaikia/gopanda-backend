import express from "express";
import cors from "cors";
import homeRouter from "./routes/home";
import authRouter from "./routes/authorization";
import sessionRouter from "./routes/session";

const app = express();
app.use("/api/auth/*", authRouter);
app.use(express.json());
app.use(cors());
app.use("/api/me", sessionRouter);
app.use("/", homeRouter);

export default app;
