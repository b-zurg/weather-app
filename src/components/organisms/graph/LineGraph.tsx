import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

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
  // Transform points data for Chart.js
  const labels = points.map(([date]) => format(date, "H:mm"));
  const data = points.map(([, value]) => value);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Temperature",
        data,
        borderColor: "#037a8a",
        backgroundColor: "rgba(10, 181, 204, 0.3)",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        callbacks: {
          title: (context: any) => {
            const dataIndex = context[0].dataIndex;
            const date = points[dataIndex][0];
            return format(date, "MMM dd, H:mm");
          },
          label: (context: any) => {
            return `Temperature: ${context.parsed.y}°C`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: false,
        },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          maxTicksLimit: 8,
          color: "#666",
        },
      },
      y: {
        display: true,
        title: {
          display: false,
        },
        grid: {
          display: true,
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "#666",
          callback: (value: any) => `${value}°C`,
        },
        min: yRange[0],
        max: yRange[1],
      },
    },
    interaction: {
      mode: "nearest" as const,
      axis: "x" as const,
      intersect: false,
    },
  };

  return (
    <div style={{ width, height }}>
      <Line data={chartData} options={options} />
    </div>
  );
};
