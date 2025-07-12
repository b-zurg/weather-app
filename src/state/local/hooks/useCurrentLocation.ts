import { useLocationStore } from "../AppStore";

export const useCurrentLocation = () =>
  useLocationStore((state) => {
    const locationKey = state.currentLocation;
    if (!locationKey) return;
    return state.locations[locationKey];
  });
