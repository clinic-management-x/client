import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineController,
  BarController,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { IData } from "./page";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineController,
  BarController
);
interface Props {
  chartData: IData;
}
const AppointmentByTime = ({ chartData }: Props) => {
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Appointment",
        data: chartData.dataArr,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.4,
      },
    ],
  };
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: true,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center ">
      <LabelTypography title="Appointment By Period" />
      <div className="min-w-[300px] w-full px-3">
        <Chart type="line" data={data} options={options} className="mt-8 " />
      </div>
    </div>
  );
};

export default AppointmentByTime;
