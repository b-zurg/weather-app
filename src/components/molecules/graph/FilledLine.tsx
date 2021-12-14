import React from "react";
import { Point } from "../../../lib/interfaces/Graph";
import {
  convertPointsToPath,
  invertPointsYCoordinate,
} from "../../../lib/graph";

interface FilledLineProps {
  width: number;
  height: number;
  points: Point[];
}
/**
 * This compoonent will take in an array of x,y points and create a filled line chart with these points.
 */
export const FilledLine: React.FC<FilledLineProps> = ({
  width,
  height,
  points,
}) => {
  const invertedPoints = invertPointsYCoordinate(points, height);
  const fillPath = convertPointsToPath(invertedPoints, height);
  const linePath = convertPointsToPath(invertedPoints);
  return (
    <div style={{ width, height }}>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <polyline
          points={linePath}
          fill="none"
          stroke="#037a8a"
          strokeWidth={3}
        />
        <polygon points={fillPath} style={{ fill: "#0ab5cc" }} />
      </svg>
    </div>
  );
};
