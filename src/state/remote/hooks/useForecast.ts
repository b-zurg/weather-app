import { useQuery } from "react-query";
import { Forecast } from "../Interfaces/Forecast";
import { getForecast } from "../queries";
export const useForecast = (lat?: number, lon?: number) =>
  useQuery<Forecast>(
    ["getForecast", lat, lon],
    () => getForecast(lat as number, lon as number),
    {
      enabled: Boolean(lat) && Boolean(lon),
    }
  );
