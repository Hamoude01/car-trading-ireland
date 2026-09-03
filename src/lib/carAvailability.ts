import type { Car } from "./types";

export function sortCarsByAvailability(cars: Car[]): Car[] {
  return [...cars].sort(
    (firstCar, secondCar) =>
      Number(firstCar.availabilityStatus === "sold") -
      Number(secondCar.availabilityStatus === "sold")
  );
}
