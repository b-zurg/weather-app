import { roundToNearestHour } from "../time";

describe("Date rounding", () => {
  const intervals = [0, 1, 10, 20, 30, 40, 50, 59];
  intervals.forEach((interval) => {
    test(`Rounds to nearest hour when time is 10:${interval}`, () => {
      const dateToRound = new Date(2000, 1, 1, 10, interval);
      expect(roundToNearestHour(dateToRound, "up")).toEqual(
        new Date(2000, 1, 1, 11, 0)
      );
      expect(roundToNearestHour(dateToRound, "down")).toEqual(
        new Date(2000, 1, 1, 10, 0)
      );
    });
  });
});
