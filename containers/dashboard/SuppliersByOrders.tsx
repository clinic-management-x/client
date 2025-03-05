import React from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "@mui/material";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { Chart } from "react-chartjs-2";
import { IData } from "./page";

interface Props {
  chartData: IData;
  selectedValue: string;
}

const SuppliersByOrders = ({ chartData, selectedValue }: Props) => {
  const mutilpliedValue =
    selectedValue === "1" || selectedValue === "2" ? 70 : 100;
  const data = {
    // labels: chartData.labels,
    labels: [
      "Clinico",
      "TrustCare",
      "Evergreen",
      "Medico",
      "Feme",
      "Meca group",
    ],
    datasets: [
      {
        label: "Order Count",
        //chartData.dataArr
        data: [0, 1, 2, 3, 4, 5, 6].map(
          (num) => Math.floor(Math.random() * mutilpliedValue) + 1
        ),
        backgroundColor: "#FFDDE4",
        borderColor: "#D591A5",
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
  return (
    <div className="flex flex-col items-center mt-16">
      <LabelTypography title="Suppliers By Order Count" />
      <div className="min-w-[300px] w-full px-3">
        <Chart type="bar" data={data} options={options} className="mt-8" />
      </div>
    </div>
  );
};

export default SuppliersByOrders;
