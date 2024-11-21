import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bubble } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  BubbleController,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";

const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0.8)`;
};

Chart.register(
  CategoryScale,
  LinearScale,
  BubbleController,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const EconomyChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://cs464p564-frontend-api.vercel.app/api/countries")
      .then((response) => {
        const labels = response.data.map((country) => country.name);
        const gdp = response.data.map((country) => country.gdp_billions || 0);
        const populations = response.data.map(
          (country) => country.population || 0
        );

        const data = gdp.map((value, index) => ({
          x: value,
          y: populations[index] / 1000000,
          r: Math.sqrt(populations[index] / 1000000),
          backgroundColor: generateRandomColor(),
          borderColor: "rgba(255, 255, 255, 1)",
          borderWidth: 2,
        }));

        setChartData({
          labels,
          datasets: [
            {
              label: "GDP vs Population",
              data,
            },
          ],
        });
      })
      .catch(() => setError("Failed to load GDP data"));
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "GDP vs Population of South American Countries",
        font: { size: 24, weight: "bold" },
        color: "#333",
        padding: { top: 30, bottom: 15 },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
        callbacks: {
          label: (tooltipItem) => {
            const country = tooltipItem.raw;
            return `${
              tooltipItem.label
            }: GDP $${country.x.toLocaleString()} Billion, Population ${country.y.toLocaleString()} Million`;
          },
        },
      },
      legend: {
        position: "top",
        labels: {
          font: { size: 14, weight: "bold" },
          padding: 20,
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "GDP (in Billion $)",
        },
        ticks: {
          font: { size: 14, weight: "bold" },
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },
      y: {
        title: {
          display: true,
          text: "Population (in Millions)",
        },
        ticks: {
          font: { size: 14, weight: "bold" },
        },
      },
    },
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div
      style={{
        padding: "80px 20px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "30px",
          marginTop: "100px", // Added margin-top of 100px as requested
        }}
      >
        GDP vs Population of South American Countries
      </h1>
      <p
        style={{
          fontSize: "18px",
          color: "#666",
          marginBottom: "50px",
          lineHeight: "1.6",
        }}
      >
        This bubble chart compares the GDP (in billions) and population (in
        millions) of South American countries. The size of the bubble represents
        population size, and each bubble is colored differently for visual
        distinction.
      </p>
      <div
        style={{
          width: "100%",
          height: "500px",
          maxWidth: "800px",
          margin: "0 auto",
          borderRadius: "15px",
          boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          padding: "20px",
        }}
      >
        <Bubble data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default EconomyChart;
