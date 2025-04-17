import { Request, Response, NextFunction } from "express";
import {
  deleteTourAction,
  findTourAction,
  getTours,
  storeTour,
  updateTourAction,
} from "../actions/tours";
import {
  UserInputEditTourDTO,
  UserInputTourDTO,
  UserResponseTourDTO,
} from "../utils/types";
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
  res: Response,
  next: NextFunction
) => {
  const user = req.user as User;
  if (!user) {
    res.status(403).json({ error: "User not logged in." })
  }
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

export const updateTour = async (
  req: Request<{ id: string }, unknown, UserInputEditTourDTO>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const id = BigInt(req.params.id);
    const updateTour = await updateTourAction(data, id);
    res.json(convertBigIntToString(updateTour));
  } catch (error) {
    next(error);
  }
};

export const deleteTour = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = BigInt(req.params.id);
    await deleteTourAction(id);
    res.status(204).json("Tour deleted successfully.");
  } catch (error) {
    next(error);
  }
};

export const getTour = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = BigInt(req.params.id);
    const tour = await findTourAction(id);
    if (tour) {
      res.json(convertBigIntToString(tour));
    } else {
      res.status(404).json({ error: "tour not found" });
    }
  } catch (error) {
    next(error);
  }
};


