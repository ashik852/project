import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
} from "chart.js";
import { PolarArea, Bar, Line } from "react-chartjs-2";
import "./charts.css"; // external CSS file

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title
);

// Polar Area Chart Data
const polarData = {
  labels: ["Adventure", "Beach", "Cultural", "Camping", "Boat"],
  datasets: [
    {
      label: "Polar Dataset",
      data: [11, 16, 7, 3, 14],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(255, 205, 86, 0.6)",
        "rgba(201, 203, 207, 0.6)",
        "rgba(54, 162, 235, 0.6)",
      ],
    },
  ],
};

// Bar Chart Data
const barData = {
  labels: ["jun", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Monthly Sales",
      data: [120, 190, 300, 500, 200],
      backgroundColor: "rgba(54, 162, 235, 0.6)",
    },
  ],
};

// Line Chart Data
const lineData = {
  labels: ["jun", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Revenue Growth",
      data: [100, 150, 400, 350, 600],
      fill: false,
      borderColor: "rgba(255, 99, 132, 0.8)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      tension: 0.3,
      pointRadius: 5,
    },
  ],
};

// ✅ Custom Tooltip options
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        title: function (context) {
          return `📊 Label: ${context[0].label}`;
        },

        label: function (context) {
          return `🔹 Value: ${context.parsed.y ?? context.parsed}`;
        },

        footer: function () {
          return "✨ Custom Tooltip by Ashik";
        },
      },
      backgroundColor: "rgba(0,0,0,0.8)",
      titleColor: "#fff",
      bodyColor: "#ddd",
      footerColor: "#aaa",
      titleFont: { size: 14, weight: "bold" },
      bodyFont: { size: 13 },
      footerFont: { size: 12, style: "italic" },
      padding: 10,
      cornerRadius: 8,
    },
  },
};

export default function PolarBarLineChart() {
  return (
    <div className="chart-wrapper">
      {/* Top section: Polar + Bar side by side */}
      <div className="chart-container">
        <div className="chart-box">
          <h3>Most Booked Tour Categories</h3>
          <div className="chart-inner">
            <PolarArea data={polarData} options={options} />
          </div>
        </div>

        <div className="chart-box">
          <h3>Monthly Tour Booking</h3>
          <div className="chart-inner">
            <Bar data={barData} options={options} />
          </div>
        </div>
      </div>

      {/* Bottom section: Line chart full width */}
      <div className="chart-line">
        <h3>Monthly Tour Booking</h3>
        <div className="chart-inner">
          <Line data={lineData} options={options} />
        </div>
      </div>
    </div>
  );
}
