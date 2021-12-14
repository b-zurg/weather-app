import React from "react";
import cn from "classnames";
import { City } from "../../../lib/interfaces/Location";
import { useTranslation } from "../../../localization/TranslationsProvider";

interface CityResultProps {
  city: City;
  isActive: boolean;
  onClick: () => void;
}

export const CityResult: React.FC<CityResultProps> = ({
  city,
  onClick,
  isActive,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={cn(
        "grid grid-cols-2 p-3 cursor-pointer ease-in-out rounded-lg shadow-lg",
        {
          "bg-gray-200 hover:bg-gray-100 dark:bg-gray-500 dark:hover:bg-gray-400":
            isActive,
          "bg-gray-100, dark:bg-gray-700 dark:hover:bg-gray-600": !isActive,
        }
      )}
      onClick={onClick}
    >
      <div>
        <div className="text-xl">{city.name}</div>
        <div>{city.state}</div>
      </div>
      <div className="text-right">
        {t("countryCode", { code: city.countryCode })}
      </div>
    </div>
  );
};
