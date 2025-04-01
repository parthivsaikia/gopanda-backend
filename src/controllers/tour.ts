import { Request, Response } from "express";
import { getTours, storeTour } from "../actions/tours";
import { CreatedTour } from "../utils/types";
import { Prisma, User } from "@prisma/client";
import { convertBigIntToString } from "../utils/typeconverter";

export const getAllTours = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const allTours = await getTours();
    const allToursWithoutBigInt = allTours.map(tour => convertBigIntToString(tour));

    res.status(200).json(allToursWithoutBigInt);
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? `error in showing all tours: ${err.message}`
        : `unknown error at getting tours.`;
    res.status(500).json({ error: errorMessage });
  }
};

export const createTour = async (
  req: Request<unknown, unknown, CreatedTour>,
  res: Response,
) => {
  const user = req.user as User;
  const { minimumPeople, price, startDate, endDate } = req.body;
  try {
    const tour = await storeTour({
      minimumPeople,
      price: new Prisma.Decimal(price),
      agentId: user.id,
      startDate,
      endDate,
    });
    const toBeJsonTour = {
      minimumPeople: tour.minimumPeople,
      price: tour.price,
      agentId: tour.agentId.toString(),
      startDate: tour.startDate,
      endDate: tour.endDate,
    };
    return res.json(toBeJsonTour);
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? `error in creating tour: ${err.message}`
        : `unknown error in creating user.`;
    res.status(400).json({ error: errorMessage });
  }
};
