import { Request, Response } from "express";

export const welcome = (req: Request, res: Response) => {
  res.json("Welcome to Gopanda");
};
