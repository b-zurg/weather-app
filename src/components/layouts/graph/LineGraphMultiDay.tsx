import React from "react";
import { useForecast } from "../../../state/remote/hooks/useForecast";
import { LineGraph } from "../../organisms/graph/LineGraph";
import { extractLineGraphDataFromForecastItems } from "../../../lib/graph";
import { useCurrentLocation } from "../../../state/local/hooks/useCurrentLocation";
import { useTranslation } from "../../../localization/TranslationsProvider";

interface LineGraphMultiDayProps {
  width: number;
}

export const LineGraphMultiDay: React.FC<LineGraphMultiDayProps> = ({
  width,
}) => {
  const currentLocation = useCurrentLocation();
  const { t } = useTranslation();
  const { data } = useForecast(currentLocation?.lat, currentLocation?.lon);
  
  if (!data) return <></>;
  
  // Use all forecast items for the 5-day chart
  const { points, tempRange, dateRange } =
    extractLineGraphDataFromForecastItems(data.list);
    
  if (!points || !tempRange || !dateRange) return <></>;

  return (
    <div className="flex flex-col space-y-6">
      <div className="text-2xl font-semibold">{t("hourlyTemperature5Days")}</div>
      <div className="w-full">
        <LineGraph
          height={400}
          width={width}
          points={points}
          yRange={tempRange}
        />
      </div>
    </div>
  );
};
