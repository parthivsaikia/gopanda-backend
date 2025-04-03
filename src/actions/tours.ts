import prisma from "../../prisma/prisma-client";

import { PrismaInputEditTourDTO, PrismaInputTourDTO } from "../utils/types";

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

export const updateTourAction = async (
  data: PrismaInputEditTourDTO,
  id: bigint,
) => {
  try {
    const tour = await prisma.offeredTour.update({
      where: {
        id: id,
      },
      data: data,
    });
    return tour;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `error updating tour: ${error.message}`
        : `unknown error in updating tour`;
    throw new Error(errorMessage);
  }
};
