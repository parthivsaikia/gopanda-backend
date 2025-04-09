import express from "express";
import cors from "cors";
import userRouter from "./routes/users";
import passport from "passport";
import loginRouter from "./routes/login";
import("./config/passport-config");
import tourRouter from "./routes/tour";
import profileRouter from "./routes/profile";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/tours", tourRouter);
app.use("/profile", profileRouter);

export default app;
