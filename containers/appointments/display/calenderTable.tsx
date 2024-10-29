"use client";
import CustomDatePicker from "@/components/selectors/CustomDatePicker/page";
import { getAppointmentsByDate } from "@/datafetch/appointments/appointment.api";
import config from "@/utils/config";
import { appointmentEndPoint } from "@/utils/endpoints";
import {
  Avatar,
  AvatarGroup,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import defaultImage from "@/public/defaultAvatar.jpg";
import { GoLinkExternal } from "react-icons/go";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedDate,
  insertSelectedDate,
  insertSelectedDoctorAppointment,
  insertSelectedSchedule,
} from "@/redux/slices/layout";
import { days } from "@/utils/staticData";
import toast from "react-hot-toast";

interface Props {
  search: string;
}
const CalendarTable = ({ search }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const datePresent = useSelector(getSelectedDate);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    datePresent ? dayjs(datePresent) : dayjs()
  );

  const [doctorsByAppointmentDate, setDoctorByAppointmentDate] = useState<
    DoctorByAppointmentDate[]
  >([]);

  const { data, isLoading, mutate } = useSWR(
    `${
      config.apiBaseUrl
    }/${appointmentEndPoint}/datefilter?date=${selectedDate?.toISOString()}&search=${search}`,
    getAppointmentsByDate
  );

  useEffect(() => {
    if (data) {
      setDoctorByAppointmentDate(data);
    }
  }, [data]);

  useEffect(() => {
    mutate();
  }, [selectedDate]);

  return (
    <div>
      <div className="w-[170px] ml-4 mb-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CustomDatePicker
            value={selectedDate}
            handleChange={(value: Dayjs | null) => {
              setSelectedDate(value);
              dispatch(insertSelectedDate(value));
            }}
          />
        </LocalizationProvider>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mx-4">
        {isLoading
          ? [1, 2, 3].map((num) => (
              <Card className="mx-2 mb-6  dark:bg-[#171717]" key={num}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe">
                      <Image
                        src={defaultImage}
                        alt={""}
                        width={640}
                        height={320}
                      />
                    </Avatar>
                  }
                  title={
                    <Skeleton
                      width={100}
                      height={20}
                      className=" rounded dark:bg-darkText"
                    />
                  }
                  subheader={
                    <Skeleton
                      width={100}
                      height={20}
                      className=" rounded dark:bg-darkText"
                    />
                  }
                />
                <CardContent>
                  <Skeleton
                    width={200}
                    height={50}
                    className=" rounded dark:bg-darkText"
                  />
                </CardContent>
              </Card>
            ))
          : doctorsByAppointmentDate.map((doctor: DoctorByAppointmentDate) => {
              const currentday = (dayjs(selectedDate).get("day") + 6) % 7;
              const currentSchedule = doctor?.schedules?.find(
                (schedule) =>
                  Math.floor(schedule.start / 1440) == currentday ||
                  Math.floor(schedule.end / 1440) === currentday
              ) as unknown as ScheduleType;

              const startDay = days.find(
                (day) => day._id === Math.floor(currentSchedule?.start / 1440)
              );
              const endDay = days.find(
                (day) => day._id === Math.floor(currentSchedule?.end / 1440)
              );
              const startTime =
                currentSchedule?.start - Number(startDay?._id) * 1440;
              const endTime = currentSchedule?.end - Number(endDay?._id) * 1440;

              return (
                <Card className="mx-2 mb-6 dark:bg-[#171717]" key={doctor._id}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe">
                        <Image
                          src={doctor.avatarUrl || defaultImage}
                          alt={""}
                          width={640}
                          height={320}
                        />
                      </Avatar>
                    }
                    action={
                      <IconButton
                        aria-label="settings"
                        onClick={() => {
                          if (doctor.appointments.length == 0) {
                            return toast.error("No appointment.");
                          }
                          dispatch(
                            insertSelectedSchedule({
                              start: `${startDay?.name} ${dayjs()
                                .set("minute", startTime || 0)
                                .format("hh:mm a")}`,
                              end: `${endDay?.name} ${dayjs()
                                .set("minute", endTime || 0)
                                .format("hh:mm a")}`,
                            })
                          );
                          dispatch(insertSelectedDoctorAppointment(doctor));
                          router.push(
                            `appointments/${doctor.name.toLowerCase()}`
                          );
                        }}
                      >
                        <GoLinkExternal
                          size={20}
                          className="dark:text-darkText text-whiteText"
                        />
                      </IconButton>
                    }
                    title={doctor.name}
                    subheader={
                      <p className="dark:text-darkText text-whiteText">
                        {doctor.speciality.name}
                      </p>
                    }
                    className="dark:text-darkText text-whiteText"
                  />

                  <CardContent>
                    {currentSchedule ? (
                      <div className="flex items-center mb-3 h-[60px]">
                        <Typography
                          variant="body2"
                          className="font-bold dark:text-darkText text-whiteText"
                        >
                          Schedule:{" "}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="dark:text-darkText text-whiteText ml-4"
                        >
                          {`From  ${startDay?.name} ${dayjs()
                            .set("minute", startTime || 0)
                            .format("hh:mm a")}`}
                          <br />

                          {`To ${endDay?.name} ${dayjs()
                            .set("minute", endTime || 0)
                            .format("hh:mm a")}`}
                        </Typography>
                      </div>
                    ) : (
                      <div className="flex items-center mb-3 h-[60px]">
                        <Typography
                          variant="body2"
                          className="font-bold dark:text-darkText text-whiteText"
                        >
                          Schedule:{" "}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="dark:text-darkText text-whiteText ml-4"
                        >
                          {`No Schedule on ${selectedDate?.format(
                            "DD MMM YYYY"
                          )}`}
                        </Typography>
                      </div>
                    )}
                    {doctor.appointments.length ? (
                      <div className="flex justify-start">
                        <AvatarGroup max={4} className="w-auto">
                          {doctor.appointments.map((appointment) => (
                            <Avatar
                              className="bg-primaryBlue-400"
                              key={appointment._id}
                            >
                              {appointment.patient.name
                                .substring(0, 1)
                                .toUpperCase()}
                            </Avatar>
                          ))}
                        </AvatarGroup>
                      </div>
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                        className="dark:text-darkText text-whiteText"
                      >
                        No appointment for {selectedDate?.format("DD MMM YYYY")}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              );
            })}
      </div>
    </div>
  );
};

export default CalendarTable;
