import { City } from "./interfaces/Location";
import { ForecastItem } from "../state/remote/Interfaces/Forecast";
import { startOfDay } from "date-fns";
import { groupBy } from "lodash";

export const getKeyFromLocation = (location: City) =>
  `${location.lon}-${location.lat}`;

export const getDayFromItem = (item: ForecastItem) =>
  startOfDay(Date.parse(item.dt_txt)).toISOString();

type ForecastDayDetails = Record<string, { high: number; low: number }>;
export const getDaysInForecast = (
  items: ForecastItem[]
): ForecastDayDetails => {
  const days: ForecastDayDetails = {};

  items.forEach(
    (item) =>
      (days[getDayFromItem(item)] = {
        high: item.main.temp_max,
        low: item.main.temp_min,
      })
  );
  return days;
};

export const getForecastItemsGroupedByDay = (items: ForecastItem[]) =>
  groupBy(items, (item) => startOfDay(new Date(item.dt_txt)).toISOString());
