import { Prisma } from "@prisma/client";
import prisma from "../../prisma/prisma-client";

export const createBookingAction = async (data: Prisma.BookingCreateInput) => {
  try {
    /*id         bigint        @id @default(autoincrement())
customer   user          @relation("customer", fields: [customerid], references: [id])
customerid bigint
tour       offeredtour   @relation(fields: [tourid], references: [id])
tourid     bigint
persons    person[]
noofpeople int
status     bookingstatus
totalprice decimal //offeredtour.price * noofpeople
createdat  datetime      @default(now())
updatedAt  DateTime      @updatedAt
Payment    Payment?*/

    const booking = await prisma.booking.create({
      data: data,
    });
    return booking;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `error in booking tour: ${error.message}`
        : `unknown error in booking`;
    throw new Error(errorMessage);
  }
};

export const existingBookingAction = async (tourId: bigint) => {
  try {
    const existingBookings = await prisma.booking.aggregate({
      where: { tourId: tourId, status: { in: ["Pending", "Confirmed"] } },
      _sum: { noOfPeople: true },
    });
    return existingBookings;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? `error in calculating existing bookings: ${error.message}`
        : `unknown error in calculating existing bookings.`;
    throw new Error(errorMessage);
  }
};

export const getAll = async () => {

}
