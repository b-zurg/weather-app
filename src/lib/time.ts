import { addMinutes } from "date-fns";
export const roundToNearestHour = (date: Date, direction: "up" | "down") => {
  const adjustedDate =
    direction === "down" ? addMinutes(date, -30) : addMinutes(date, 30);
  const millisecondsInHour = 60 * 60 * 1000;
  return new Date(
    Math.round(adjustedDate.valueOf() / millisecondsInHour) * millisecondsInHour
  );
};
