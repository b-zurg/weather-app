import React from "react";
import { TemperatureSnapshot } from "../../../lib/interfaces/Temperature";
import { useTranslation } from "../../../localization/TranslationsProvider";

interface LocationCardProps {
  name: string;
  time: string;
  condition: string;
  temperature: TemperatureSnapshot;
}

export const LocationCard: React.FC<LocationCardProps> = React.memo(({
  name,
  time,
  condition,
  temperature,
}) => {
  const { t } = useTranslation();

  const highString = t("degreesSymbol", {
    value: `${t("highAbbreviation")}:${temperature.high}`,
  });
  const lowString = t("degreesSymbol", {
    value: `${t("lowAbbreviation")}:${temperature.low}`,
  });
  const highAndLow = `${highString} ${lowString}`;

  return (
    <div className="grid grid-cols-3 max-w-md p-3 rounded-lg bg-gray-300">
      <div className="col-span-2">
        <div className="flex-1">
          <div className="text-lg self-start">{name}</div>
          <div className="text-xs self-start">{time}</div>
          <div className="text-xs self-end">{condition}</div>
        </div>
      </div>
      <div className="col-span-1 text-right">
        <div className="text-2xl self-start">{temperature.current} °</div>
        <div className="self-end">
          <div className="text-end">{highAndLow} </div>
        </div>
      </div>
    </div>
  );
});
