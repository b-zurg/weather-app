import React from "react";
import { TemperatureSnapshot } from "../../../lib/interfaces/Temperature";
import { useTranslation } from "../../../localization/TranslationsProvider";
import { format } from "date-fns";
interface DayButtonProps {
  day: string;
  onClick: () => void;
  temperatures: Omit<TemperatureSnapshot, "current">;
}

export const DayButton: React.FC<DayButtonProps> = ({
  day,
  temperatures,
  onClick,
}) => {
  const dayDate = Date.parse(day);
  const dayText = format(dayDate, "eee");
  const { t } = useTranslation();
  const highTranslation = t("high", {
    value: t("degreesSymbol", {
      value: temperatures.high.toString(),
    }),
  });
  const lowTranslation = t("low", {
    value: t("degreesSymbol", {
      value: temperatures.low.toString(),
    }),
  });
  return (
    <div
      className="cursor-pointer w-[6rem] h-[6rem] p-2 rounded-lg flex flex-col hover:shadow-lg bg-gray-600 hover:bg-gray-500 transition ease-in-out align-items-center"
      onClick={onClick}
    >
      <div className="text-xl text-center truncate">{dayText}</div>
      <div className="text-sm text-center truncate">{highTranslation}</div>
      <div className="text-sm text-center truncate">{lowTranslation}</div>
    </div>
  );
};
