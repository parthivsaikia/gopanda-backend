import { Itinerary, OfferedTour, Prisma } from "@prisma/client";
import {
  PrismaInputTourDTO,
  UserInputTourDTO,
  UserResponseTourDTO,
} from "./types";

type InputObject = Record<string, unknown>;
type OutputObject<T extends InputObject> = {
  [K in keyof T]: T[K] extends bigint ? string : T[K];
};

export function convertBigIntToString<T extends InputObject>(
  obj: T,
): OutputObject<T> {
  const result = {} as OutputObject<T>;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      result[key] =
        typeof value === "bigint"
          ? (value.toString() as OutputObject<T>[typeof key])
          : (value as OutputObject<T>[typeof key]);
    }
  }

  return result;
}

//UserInputTour to PrismaInputTour
export const userToPrismaTour = (
  tourObject: UserInputTourDTO,
): PrismaInputTourDTO => {
  return {
    minimumPeople: tourObject.minimumPeople,
    price: new Prisma.Decimal(tourObject.price),
    facilities: tourObject.facilities,
    agentId: BigInt(tourObject.agentId),
    startDate: new Date(tourObject.startDate),
    endDate: new Date(tourObject.endDate),
    ...(tourObject.itineraries && tourObject.itineraries.length > 0
      ? {
          itineraries: {
            create: tourObject.itineraries.map((itinerary) => ({
              day: itinerary.day,
              startTime: new Date(itinerary.startTime),
              endTime: new Date(itinerary.endTime),
              ...(itinerary.placeId
                ? { placeId: BigInt(itinerary.placeId) }
                : {}),
            })),
          },
        }
      : {}),
  };
};

export const PrismaToUserResponseTour = (
  tourObject: OfferedTour & { itineraries?: Itinerary[] }
): UserResponseTourDTO => {
  const { itineraries, ...tourData } = tourObject;
  const responseTourObject: UserResponseTourDTO = {
    minimumPeople: tourData.minimumPeople,
    price: Number(tourData.price),
    facilities: tourData.facilities,
    agentId: tourData.agentId.toString(),
    startDate: tourData.startDate,
    endDate: tourData.endDate,
    ...(itineraries && (itineraries.length) > 0 ?
      {
        itineraries: itineraries.map(itinerary => {
          return {
            id: itinerary.id.toString(),
            day: itinerary.day,
            tourId: itinerary.tourId.toString(),
            startTime: new Date(itinerary.startTime),
            endTime: new Date(itinerary.endTime),
            placeId: itinerary.placeId ? itinerary.placeId.toString() : undefined,
            createdAt: new Date(itinerary.createdAt),
            updatedAt: new Date(itinerary.updatedAt)
          };
        })
      } :
      undefined
    )
  };
  return responseTourObject;
};
