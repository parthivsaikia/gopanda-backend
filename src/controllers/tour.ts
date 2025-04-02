import { Request, Response, NextFunction } from "express";
import { getTours, storeTour } from "../actions/tours";
import { UserInputTourDTO, UserResponseTourDTO } from "../utils/types";
import { Prisma, User } from "@prisma/client";
import {
  convertBigIntToString,
  PrismaToUserResponseTour,
  userToPrismaTour,
} from "../utils/typeconverter";

export const getAllTours = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allTours = await getTours();
    const allToursWithoutBigInt = allTours.map((tour) =>
      convertBigIntToString(tour),
    );

    res.status(200).json(allToursWithoutBigInt);
  } catch (err) {
    next(err);
  }
};

export const createTour = async (
  req: Request<unknown, unknown, UserInputTourDTO>,
  res: Response<UserResponseTourDTO>,
  next: NextFunction,
) => {
  const user = req.user as User;
  const { minimumPeople, price, startDate, endDate } = req.body;
  try {
    const tour = await storeTour(
      userToPrismaTour({
        minimumPeople,
        price: new Prisma.Decimal(price),
        agentId: user.id.toString(),
        startDate,
        endDate,
        itineraries: [],
      }),
    );
    const toBeJsonTour = PrismaToUserResponseTour(tour);
    return res.json(toBeJsonTour);
  } catch (err) {
    next(err);
  }
};
