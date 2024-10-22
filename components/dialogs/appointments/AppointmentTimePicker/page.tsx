"use client";

import LabelTypography from "@/components/typography/LabelTypography/page";
import {
  getAvailableDays,
  getAvailableSchedules,
  getBookedTimeArr,
  getSelectedAppointment,
  getSelectedDoctor,
  getTimeStamps,
  insertAvailableDays,
  insertAvailableSchedules,
  insertBookedTimeArr,
  insertTimeStamps,
} from "@/redux/slices/appointment";
import {
  convertStampsToISO,
  filterTimestampsByDay,
  filterTimestampsByTimeRange,
  getCustomDay,
  getTimestampsForSchedule,
} from "@/utils/calculations";
import { Chip } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import dayjs, { Dayjs } from "dayjs";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookedAppointments } from "@/datafetch/appointments/appointment.api";
import config from "@/utils/config";
import { appointmentEndPoint } from "@/utils/endpoints";

interface Props {
  appointment: CrudAppointmentType;
  setAppointment: (data: CrudAppointmentType) => void;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AppointmentTimePicker = ({ appointment, setAppointment }: Props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const sx = {
    color: theme.theme === "dark" ? "#C4C4C4" : "",
  };
  const selectedAppointment = useSelector(getSelectedAppointment);
  const selectedDoctor = useSelector(getSelectedDoctor);
  const availableSchedules = useSelector(getAvailableSchedules);
  const availableDays = useSelector(getAvailableDays);
  const timeStamps = useSelector(getTimeStamps);
  const bookedTimeArr = useSelector(getBookedTimeArr);
  const [value, setValue] = useState(0);
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [startTime, setStartTime] = useState<Dayjs | null>(dayjs());
  const [endTime, setEndTime] = useState<Dayjs | null>(dayjs());

  useEffect(() => {
    if (selectedAppointment) {
      setDate(dayjs(selectedAppointment.appointmentDate));
      setStartTime(dayjs(selectedAppointment.appointmentStartTime));
      setEndTime(dayjs(selectedAppointment.appointmentEndTime));
    } else {
      setAppointment({
        ...appointment,
        appointmentDate: date?.toISOString(),
        appointmentStartTime: startTime?.toISOString(),
        appointmentEndTime: endTime?.toISOString(),
      });
    }
  }, [selectedAppointment]);

  useEffect(() => {
    if (selectedDoctor) {
      let days: number[] = [];
      selectedDoctor?.schedules?.map((schedule) => {
        const start = Math.floor(schedule.start / 1440);
        const end = Math.floor(schedule.end / 1440);
        days.push(start, end);
      });

      dispatch(insertAvailableDays([...new Set(days)]));
    }
  }, [selectedDoctor]);

  useEffect(() => {
    if (!availableSchedules || !date) return;
    let stamps: number[] = [];

    const currentDay = ((date?.get("day") as number) + 6) % 7;

    availableSchedules.forEach((schedule) => {
      getTimestampsForSchedule(
        schedule,
        selectedDoctor?.duration || 20,
        stamps
      );
    });

    const todayStamps = filterTimestampsByDay(stamps, currentDay);

    const timeStampsToAdd = convertStampsToISO(todayStamps, date);

    const morning = date?.set("hour", 0).set("minute", 0);
    const noon = date?.set("hour", 12).set("minute", 0);
    const evening = date?.set("hour", 17).set("minute", 0);
    const night = date?.set("hour", 22).set("minute", 0);
    const nextMorning = date?.add(1, "day").set("hour", 0).set("minute", 0);

    switch (value) {
      case 0:
        dispatch(
          insertTimeStamps(
            filterTimestampsByTimeRange(timeStampsToAdd, morning, noon)
          )
        );

        break;
      case 1:
        dispatch(
          insertTimeStamps(
            filterTimestampsByTimeRange(timeStampsToAdd, noon, evening)
          )
        );

        break;
      case 2:
        dispatch(
          insertTimeStamps(
            filterTimestampsByTimeRange(timeStampsToAdd, evening, night)
          )
        );
        break;
      case 3:
        dispatch(
          insertTimeStamps(
            filterTimestampsByTimeRange(timeStampsToAdd, night, nextMorning)
          )
        );
        break;
      default:
        break;
    }
  }, [availableSchedules, value]);

  return (
    <div className="flex flex-col p-1">
      <LabelTypography title="Appointment Time" />
      <div className="flex flex-col justify-start mt-6">
        <div className="flex justify-start">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              className="border border-[#C4C4C4] dark:border-darkText rounded mb-4 ml-0 md:mb-0 w-full md:w-[300px] h-[300px] "
              value={date}
              disablePast
              shouldDisableDate={(day: dayjs.Dayjs) => {
                const currentDay = getCustomDay(day.day());

                if (availableDays.includes(currentDay)) {
                  return false;
                }
                return true;
              }}
              sx={{
                color: theme.theme == "dark" ? "#C4C4C4" : "",
                "& .MuiDayCalendar-weekDayLabel": {
                  color: theme.theme == "dark" ? "#C4C4C4" : "",
                  fontWeight: "bold",
                },
              }}
              slotProps={{
                monthButton: {
                  sx: sx,
                },
                switchViewIcon: {
                  sx: sx,
                },
                nextIconButton: {
                  sx: sx,
                },

                previousIconButton: {
                  sx: sx,
                },

                day: {
                  sx: sx,
                },
              }}
              onChange={async (newValue) => {
                setDate(newValue);

                dispatch(
                  insertAvailableSchedules(
                    selectedDoctor?.schedules?.filter(
                      (schedule) =>
                        Math.floor(schedule.start / 1440) ==
                          getCustomDay(newValue.day()) ||
                        Math.floor(schedule.end / 1440) ===
                          getCustomDay(newValue.day())
                    ) as ScheduleType[]
                  )
                );
                setAppointment({
                  ...appointment,
                  appointmentDate: dayjs(newValue).toISOString(),
                  appointmentStartTime: startTime
                    ?.set("date", newValue.get("date"))
                    .toISOString(),
                  appointmentEndTime: endTime
                    ?.set("date", newValue.get("date"))
                    .toISOString(),
                });
                const data = await getBookedAppointments(
                  `${
                    config.apiBaseUrl
                  }/${appointmentEndPoint}/booked-appointments?doctor=${
                    selectedDoctor?._id
                  }&appointmentDate=${dayjs(newValue).toISOString()}`
                );
                if (data && data?.length) {
                  dispatch(
                    insertBookedTimeArr(
                      data?.map((idata: AppointmentType) =>
                        dayjs(idata.appointmentStartTime).format(
                          "DD MMM YYYY hh:mm a"
                        )
                      )
                    )
                  );
                } else {
                  dispatch(insertBookedTimeArr([]));
                }
              }}
            />
          </LocalizationProvider>
        </div>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            display: availableSchedules?.length ? "" : "none",
          }}
        >
          <Tabs
            value={value}
            onChange={(e, valuea) => {
              setValue(valuea);
            }}
            aria-label="basic tabs example"
          >
            <Tab label="Morning" {...a11yProps(0)} />
            <Tab label="Afternoon" {...a11yProps(1)} />
            <Tab label="Evening" {...a11yProps(2)} />
            <Tab label="Night" {...a11yProps(3)} />
          </Tabs>
        </Box>

        {timeStamps.length ? (
          <div className="flex flex-wrap  w-full justify-center mt-4 ">
            {timeStamps.map((timestamp, index) => {
              return (
                <Chip
                  key={index}
                  sx={{ borderRadius: 2 }}
                  onClick={() => {
                    setAppointment({
                      ...appointment,
                      appointmentStartTime: timestamp,
                      appointmentEndTime: dayjs(timestamp)
                        .set(
                          "minute",
                          dayjs(timestamp).get("minute") +
                            (selectedDoctor?.duration || 20)
                        )
                        .toISOString(),
                    });
                  }}
                  disabled={bookedTimeArr.includes(
                    dayjs(timestamp).format("DD MMM YYYY hh:mm a")
                  )}
                  label={dayjs(timestamp).format("hh:mm a")}
                  className={`ml-2 mt-2 ${
                    appointment.appointmentStartTime === timestamp
                      ? "bg-primaryBlue-300 hover:bg-primaryBlue-300 text-white"
                      : ""
                  } `}
                />
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AppointmentTimePicker;
