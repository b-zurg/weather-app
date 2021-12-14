import { ForecastItem } from "../state/remote/Interfaces/Forecast";
import { Point } from "./interfaces/Graph";
const mapAndJoinPoints = (points: Point[]) =>
  points.map((point) => point.join(",")).join(" ");

export const convertPointsToPath = (points: Point[], height?: number) => {
  if (height === undefined) return mapAndJoinPoints(points);
  if (points.length === 0) return "";
  const startPointFloor: Point = [points[0][0], height];
  const endPointFloor: Point = [points[points.length - 1][0], height];
  return mapAndJoinPoints([startPointFloor, ...points, endPointFloor]);
};

// This is to help convert a coordinate system where the bottom left corner is 0,0 to a coordinate system where the top left corner is 0,0 (i.e. svg)
export const invertPointsYCoordinate = (
  points: Point[],
  height: number
): Point[] => points.map(([x, y]) => [x, height - y]);

export interface LineGraphData {
  points: [Date, number][];
  tempRange: [number, number];
  dateRange: [Date, Date];
}
export const extractLineGraphDataFromForecastItems = (
  items?: ForecastItem[]
): Partial<LineGraphData> => {
  let minTemp: number | undefined = undefined;
  let maxTemp: number | undefined = undefined;
  let minDate: Date | undefined = undefined;
  let maxDate: Date | undefined = undefined;
  const setMinMaxTemp = (temp: number) => {
    if (!minTemp || temp < minTemp) {
      minTemp = temp;
      return;
    }
    if (!maxTemp || temp > maxTemp) {
      maxTemp = temp;
    }
  };
  const setMinMaxDate = (date: Date) => {
    if (!minDate || date < minDate) {
      minDate = date;
      return;
    }
    if (!maxDate || date > maxDate) {
      maxDate = date;
    }
  };

  const points = items?.map((item) => {
    const date = new Date(item.dt_txt);
    setMinMaxDate(date);
    const temp = item.main.temp;
    setMinMaxTemp(temp);
    return [date, temp] as [Date, number];
  });

  return {
    points,
    dateRange: minDate && maxDate && [minDate, maxDate],
    tempRange: minTemp && maxTemp && [minTemp, maxTemp],
  };
};
