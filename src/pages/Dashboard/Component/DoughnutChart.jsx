import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

export default function UserDoughnutChart() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Total users", "Repeated Users"],
      datasets: [
        {
          data: [300, 50],
          backgroundColor: ["#88A2FF", "#1339FF"],
          hoverBackgroundColor: ["#88A2FF", "#1339FF"],
        },
      ],
    };
    const options = {
      cutout: "70%",
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="flex justify-content-center">
      <Chart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        className="w-full md:w-30rem"
      />
    </div>
  );
}
