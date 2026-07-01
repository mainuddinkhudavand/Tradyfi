import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#9aa5b8",
        font: { family: "Inter", size: 12 },
      },
    },
    title: {
      display: true,
      text: "Holdings — Stock Price",
      color: "#e8edf5",
      font: { family: "Inter", size: 14, weight: "600" },
    },
    tooltip: {
      backgroundColor: "rgba(9,14,26,0.95)",
      borderColor: "rgba(255,255,255,0.08)",
      borderWidth: 1,
      titleColor: "#e8edf5",
      bodyColor: "#9aa5b8",
    },
  },
  scales: {
    x: {
      ticks: { color: "#5c6a82", font: { size: 11 } },
      grid: { color: "rgba(255,255,255,0.04)" },
    },
    y: {
      ticks: { color: "#5c6a82", font: { size: 11 } },
      grid: { color: "rgba(255,255,255,0.04)" },
    },
  },
};

export function VerticalGraph({ data }) {
  const themedData = {
    ...data,
    datasets: data.datasets.map((ds) => ({
      ...ds,
      backgroundColor: "rgba(61, 127, 255, 0.6)",
      borderColor: "rgba(61, 127, 255, 1)",
      borderWidth: 1,
      borderRadius: 4,
    })),
  };
  return <Bar options={options} data={themedData} />;
}
