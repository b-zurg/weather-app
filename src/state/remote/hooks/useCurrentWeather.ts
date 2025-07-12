import { useQuery } from "@tanstack/react-query";
import { getCurrentWeather } from "../queries";
export const useCurrentWeather = (lat?: number, lon?: number) =>
  useQuery({
    queryKey: ["currentWeather", lat, lon],
    queryFn: () => getCurrentWeather(lat as number, lon as number),
    enabled: !!lat && !!lon,
  });
