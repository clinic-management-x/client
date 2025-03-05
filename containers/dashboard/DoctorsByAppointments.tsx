import React from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "@mui/material";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { Chart } from "react-chartjs-2";
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
  selectedValue: string;
}
const DoctorsByAppointments = ({ chartData, selectedValue }: Props) => {
  const mutilpliedValue =
    selectedValue === "1" || selectedValue === "2" ? 70 : 100;
  const data = {
    //labels: chartData.labels,
    labels: ["Lucy", "Mark", "John", "Alice", "Fern"],
    datasets: [
      {
        label: "Appointment Count",
        //chartData.dataArr
        data: [0, 1, 2, 3, 4].map((num) => Math.floor(Math.random() * 70) + 1),
        backgroundColor: "#CCF3F4",
        borderColor: "#7FC5C6",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          display: true,
        },
        ticks: {
          autoSkip: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
    },
    maxBarThickness: 50,
  };
  console.log("data 1", data, chartData);
  return (
    <div className="flex flex-col items-center ">
      <LabelTypography title="Doctors By Appointment Count" />
      <div className="min-w-[300px] w-full px-3">
        <Chart type="bar" data={data} options={options} className="mt-8" />
      </div>
    </div>
  );
};

export default DoctorsByAppointments;
