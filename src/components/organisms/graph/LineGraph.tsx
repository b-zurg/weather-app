import React from "react";
import { Point } from "../../../lib/interfaces/Graph";
import { scaleTime, scaleLinear, scaleTimeInvert } from "../../../lib/scale";
import { roundToNearestHour } from "../../../lib/time";
import { Axis } from "../../molecules/graph/Axis";
import { Ticks } from "../../molecules/graph/Ticks";
import { addHours, format } from "date-fns";
import { FilledLine } from "../../molecules/graph/FilledLine";

interface LineGraphProps {
  points: [Date, number][];
  width: number;
  height: number;
  xRange: [Date, Date];
  yRange: [number, number];
}

export const LineGraph: React.FC<LineGraphProps> = ({
  points,
  width,
  height,
  xRange,
  yRange,
}) => {
  const xScale = scaleTime({ from: xRange, to: [0, width] });
  const xScaleInvert = scaleTimeInvert({ from: [0, width], to: xRange });
  const yScale = scaleLinear({ from: yRange, to: [0, height] });
  const yScaleInvert = scaleLinear({ from: [0, height], to: yRange });

  const scaledPoints = points.map(([x, y]) => [
    xScale(x),
    yScale(y),
  ]) as Point[];

  const firstHour = roundToNearestHour(xRange[0], "up");
  const secondHour = addHours(firstHour, 3);
  const xScaleStep = xScale(secondHour) - xScale(firstHour);
  return (
    <div className="relative" style={{ width, height }}>
      <div className="relative" style={{ top: height }}>
        <Axis direction="horizontal" length={width} thickness={2} />
        <Ticks
          direction="horizontal"
          length={width}
          formatTick={(tick) => format(xScaleInvert(tick), "H:mm")}
          start={xScale(firstHour)}
          step={xScaleStep}
        />
      </div>
      <div className="relative">
        <Ticks
          direction="vertical"
          length={height}
          formatTick={(tick) => yScaleInvert(tick).toPrecision(2).toString()}
          start={0}
          step={height / 5}
        />
      </div>
      <FilledLine height={height} width={width} points={scaledPoints} />
    </div>
  );
};
