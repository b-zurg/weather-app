import { convertPointsToPath, invertPointsYCoordinate } from "../graph";
import { Point } from "../interfaces/Graph";

describe("Path creation", () => {
  const points: Point[] = [
    [0, 10],
    [5, 12],
    [10, 15],
    [15, 9],
    [20, 2],
  ];
  test("Basic path", () => {
    const path = convertPointsToPath(points, 0);
    expect(path).toBe("0,0 0,10 5,12 10,15 15,9 20,2 20,0");
  });

  test("Invert coordinates", () => {
    const inverted = invertPointsYCoordinate(points, 30);
    const expected = [
      [0, 20],
      [5, 18],
      [10, 15],
      [15, 21],
      [20, 28],
    ];
    expect(inverted).toEqual(expected);
  });
});
