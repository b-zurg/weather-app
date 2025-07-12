import React from "react";
import { useForecast } from "../../../state/remote/hooks/useForecast";
import { LineGraph } from "../../organisms/graph/LineGraph";
import { extractLineGraphDataFromForecastItems } from "../../../lib/graph";
import { useCurrentLocation } from "../../../state/local/hooks/useCurrentLocation";
import { getForecastItemsGroupedByDay } from "../../../lib/location";
import { DayButtons } from "../../organisms/button/DayButtons";
import { useLocationStore } from "../../../state/local/AppStore";
import { useTranslation } from "../../../localization/TranslationsProvider";

interface LineGraphMultiDayProps {
  width: number;
}
export const LineGraphMultiDay: React.FC<LineGraphMultiDayProps> = ({
  width,
}) => {
  const currentLocation = useCurrentLocation();
  const { t } = useTranslation();
  const selectedDay = useLocationStore((state) => state.selectedDay);
  const { data } = useForecast(currentLocation?.lat, currentLocation?.lon);
  if (!data) return <></>;
  const itemsGroupedByDay = getForecastItemsGroupedByDay(data.list);

  const groups = Object.values(itemsGroupedByDay);
  if (groups.length === 0) return <></>;
  const selectedDayItems = selectedDay
    ? itemsGroupedByDay[selectedDay]
    : groups[0];
  const { points, tempRange, dateRange } =
    extractLineGraphDataFromForecastItems(selectedDayItems);
  if (!points || !tempRange || !dateRange) return <></>;

  return (
    <div className="flex flex-col space-y-12">
      <div className="text-2xl">{t("hourlyTemperature5Days")}</div>
      <LineGraph
        height={200}
        width={width}
        points={points}
        xRange={dateRange}
        yRange={tempRange}
      />
      <DayButtons />
    </div>
  );
};
