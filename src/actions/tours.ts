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

export const deleteTourAction = async (id: bigint) => {
  try {
    await prisma.offeredTour.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `error deleting tour: ${error.message}`
        : `unknown error in deleting tour`;
    throw new Error(errorMessage);
  }
};

export const findTourAction = async (id: bigint) => {
  try {
    const tour = await prisma.offeredTour.findUnique({
      where: {
        id: id,
      },
    });
    return tour;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `error finding tour: ${error.message}`
        : `unknown error in finding tour`;
    throw new Error(errorMessage);
  }
};
