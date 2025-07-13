import { create } from "zustand";
import { City } from "../../lib/interfaces/Location";
import { getKeyFromLocation } from "../../lib/location";
import { logError } from "../../lib/logging";

export interface LocationState {
  locations: Record<string, City>;
  currentLocation: string | null;
}

interface LocationStore extends LocationState {
  addLocation: (location: City) => void;
  removeLocation: (key: string) => void;
  setCurrentLocation: (location: City) => void;
}

export const useLocationStore = create<LocationStore>((set, get) => ({
  locations: {},
  currentLocation: null,
  
  addLocation: (location: City) => {
    const key = getKeyFromLocation(location);
    set((state) => ({
      locations: {
        ...state.locations,
        [key]: location,
      },
    }));
  },
  
  removeLocation: (key: string) => {
    const state = get();
    if (!state.locations[key]) {
      logError(
        `Tried to remove location with id ${key} when it doesn't exist in the current locations`
      );
      return;
    }
    set((state) => {
      const newLocations = { ...state.locations };
      delete newLocations[key];
      return { locations: newLocations };
    });
  },
  
  setCurrentLocation: (location: City) => {
    const key = getKeyFromLocation(location);
    set((state) => ({
      locations: {
        ...state.locations,
        [key]: location,
      },
      currentLocation: key,
    }));
  },
}));
