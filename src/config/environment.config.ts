// import dotenv from "dotenv";
// import { PORT, DATABASE_URL } from "./config/environment-config";
// const env = process.env.NODE_ENV;
// dotenv.config({ path: `.env.${env}` });
export const PORT = process.env.PORT;
export const DATABASE_URL = process.env.DATABASE_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
