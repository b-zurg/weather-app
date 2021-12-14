import { addHours, addMinutes } from "date-fns";
import { scaleLinear, scaleTime, scaleTimeInvert } from "../scale";
describe("Scale functions work as expected", () => {
  test("scaleLinear", () => {
    const scale = scaleLinear({ from: [0, 101], to: [1, 20] });
    expect(scale(0)).toBe(1);
    expect(scale(-2)).toBe(1);
    expect(scale(101)).toBe(20);
    expect(scale(400)).toBe(20);
    expect(scale(50)).toBeCloseTo(19 / (101 / 50) + 1);

    const scaleWithNegatives = scaleLinear({ from: [-5, 5], to: [-10, 90] });
    expect(scaleWithNegatives(-1)).toBe(30);
  });

  test("scaleTime", () => {
    const startTime = new Date(2000, 1, 1, 10, 30);
    const endTime = addHours(startTime, 1);
    const scale = scaleTime({ from: [startTime, endTime], to: [0, 100] });
    expect(scale(startTime)).toBe(0);
    expect(scale(addMinutes(startTime, 30))).toBe(50);
    expect(scale(endTime)).toBe(100);
    expect(scale(addHours(endTime, 1))).toBe(100);
    expect(scale(addHours(startTime, -1))).toBe(0);
  });

  test("scaleTimeInvert", () => {
    const dateRange = [
      new Date(2000, 1, 1, 10, 0),
      new Date(2000, 1, 1, 12, 0),
    ] as [Date, Date];
    const numberRange = [0, 120] as [number, number];
    const scale = scaleTimeInvert({ from: numberRange, to: dateRange });
    expect(scale(60)).toEqual(new Date(2000, 1, 1, 11, 0));
    expect(scale(12)).toEqual(new Date(2000, 1, 1, 10, 12));
    expect(scale(-15)).toEqual(new Date(2000, 1, 1, 10, 0));
    expect(scale(200)).toEqual(new Date(2000, 1, 1, 12, 0));
  });
});
