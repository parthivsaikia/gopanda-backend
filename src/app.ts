import express from "express";
import cors from "cors";
import homeRouter from "./routes/home";
import userRouter from "./routes/users";
import passport from "passport";
import loginRouter from "./routes/login";
import("./config/passport-config")
import profileRouter from "./routes/profile";
import tourRouter from "./routes/tour";

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/", homeRouter);
app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/profile", profileRouter);
app.use("/tours", tourRouter);

export default app;
