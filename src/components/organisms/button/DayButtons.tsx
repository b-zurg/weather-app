import React from "react";
import { useCurrentLocation } from "../../../state/local/hooks/useCurrentLocation";
import { useForecast } from "../../../state/remote/hooks/useForecast";
import { getDaysInForecast } from "../../../lib/location";
import { DayButton } from "../../molecules/button/DayButton";
import { useAppDispatch } from "../../../state/local/AppStore";
import { LocationActions } from "../../../state/LocationsSlice";

export const DayButtons: React.FC = () => {
  const currentLocation = useCurrentLocation();
  const dispatch = useAppDispatch();
  const { data } = useForecast(currentLocation?.lat, currentLocation?.lon);

  if (!data) return <></>;
  const days = getDaysInForecast(data?.list);
  return (
    <div className="flex justify-center space-x-2">
      {Object.entries(days).map(
        ([day, { high, low }], index) =>
          index < 5 && (
            <DayButton
              day={day}
              temperatures={{ high, low }}
              onClick={() => dispatch(LocationActions.setSelectedDay(day))}
            />
          )
      )}
    </div>
  );
};
