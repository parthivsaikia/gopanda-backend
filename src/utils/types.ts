import { Itinerary, Prisma, UserRole } from "@prisma/client";


export interface SignupUser {
  username: string;
  name: string;
  password: string;
  email: string;
  mobileNumber: string;
  state: string;
  country: string;
  role: UserRole;
}

export interface CreatedTour {
  minimumPeople: number,
  price: Prisma.Decimal,
  itineraries?: Itinerary[],
  facilities?: string[],
  agentId: bigint,

  startDate: Date,
  endDate: Date,
}