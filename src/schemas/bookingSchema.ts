import { type } from "arktype";

const Person = type({
  name: "string>=1",
  age: "number.integer > 0",
  proof: "string>=0",
});
export const BookingSchema = type({
  tourId: "number>0",
  noOfPeople: "number.integer > 0",
  persons: [Person],
});
