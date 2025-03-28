import express from "express";
import cors from "cors";
import homeRouter from "./routes/home";
import userRouter from "./routes/users";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", homeRouter);
app.use("/users", userRouter);

export default app;
