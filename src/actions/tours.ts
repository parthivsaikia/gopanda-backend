import prisma from "../../prisma/prisma-client";

import {  PrismaInputTourDTO } from "../utils/types";

export const getTours = async () => {
  try {
    const allTours = await prisma.offeredTour.findMany();
    return allTours;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "unknown error";
    throw new Error(errorMessage);
  }
};

export const storeTour = async (data: PrismaInputTourDTO) => {
  try {
    const tour = await prisma.offeredTour.create({
      data: data,
    });
    return tour;
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? `error creating new tour: ${err.message}`
        : `unknown error creating in new tour`;
    throw new Error(errorMessage);
  }
};
