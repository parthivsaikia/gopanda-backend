import prisma from "../../prisma/prisma-client";

export const getTours = async () => {
  try {
      const allTours = await prisma.offeredTour.findMany();
      return allTours;
  } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "unknown error";
      throw new Error(errorMessage);
  }
};
