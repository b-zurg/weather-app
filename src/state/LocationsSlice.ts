import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { City } from "../lib/interfaces/Location";
import { getKeyFromLocation } from "../lib/location";
import { logError } from "../lib/logging";

export interface LocationState {
  locations: Record<string, City>;
  currentLocation: string | null;
  selectedDay: string | null;
}

const initialState: LocationState = {
  locations: {},
  currentLocation: null,
  selectedDay: null,
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    addLocation: (state, action: PayloadAction<City>) => {
      const key = getKeyFromLocation(action.payload);
      state.locations[key] = action.payload;
    },
    removeLocation: (state, action: PayloadAction<string>) => {
      if (state.locations[action.payload]) {
        logError(
          `Tried to remove location with id ${action.payload} when it doesn't exist in the current locations`
        );
        return;
      }
      delete state.locations[action.payload];
    },
    setCurrentLocation: (state, action: PayloadAction<City>) => {
      const key = getKeyFromLocation(action.payload);
      state.locations[key] = action.payload;
      state.currentLocation = key;
    },
    setSelectedDay: (state, action: PayloadAction<string>) => {
      state.selectedDay = action.payload;
    }
  },
});

export const LocationActions = locationsSlice.actions;

export const LocationReducer = locationsSlice.reducer;
