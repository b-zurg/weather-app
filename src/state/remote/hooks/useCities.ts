import { City } from "../../../lib/interfaces/Location";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "../queries";

export const useCities = (searchQuery?: string) =>
  useQuery<City[]>({
    queryKey: ["getCities", searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];
      const results = await getCities(searchQuery);
      return results.map(
        (result) =>
          ({
            name: result.name,
            state: result.state,
            countryCode: result.country,
            lat: result.lat,
            lon: result.lon,
          } as City)
      );
    },
  });
