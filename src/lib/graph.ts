import { ForecastItem } from "../state/remote/Interfaces/Forecast";

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
    if (minTemp === undefined || temp < minTemp) {
      minTemp = temp;
    }
    if (maxTemp === undefined || temp > maxTemp) {
      maxTemp = temp;
    }
  };
  const setMinMaxDate = (date: Date) => {
    if (minDate === undefined || date < minDate) {
      minDate = date;
    }
    if (maxDate === undefined || date > maxDate) {
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
    dateRange:
      minDate !== undefined && maxDate !== undefined ? [minDate, maxDate] : undefined,
    tempRange:
      minTemp !== undefined && maxTemp !== undefined ? [minTemp, maxTemp] : undefined,
  };
};
