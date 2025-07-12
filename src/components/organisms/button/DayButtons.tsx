import React, { useCallback } from "react";
import { useCurrentLocation } from "../../../state/local/hooks/useCurrentLocation";
import { useForecast } from "../../../state/remote/hooks/useForecast";
import { getDaysInForecast } from "../../../lib/location";
import { DayButton } from "../../molecules/button/DayButton";
import { useLocationStore } from "../../../state/local/AppStore";

export const DayButtons: React.FC = () => {
  const currentLocation = useCurrentLocation();
  const setSelectedDay = useLocationStore((state) => state.setSelectedDay);
  const { data } = useForecast(currentLocation?.lat, currentLocation?.lon);

  const handleDayClick = useCallback((day: string) => {
    setSelectedDay(day);
  }, [setSelectedDay]);

  if (!data) return <></>;
  const days = getDaysInForecast(data.list);
  
  return (
    <div className="flex justify-center space-x-2">
      {Object.entries(days).map(
        ([day, { high, low }], index) =>
          index < 5 && (
            <DayButton
              key={day}
              day={day}
              temperatures={{ high, low }}
              onClick={() => handleDayClick(day)}
            />
          )
      )}
    </div>
  );
};
