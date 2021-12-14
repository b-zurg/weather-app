import React, { useRef } from "react";
import { CitySearch } from "../components/organisms/form/CitySearch";
import { LineGraphMultiDay } from "../components/layouts/graph/LineGraphMultiDay";
import { CurrentWeatherReport } from "../components/layouts/report/CurrentWeatherReport";
import { useElementDimensions } from "../hooks/useElementDimensions";
export const Home: React.FC = () => {
  const reportContainerRef = useRef<HTMLDivElement | null>(null);
  const { width } = useElementDimensions(reportContainerRef);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 h-screen	w-full dark:text-gray-300 bg:white dark:bg-gray-900">
      <div className="col-span-1">
        <CitySearch />
      </div>
      <div className="col-span-1 sm:col-span-2 bg-gray=100 dark: bg-gray-800 pt-8 px-8 flex flex-col place-items-center">
        <CurrentWeatherReport />
        <div ref={reportContainerRef} className="w-[70%] sm:w-[50%] pt-12">
          {width && <LineGraphMultiDay width={width} />}
        </div>
      </div>
    </div>
  );
};
