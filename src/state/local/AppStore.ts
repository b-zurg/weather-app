import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { LocationReducer } from "./LocationsSlice";

export const AppStore = configureStore({
  reducer: {
    locations: LocationReducer,
  },
});

export type AppState = ReturnType<typeof AppStore.getState>;
export type AppDispatch = typeof AppStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
