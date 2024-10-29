"use client";
import BackButton from "@/components/buttons/BackButton/page";
import {
  getSelectedDoctorAppointment,
  getSelectedSchedule,
  insertSelectedDoctorAppointment,
  insertSelectedSchedule,
} from "@/redux/slices/layout";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "@/public/defaultAvatar.jpg";
import DisabledTextField from "@/components/input/DisabledTextField/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import dayjs from "dayjs";
import { insertSelectedAppointment } from "@/redux/slices/appointment";

const EditAppointment = ({ id }: { id: string }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const doctor = useSelector(getSelectedDoctorAppointment);
  const selectedSchedule = useSelector(getSelectedSchedule);

  return (
    <section className="flex flex-col overflow-y-scroll ">
      <Box sx={{ mb: 50 }}>
        <BackButton
          handleClick={() => {
            dispatch(insertSelectedDoctorAppointment(null));
            dispatch(insertSelectedSchedule({ start: "", end: "" }));
            router.push("/backoffice/appointments");
          }}
        />
        <Box className="flex flex-col w-full md:flex-col  lg:ml-8 lg:flex-row md:items-center md:justify-center lg:justify-start lg:items-start">
          <Box className="relative ">
            <Image
              src={doctor?.avatarUrl || defaultImage}
              alt=""
              width={640}
              height={320}
              className="w-[200px] h-[200px] rounded-md"
            />
          </Box>
          <div className="flex flex-col md:flex-row ">
            <div className="flex flex-col space-y-8 lg:ml-8 mt-10 mx-2">
              <DisabledTextField
                value={"" + doctor?.name}
                label="Doctor name"
              />
              <DisabledTextField
                value={"" + doctor?.speciality.name}
                label="Speciality"
              />
            </div>
            <div className=" lg:ml-8  flex flex-col mx-2 mt-8 md:mt-0">
              <LabelTypography title="Schedule" />
              <div className="flex items-center mb-8 mt-3 space-x-4">
                <LabelTypography title="From" />
                <DisabledTextField value={selectedSchedule?.start} label="" />
              </div>
              <div className="flex items-center space-x-9">
                <LabelTypography title="To" />
                <DisabledTextField value={selectedSchedule?.end} label="" />
              </div>
            </div>
          </div>
        </Box>
        <TableContainer
          className=" border-[0.5px] rounded w-full lg:w-[90%] mx-auto mt-4"
          sx={{ ml: 2 }}
        >
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography
                    variant="body1"
                    className=" font-semibold text-whiteText dark:text-darkText"
                  >
                    Patient Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    className=" font-semibold ml-4 text-whiteText dark:text-darkText"
                  >
                    Date
                  </Typography>
                </TableCell>
                <TableCell>
                  {" "}
                  <Typography
                    variant="body1"
                    className=" font-semibold text-whiteText ml-8 dark:text-darkText"
                  >
                    Time
                  </Typography>
                </TableCell>

                <TableCell>
                  {" "}
                  <Typography
                    variant="body1"
                    className=" font-semibold text-whiteText dark:text-darkText"
                  >
                    Necessity
                  </Typography>
                </TableCell>
                <TableCell>
                  {" "}
                  <Typography
                    align="center"
                    variant="body1"
                    className=" font-semibold text-whiteText dark:text-darkText"
                  >
                    Status
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctor?.appointments.length ? (
                [...doctor.appointments]
                  ?.sort((appointmentA, appointmentB) => {
                    if (
                      dayjs(appointmentA.appointmentStartTime).isBefore(
                        dayjs(appointmentB.appointmentStartTime)
                      )
                    ) {
                      return -1;
                    } else {
                      return 1;
                    }
                  })
                  ?.map((appointment, index) => {
                    return (
                      <>
                        <TableRow
                          sx={{
                            "& > *": { borderBottom: "unset" },
                          }}
                          className={`${
                            index % 2 == 0
                              ? "bg-[#DEEFFF] dark:bg-[#292929]"
                              : "dark:bg-transparent bg-[#FFFFFF]"
                          } `}
                        >
                          <TableCell>
                            <Typography
                              variant="subtitle2"
                              className="font-semibold  dark:text-darkText"
                            >
                              {appointment.patient.name}
                            </Typography>
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Typography
                              variant="subtitle2"
                              className="font-medium w-[100px] text-whiteText dark:text-darkText"
                            >
                              {" "}
                              {dayjs(appointment.appointmentStartTime).format(
                                "DD MMM YYYY"
                              )}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="subtitle2"
                              className="font-medium w-[160px] text-whiteText dark:text-darkText"
                            >
                              {" "}
                              {dayjs(appointment.appointmentStartTime).format(
                                "hh:mm A"
                              )}
                              {" to "}
                              {dayjs(appointment.appointmentEndTime).format(
                                "hh:mm A"
                              )}
                            </Typography>
                          </TableCell>

                          <TableCell className=" text-whiteText dark:text-darkText">
                            <Typography
                              variant="subtitle2"
                              className="font-medium  text-whiteText dark:text-darkText"
                            >
                              {appointment.necessity}
                            </Typography>
                          </TableCell>
                          <TableCell className="w-[130px] text-whiteText dark:text-darkText">
                            <Typography
                              variant="body2"
                              className={`font-medium border-[1px] cursor-pointer ${
                                appointment.status === "Pending"
                                  ? "border-yellow-600 text-yellow-600"
                                  : appointment.status === "In Progress"
                                  ? "border-blue-600 text-blue-600"
                                  : appointment.status === "Success"
                                  ? "border-green-600 text-green-600"
                                  : ""
                              } p-1 text-center rounded-lg`}
                            >
                              {appointment.status}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })
              ) : (
                <TableRow
                  sx={{ "& > *": { borderBottom: "unset" } }}
                  className={`${"bg-[#DEEFFF] dark:bg-[#292929]"}`}
                >
                  <TableCell
                    colSpan={8}
                    align="center"
                    className="text-whiteText dark:text-darkText"
                  >
                    No Appointment Yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      ;
    </section>
  );
};

export default EditAppointment;
