import { City } from "../../../lib/interfaces/Location";
import { useQuery } from "react-query";
import { getCities } from "../queries";

export const useCities = (searchQuery?: string) =>
  useQuery<City[]>(["getCities", searchQuery], async () => {
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
  });
