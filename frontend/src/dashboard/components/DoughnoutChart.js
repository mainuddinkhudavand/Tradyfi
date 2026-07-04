import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  cutout: "65%",
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#9aa5b8",
        font: { family: "Inter", size: 11 },
        padding: 12,
        boxWidth: 10,
        boxHeight: 10,
      },
    },
    tooltip: {
      backgroundColor: "rgba(9,14,26,0.95)",
      borderColor: "rgba(255,255,255,0.08)",
      borderWidth: 1,
      titleColor: "#e8edf5",
      bodyColor: "#9aa5b8",
    },
  },
};

export function DoughnutChart({ data }) {
  return (
    <div style={{ padding: "16px", maxWidth: 240, margin: "0 auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}
