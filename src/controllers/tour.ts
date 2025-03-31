import {  Request, Response } from "express";
import { getTours } from "../actions/tours";

export const getAllTours = async (_req: Request, res: Response) => {
  try {
    const allTours = await getTours();
    res.status(200).json(allTours);
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? `error in showing all tours: ${err.message}`
        : `unknown error at getting tours.`;
    res.status(500).json({ error: errorMessage });
  }
};
