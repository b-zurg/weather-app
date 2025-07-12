import React, { useMemo } from "react";
import { useCurrentLocation } from "../../../state/local/hooks/useCurrentLocation";
import { useCurrentWeather } from "../../../state/remote/hooks/useCurrentWeather";
import { useTranslation } from "../../../localization/TranslationsProvider";
import { NamedFields } from "../../organisms/report/NamedFields";

export const CurrentWeatherReport: React.FC = () => {
  const location = useCurrentLocation();
  const currentWeather = useCurrentWeather(location?.lat, location?.lon).data;
  
  const weatherDescription = useMemo(() => 
    currentWeather?.weather
      .map((weather) => weather.description)
      .join(","),
    [currentWeather?.weather]
  );

  const { t } = useTranslation();
  const description = useMemo(() => 
    currentWeather
      ? t("weatherFor", {
          name: currentWeather.name.toString() ?? "...",
          description: weatherDescription ?? "...",
        })
      : t("searchFirst"),
    [currentWeather, weatherDescription, t]
  );

  return (
    <div className="flex flex-col place-items-center">
      <div className="text-4xl pb-8">{description}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 space-y-3 md:space-y-0 md:space-x-3">
        <NamedFields
          title={t("temperature")}
          values={[
            [t("currentTemperature"), currentWeather?.main.temp.toString()],
            [t("feelsLike"), currentWeather?.main.feels_like.toString()],
            [
              t("minMaxTemp"),
              currentWeather
                ? `${currentWeather.main.temp_min} / ${currentWeather.main.temp_min}`
                : "",
            ],
            [t("humidity"), currentWeather?.main.humidity.toString()],
          ]}
        />
        <NamedFields
          title={t("wind")}
          values={[
            [t("degrees"), currentWeather?.wind.deg.toString()],
            [t("windSpeed"), currentWeather?.wind.speed.toString()],
            [t("windGust"), currentWeather?.wind.speed.toString()],
          ]}
        />
      </div>
    </div>
  );
};
