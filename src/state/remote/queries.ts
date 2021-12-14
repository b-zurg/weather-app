import { LocationResult } from "./Interfaces/Geocoding";
import { Forecast } from "./Interfaces/Forecast";
import { CurrentWeather } from "./Interfaces/CurrentWeather";

const apiBaseQueryParam: Record<string, string> = {
  apiKey: `${process.env.REACT_APP_OPENMAP_WEATHER_API_KEY}`,
};
const generateQueryParameters = (params: Record<string, string>) => {
  const variables = Object.entries({ ...params, ...apiBaseQueryParam })
    .map(([key, value]) => `&${key}=${value}`)
    .join("");
  return `?${variables}`;
};

const get = <T>(url: string, params: Record<string, string>): Promise<T> =>
  fetch(
    `${process.env.REACT_APP_OPENMAP_API_BASE}/${url}${generateQueryParameters(
      params
    )}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  });

export const getCities = async (
  city: string,
  limit: number = 20
): Promise<LocationResult[]> =>
  get<LocationResult[]>("geo/1.0/direct", { q: city, limit: limit.toString() });

export const getForecast = async (
  lat: number,
  lon: number
): Promise<Forecast> =>
  get<Forecast>("data/2.5/forecast", {
    lat: lat.toString(),
    lon: lon.toString(),
    exclude: "minutely,daily,alerts",
    units: "metric",
  });

export const getCurrentWeather = async (
  lat: number,
  lon: number
): Promise<CurrentWeather> =>
  get<CurrentWeather>("data/2.5/weather", {
    lat: lat.toString(),
    lon: lon.toString(),
    units: "metric",
  });
