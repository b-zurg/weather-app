import React from "react";
import { Direction } from "../../../lib/interfaces/Direction";

interface AxisProps {
  direction: Direction;
  length: number;
  thickness: number;
}
export const Axis: React.FC<AxisProps> = ({ direction, length, thickness }) => {
  const directionStyle: Record<Direction, React.CSSProperties> = {
    horizontal: {
      width: length,
      minWidth: length,
      height: thickness,
      minHeight: thickness,
    },
    vertical: {
      width: thickness,
      minWidth: thickness,
      height: length,
      minHeight: length,
    },
  };
  return (
    <div className="absolute bg-black" style={directionStyle[direction]} />
  );
};
