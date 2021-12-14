import { useAppSelector } from "../AppStore";

export const useCurrentLocation = () =>
  useAppSelector(({ locations }) => {
    const locationKey = locations.currentLocation;
    if (!locationKey) return;
    return locations.locations[locationKey];
  });
