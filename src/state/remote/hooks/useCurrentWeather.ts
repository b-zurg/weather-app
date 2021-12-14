import { useQuery } from "react-query";
import { getCurrentWeather } from "../queries";
export const useCurrentWeather = (lat?: number, lon?: number) =>
  useQuery(
    ["currentWeather", lat, lon],
    () => getCurrentWeather(lat as number, lon as number),
    { enabled: !!lat && !!lon }
  );
