import express from "express";
import cors from "cors";
import homeRouter from "./routes/home";
import userRouter from "./routes/users";

import passport from "passport";
import loginRouter from "./routes/login";
import("./config/passport-config");
import tourRouter from "./routes/tour";
import profileRouter from "./routes/profile";
import bookingRouter from "./routes/bookings";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", homeRouter);
app.use("/users", userRouter);

app.use("/login", loginRouter);
app.use("/tours", tourRouter);
app.use("/profile", profileRouter);
app.use("/bookings", bookingRouter);
export default app;
