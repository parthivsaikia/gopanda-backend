import { Prisma, User } from "@prisma/client";
import { createBookingAction, existingBookingAction } from "../actions/booking";
import { Request, Response, NextFunction } from "express";
import { findTourAction } from "../actions/tours";
import { BookingSchema } from "../schemas/bookingSchema";
import { type } from "arktype";
import { convertBigIntToString } from "../utils/typeconverter";

export const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user as User;
    /*
    if (!user) {
      res.status(404).json({ error: "user not logged in." });
    }*/
    if (user.role === "TravelAgent") {
      res.status(405).json({ error: "TravelAgent cannot do booking." });
    }

    const data = BookingSchema(req.body);
    if (data instanceof type.errors) {
      return res
        .status(400)
        .json({ error: "Invalid input", details: data.summary });
    }

    const { tourId, noOfPeople, persons } = data;

    const offeredTour = await findTourAction(BigInt(tourId));
    if (!offeredTour) {
      res.status(404).json({ error: "Tour not found." });
    }
    if (offeredTour!.startDate < new Date()) {
      return res.status(400).json({ error: "Tour has already started" });
    }
    if (noOfPeople < offeredTour!.minimumPeople) {
      return res.status(400).json({
        error: `Minimum ${offeredTour!.minimumPeople} people are required.`,
      });
    }
    const existingBooking = await existingBookingAction(BigInt(tourId));
    if (existingBooking._sum.noOfPeople) {
      if (existingBooking._sum.noOfPeople + noOfPeople < 50) {
        return res.status(400).json({ error: "Tour is full." });
      }
    }
    const totalPrice: number = Number(offeredTour!.price) * Number(noOfPeople);
    const bookingData: Prisma.BookingCreateInput = {
      customer: { connect: { id: user.id } },
      tour: { connect: { id: tourId } },
      noOfPeople,
      totalPrice,
      status: "Pending",
      persons: {
        create: persons.map((person) => ({
          name: person.name,
          age: person.age,
          proof: person.proof,
        })),
      },
    };
    const booking = await createBookingAction(bookingData);
    res.json(convertBigIntToString(booking));
  } catch (error) {
    next(error);
  }
};
