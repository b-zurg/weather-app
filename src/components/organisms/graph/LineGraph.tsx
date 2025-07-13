import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { format, isSameDay } from "date-fns";

interface LineGraphProps {
  points: [Date, number][];
  width: number;
  height: number;
  yRange: [number, number];
}

export const LineGraph: React.FC<LineGraphProps> = ({
  points,
  width,
  height,
  yRange,
}) => {
  // Transform points data for Recharts
  const data = points.map(([date, value]) => ({
    time: date,
    temperature: value,
    formattedTime: format(date, "H:mm"),
    isFirstPointOfDay: false, // Will be set below
  }));

  // Mark first point of each day
  data.forEach((item, index) => {
    if (index === 0 || !isSameDay(data[index - 1].time, item.time)) {
      item.isFirstPointOfDay = true;
    }
  });

  // Find day transition points for reference lines
  const dayTransitionPoints = data.reduce((acc, item, index) => {
    if (index > 0 && !isSameDay(data[index - 1].time, item.time)) {
      acc.push(index);
    }
    return acc;
  }, [] as number[]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="font-medium text-gray-900">
            {format(dataPoint.time, "MMM dd, H:mm")}
          </p>
          <p className="text-gray-600">
            Temperature: {dataPoint.temperature}°C
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomXAxisTick = ({ x, y, payload }: any) => {
    const dataPoint = data[payload.value];
    if (!dataPoint) return null;

    const isFirstPointOfDay = dataPoint.isFirstPointOfDay;
    
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="middle"
          fill="#555"
          fontSize={11}
        >
          {isFirstPointOfDay 
            ? format(dataPoint.time, "EEE\nH:mm")
            : format(dataPoint.time, "H:mm")
          }
        </text>
      </g>
    );
  };

  const CustomYAxisTick = ({ x, y, payload }: any) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={4}
          textAnchor="end"
          fill="#555"
          fontSize={11}
        >
          {payload.value}°C
        </text>
      </g>
    );
  };

  return (
    <div 
      style={{ 
        width, 
        height,
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        padding: "16px",
        border: "1px solid #e9ecef"
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.08)" />
          
          {/* Day transition reference lines */}
          {dayTransitionPoints.map((index) => (
            <ReferenceLine
              key={index}
              x={index}
              stroke="rgba(0, 0, 0, 0.15)"
              strokeDasharray="5 5"
              strokeWidth={1}
            />
          ))}
          
          <XAxis
            dataKey="formattedTime"
            tick={<CustomXAxisTick />}
            interval="preserveStartEnd"
            tickCount={Math.min(30, data.length)}
          />
          
          <YAxis
            domain={yRange}
            tick={<CustomYAxisTick />}
          />
          
          <Tooltip content={<CustomTooltip />} />
          
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#037a8a"
            strokeWidth={3}
            dot={{ fill: "#037a8a", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "#037a8a", strokeWidth: 2, fill: "#037a8a" }}
            fill="rgba(10, 181, 204, 0.3)"
            fillOpacity={0.3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
