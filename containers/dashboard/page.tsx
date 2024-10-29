"use client";
import BasicSelector from "@/components/selectors/BasicSelector/page";
import { getData } from "@/datafetch/dashboard/dashboard.api";
import config from "@/utils/config";
import { dashboardEndPoint } from "@/utils/endpoints";
import { dashboardFilter } from "@/utils/staticData";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import SkeletonFrame from "./SkeletonFrame";
import AppointmentByTime from "./AppointmentByTime";
import DoctorsByAppointments from "./DoctorsByAppointments";
import SuppliersByOrders from "./SuppliersByOrders";
import OrderCountByTime from "./OrderCountByTime";

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

  const { data, isLoading, mutate } = useSWR(
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

  return (
    <section className="flex flex-col overflow-y-scroll">
      <Box sx={{ mb: 40 }}>
        <div
          className={`h-[70px] md:h-[80px] mt-16 md:mt-0 w-full flex items-center justify-between md:justify-start `}
        >
          <div className={`w-[40%] pl-4`}>
            <BasicSelector
              dataArr={dashboardFilter}
              title={""}
              handleChange={(e: any, value: any) => {
                setSelectedValue(e.target.value);
              }}
              selectedValue={selectedValue}
            />
          </div>
        </div>
        <div className="w-full h-full mt-4   px-2 overflow-scroll">
          {isLoading ? (
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
