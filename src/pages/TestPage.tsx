import React from "react";
import { DayButton } from "../components/molecules/button/DayButton";
import { LocationCard } from "../components/molecules/button/LocationCard";
import { Day } from "../lib/interfaces/Time";
import { LineGraph } from "../components/organisms/graph/LineGraph";
import { addHours } from "date-fns";
import { CitySearch } from "../components/organisms/form/CitySearch";

interface ComponentHeaderProps {
  children: React.ReactNode;
}

const ComponentHeader: React.FC<ComponentHeaderProps> = ({ children }) => (
  <>
    <div className="pb-5" />
    <div className="text-2xl pb-5">{children}</div>
  </>
);

const startDate = new Date(2000, 1, 1, 10, 15);

export const TestPage: React.FC = () => (
  <div className="container w-8/12 mx-auto flex flex-col align-items-center">
    <div className="text-3xl pb-7">Molecules</div>
    <ComponentHeader>Location Card</ComponentHeader>
    <LocationCard
      condition="Cloudy"
      name="Mannheim"
      temperature={{ current: 5, low: 2, high: 7 }}
      time="11:31"
    />
    <div className="pb-5" />
    <LocationCard
      condition="Cloudy"
      name="Mannheim"
      temperature={{ current: 5, low: 2, high: 7 }}
      time="11:31"
    />
    <ComponentHeader>DayButton</ComponentHeader>
    <DayButton
      day={Day.Sunday}
      temperatures={{ high: 7, low: 5 }}
      onClick={() => console.log("clicked day button")}
    />
    <ComponentHeader>Line Graph</ComponentHeader>
    <LineGraph
      height={400}
      width={600}
      points={[
        [startDate, 7],
        [addHours(startDate, 1), 5],
        [addHours(startDate, 2), 2],
        [addHours(startDate, 3), 3],
        [addHours(startDate, 4), 7],
        [addHours(startDate, 5), 9],
        [addHours(startDate, 6), 8],
        [addHours(startDate, 7), 9],
        [addHours(startDate, 8), 3],
        [addHours(startDate, 9), 1],
        [addHours(startDate, 10), 2],
        [addHours(startDate, 11), 4],
      ]}
      yRange={[0, 10]}
    />
    <ComponentHeader>City Search</ComponentHeader>
    <CitySearch />
  </div>
);
