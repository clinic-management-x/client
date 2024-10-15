import {
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { IoCopyOutline } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

interface Props {
  appointments: AppointmentType[];
  setIdToDelete: (data: string) => void;
}
const AppointmentTable = ({ appointments, setIdToDelete }: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  const [copyId, setCopyId] = useState("");

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setCopyId("");
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };
  return (
    <TableContainer className=" border-[0.5px] rounded" sx={{ ml: 2 }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                color="primary"
                className="dark:text-white"
                checked={false}
                onChange={() => {}}
              />
            </TableCell>
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
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Date
              </Typography>
            </TableCell>
            <TableCell>
              {" "}
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
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
                Doctor
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
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Status
              </Typography>
            </TableCell>
            <TableCell>
              {" "}
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.length ? (
            appointments?.map((appointment, index) => {
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
                      <Checkbox
                        color="primary"
                        className="dark:text-white"
                        checked={false}
                        onChange={() => {}}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-start justify-start">
                        <Typography
                          variant="body1"
                          className="font-medium dark:text-darkText"
                        >
                          {appointment.patient.name}
                        </Typography>
                        <div className="flex items-center  space-x-2">
                          <span className="dark:text-darkText">
                            {appointment.patient.patientId}
                          </span>
                          <div className="relative">
                            <div
                              className={`${
                                isCopied &&
                                copyId === appointment.patient.patientId
                                  ? "absolute"
                                  : "hidden"
                              }  p-1 -right-4 -top-8 rounded text-center text-white bg-success`}
                            >
                              Copied!
                            </div>
                            <Tooltip
                              title={isCopied ? "" : "Copy to clipboard"}
                              placement="top"
                              arrow
                            >
                              <button
                                onClick={() => {
                                  setCopyId("" + appointment.patient.patientId);
                                  handleCopy(
                                    "" + appointment.patient.patientId
                                  );
                                }}
                                style={{}}
                                className="bg-primaryBlue-200 p-1 text-white rounded-md"
                              >
                                <IoCopyOutline />
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography
                        variant="body1"
                        className="font-medium  text-whiteText dark:text-darkText"
                      >
                        {" "}
                        {dayjs(appointment.appointmentDate).format(
                          "DD MMM YYYY"
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        className="font-medium  text-whiteText dark:text-darkText"
                      >
                        {" "}
                        {dayjs(appointment.appointmentStartTime).format(
                          "hh:mm A"
                        )}
                        {" >> "}
                        {dayjs(appointment.appointmentEndTime).format(
                          "hh:mm A"
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell className=" ">
                      <div className="flex items-center space-x-2">
                        <Image
                          src={appointment.doctor.avatarUrl}
                          width={640}
                          height={320}
                          alt=""
                          className="w-[40px] h-[40px] rounded-full"
                        />
                        <div>
                          <Typography
                            variant="body1"
                            className="font-medium dark:text-darkText"
                          >
                            {appointment.doctor.name}
                          </Typography>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className=" text-whiteText dark:text-darkText">
                      <Typography
                        variant="body1"
                        className="font-medium  text-whiteText dark:text-darkText"
                      >
                        {appointment.necessity}
                      </Typography>
                    </TableCell>
                    <TableCell className=" text-whiteText dark:text-darkText">
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
                    <TableCell className=" text-whiteText dark:text-darkText">
                      <div className="flex items-center">
                        <IconButton>
                          <FiEdit3 size={18} />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            setIdToDelete(appointment._id as string);
                          }}
                        >
                          <MdDelete size={20} />
                        </IconButton>
                      </div>
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
  );
};

export default AppointmentTable;
