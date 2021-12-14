import React, { useState } from "react";
import { TextInput } from "../../molecules/form/TextInput";
import { useDispatch } from "react-redux";
import { CityResult } from "../../molecules/form/CityResult";
import { useCities } from "../../../state/remote/hooks/useCities";
import { getKeyFromLocation } from "../../../lib/location";
import { LocationActions } from "../../../state/local/LocationsSlice";
import { useAppSelector } from "../../../state/local/AppStore";
import { useTranslation } from "../../../localization/TranslationsProvider";

export const CitySearch: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentCity = useAppSelector(
    (state) => state.locations.currentLocation
  );
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const { data } = useCities(searchValue);

  return (
    <div className="pt-8 px-4 flex flex-col items-center">
      {/* <div className="text-3xl">{t("searchHere")}</div> */}
      <div className="px-4 min-w-full">
        <TextInput initialValue={t("searchHere")} onChange={setSearchValue} />
      </div>
      <div className="flex flex-col p-4 min-w-full space-y-2">
        {data?.map((city) => {
          const key = getKeyFromLocation(city);
          const isActive = key === currentCity;
          return (
            <CityResult
              key={getKeyFromLocation(city)}
              city={city}
              isActive={isActive}
              onClick={() => dispatch(LocationActions.setCurrentLocation(city))}
            />
          );
        })}
      </div>
    </div>
  );
};
