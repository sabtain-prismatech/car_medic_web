import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

export default function SalesLineChart({ chartValues }) {
  console.log(chartValues?.label);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: chartValues?.label,
      datasets: [
        {
          label: `Total Expense (${chartValues?.expenseValues
            ?.map(Number)
            .reduce((acc, val) => acc + val, 0)})`,
          data: chartValues?.expenseValues,
          fill: false,
          tension: 0.4,
          borderColor: "#dc3545",
        },
        {
          label: `Total Sale (${chartValues?.salesValues
            ?.map(Number)
            .reduce((acc, val) => acc + val, 0)})`,
          data: chartValues?.salesValues,
          fill: true,
          tension: 0.4,
          borderColor: "#1339FF",
          backgroundColor: "#cae6ff",
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="">
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  );
}
