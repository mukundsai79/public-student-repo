import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { PiX } from "react-icons/pi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PopulationChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Population",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        minBarLength: 10,
      },
    ],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://cs464p564-frontend-api.vercel.app/api/countries")
      .then((response) => {
        const labels = response.data.map((country) => country.name);
        const data = response.data.map((country) => country.population);
        setChartData({
          labels,
          datasets: [
            {
              label: "Population",
              data,
              backgroundColor: (context) => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) {
                  return;
                }
                const gradient = ctx.createLinearGradient(
                  0,
                  0,
                  0,
                  chartArea.bottom
                );
                gradient.addColorStop(0, "rgba(75, 192, 192, 1)");
                gradient.addColorStop(1, "rgba(54, 162, 235, 1)");
                return gradient;
              },
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              minBarLength: 10,
            },
          ],
        });
      })
      .catch((err) => {
        console.error("Error fetching population data:", err);
        setError("Failed to load population data");
      });
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: "easeInOutQuad",
    },
    plugins: {
      title: {
        display: true,
        text: "Population Distribution Across South American Countries",
        font: { size: 24, weight: "bold" },
        color: "#333",
        padding: { top: 30, bottom: 20 },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        bodyFont: { weight: "bold" },
        cornerRadius: 6,
        xPadding: 12,
        yPadding: 12,
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw.toLocaleString()} people`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { size: 14, weight: "bold" },
          color: "#555",
          autoSkip: true,
        },
      },
      y: {
        grid: { color: "#ddd", borderColor: "#ddd" },
        ticks: {
          font: { size: 14, weight: "bold" },
          color: "#555",
          beginAtZero: true,
          stepSize: 5000000,
        },
      },
    },
  };

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px", color: "#ff0000" }}>
        {error}
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        paddingTop: "60px",
        paddingBottom: "60px",
        backgroundColor: "#f7f7f7",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h2
          style={{
            fontWeight: "bold",
            color: "#333",
            fontSize: "28px",
            marginBottom: "20px",
            marginTop: "100px",
          }}
        >
          Population Distribution Across South American Countries
        </h2>
        <p style={{ fontSize: "16px", color: "#666" }}>
          Visualizing the population size of countries in South America.
        </p>
      </div>

      <div
        style={{
          position: "relative",
          height: "300px",
          maxWidth: "100%",
          margin: "0 auto",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          padding: "20px",
        }}
      >
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PopulationChart;
