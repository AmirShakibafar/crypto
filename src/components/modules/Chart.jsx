// src/components/modules/Chart.js
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";

import styles from "./Chart.module.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

function Chart({ chart, setChart }) {
  const [chartType, setChartType] = useState("prices");
  if (!chart?.prices) return null;

  const labels = chart[chartType].map((item) =>
    new Date(item[0]).toLocaleDateString()
  );

  const data = {
    labels,
    datasets: [
      {
        label:
          chartType === "prices"
            ? "Price (USD)"
            : chartType === "market_caps"
            ? "Market Cap (USD)"
            : "Total Volume (USD)",
        data: chart[chartType].map((item) => item[1]),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
        fill: true,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10,
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (USD)",
        },
      },
    },
  };

  return (
    <div className={styles.container}>
      <span onClick={() => setChart(null)} className={styles.cross}>
        X
      </span>
      <div className={styles.chart}>
        <Line data={data} options={options} />
        <div className={styles.chartTypeSelector}>
          <button onClick={() => setChartType("prices")}>Price</button>
          <button onClick={() => setChartType("market_caps")}>
            Market Cap
          </button>
          <button onClick={() => setChartType("total_volumes")}>Volume</button>
        </div>
      </div>
    </div>
  );
}

export default Chart;
