import React from "react";
import { Direction } from "../../../lib/interfaces/Direction";
import { generateTicks } from "../../../lib/ticks";

interface TicksProps {
  length: number;
  start: number;
  step: number;
  direction: Direction;
  formatTick: (step: number) => string;
}
export const Ticks: React.FC<TicksProps> = ({
  length,
  start,
  step,
  formatTick,
  direction,
}) => {
  const ticks = generateTicks({ start, step, stop: length });
  const getMarkerStyle = (position: number): React.CSSProperties =>
    direction === "horizontal"
      ? {
          left: position,
        }
      : { top: position, left: "-3rem" };

  const tickMarkers = ticks.map((tick) => (
    <div key={tick} className="absolute" style={getMarkerStyle(tick)}>
      {formatTick(tick)}
    </div>
  ));
  return <>{tickMarkers}</>;
};
