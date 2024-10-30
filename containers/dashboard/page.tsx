"use client";
import BasicSelector from "@/components/selectors/BasicSelector/page";
import { getData } from "@/datafetch/dashboard/dashboard.api";
import config from "@/utils/config";
import { dashboardEndPoint } from "@/utils/endpoints";
import { dashboardFilter } from "@/utils/staticData";
import { Box, Button, CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import SkeletonFrame from "./SkeletonFrame";
import AppointmentByTime from "./AppointmentByTime";
import DoctorsByAppointments from "./DoctorsByAppointments";
import SuppliersByOrders from "./SuppliersByOrders";
import OrderCountByTime from "./OrderCountByTime";
import { FaFileDownload } from "react-icons/fa";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface IData {
  labels: string[];
  dataArr: number[];
}

interface IChartData {
  doctorsByAppointment: IData;
  appointmentByDate: IData;
  suppliersByOrder: IData;
  ordersByDate: IData;
}
const DashboardDisplay = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [selectedValue, setSelectedValue] = useState("1");
  const [start, setStart] = useState(dayjs().set("date", 1));
  const [end, setEnd] = useState(dayjs().set("date", dayjs().daysInMonth()));
  const [chartData, setChartData] = useState<IChartData>({
    doctorsByAppointment: {
      labels: [],
      dataArr: [],
    },
    appointmentByDate: {
      labels: [],
      dataArr: [],
    },
    suppliersByOrder: {
      labels: [],
      dataArr: [],
    },
    ordersByDate: {
      labels: [],
      dataArr: [],
    },
  });
  const [isDownloading, setIsDownloading] = useState(false);

  const hanldeDateRange = () => {
    switch (selectedValue) {
      case "1":
        setStart(dayjs().set("date", 1));
        setEnd(dayjs().set("date", dayjs().daysInMonth()));
        break;
      case "2":
        const lastmonth = dayjs().set("month", dayjs().get("month") - 1);
        setStart(lastmonth.set("date", 1));
        setEnd(lastmonth.set("date", lastmonth.daysInMonth()));
        break;

      case "3":
        const yearstart = dayjs().set("month", 0);
        const yearEnd = dayjs().set("month", 11);
        setStart(yearstart.set("date", 1));
        setEnd(yearEnd.set("date", yearEnd.daysInMonth()));
        break;

      case "4":
        const lastyearStart = dayjs()
          .set("year", dayjs().get("year") - 1)
          .set("month", 0);
        const lastyearEnd = dayjs()
          .set("year", dayjs().get("year") - 1)
          .set("month", 11);
        setStart(lastyearStart.set("date", 1));
        setEnd(lastyearEnd.set("date", lastyearEnd.daysInMonth()));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    hanldeDateRange();
  }, [selectedValue]);

  const { data, isLoading, mutate, isValidating } = useSWR(
    `${config.apiBaseUrl}/${dashboardEndPoint}?start=${start
      .startOf("day")
      .toISOString()}&end=${end.endOf("day").toISOString()}`,
    getData
  );

  useEffect(() => {
    if (data) {
      setChartData(data);
    }
  }, [data]);

  const handleDownload = () => {
    try {
      if (isDownloading || isLoading || isValidating) return;
      setIsDownloading(true);
      const input = contentRef.current;
      if (input) {
        html2canvas(input, { scale: 1 }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const pageWidth = pdf.internal.pageSize.getWidth();
          const imgWidth = pageWidth - 20;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          pdf.setFontSize(10);
          pdf.text(
            `Clinic Analytics: From ${start.format(
              "DD MMM YYYY"
            )} to ${end.format("DD MMM YYYY")}`,
            10,
            10
          );

          const marginTop = 20;
          pdf.addImage(
            imgData,
            "JPEG",
            10,
            marginTop,
            imgWidth,
            imgHeight,
            undefined,
            "FAST"
          );
          pdf.save("clinic-analytics.pdf");
        });
      }
      setIsDownloading(false);
      toast.success("Successfully downloaded.");
    } catch (error) {
      setIsDownloading(false);
      toast.error("Something went wrong.");
    }
  };

  return (
    <section className="flex flex-col overflow-y-scroll">
      <Box sx={{ mb: 40 }}>
        <div
          className={`h-[70px] md:h-[80px] mt-16 md:mt-0 w-full flex items-center justify-between md:justify-start `}
        >
          <div className={`w-[40%] pl-4 flex items-center space-x-2`}>
            <BasicSelector
              dataArr={dashboardFilter}
              title={""}
              handleChange={(e: any, value: any) => {
                setSelectedValue(e.target.value);
              }}
              selectedValue={selectedValue}
            />
            <Button
              variant="contained"
              className={`bg-primaryBlue-400 min-w-[120px] `}
              startIcon={isDownloading ? <></> : <FaFileDownload size={14} />}
              onClick={handleDownload}
            >
              {isDownloading ? (
                <CircularProgress color="inherit" size={30} />
              ) : (
                "Download PDF"
              )}
            </Button>
          </div>
        </div>
        <div
          ref={contentRef}
          className="w-full h-full mt-4   px-2 overflow-scroll"
        >
          {isLoading || isValidating ? (
            <SkeletonFrame />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2">
              <AppointmentByTime chartData={chartData.appointmentByDate} />

              <DoctorsByAppointments
                chartData={chartData.doctorsByAppointment}
              />
              <OrderCountByTime chartData={chartData.ordersByDate} />
              <SuppliersByOrders chartData={chartData.suppliersByOrder} />
            </div>
          )}
        </div>
      </Box>
    </section>
  );
};

export default DashboardDisplay;
