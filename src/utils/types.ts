import { Itinerary, Prisma, User, UserRole } from "@prisma/client";

//Data transfer Objects(DTO) for User

export interface UserInputUserDTO {
  //user will input this data
  username: string;
  name: string;
  password: string;
  email: string;
  mobileNumber: string;
  state: string;
  country: string;
  role: UserRole;
}

//this data will be sent to prisma
export type PrismaInputUserDTO = Omit<UserInputUserDTO, "password"> & {
  password: string;
}; //hashed password

//this data will be sent to client as response
export type UserResponseUserDTO = Omit<User, "password" | "id"> & {
  id: string;
};

export type UserInputEditUserDTO = Partial<Pick<User, "username" | "password" | "email" | "country" | "image" | "emailVerified" | "mobileNumber" | "state">>;  

//DTO for tours
export interface UserInputTourDTO {
  minimumPeople: number;
  price: Prisma.Decimal;
  itineraries?: UserInputTourIteneraryDTO[];
  facilities?: string[];
  agentId: string; //now taking as string, will be converted to bigint when sending to prisma.
  startDate: string; //ISO string
  endDate: string;
}

export type UserInputTourIteneraryDTO = Omit<
  Itinerary,
  "id" | "createdAt" | "updatedAt"
>;

export type PrismaInputTourDTO = {
  minimumPeople: number;
  price: Prisma.Decimal;
  facilities?: string[];
  agentId: bigint;
  startDate: Date;
  endDate: Date;
  itineraries?: {
    create: Omit<Prisma.ItineraryCreateInput, "tour">[];
  };
};

export type UserResponseTourDTO = {
  minimumPeople: number;
  price: number;
  facilities?: string[];
  agentId: string;
  startDate: string | Date;
  endDate: string | Date;
  itineraries?: {
    id: string;
    day: number;
    startTime: Date;
    endTime: Date;
    placeId?: string;
    tourId: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
