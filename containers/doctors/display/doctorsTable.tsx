import React, { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { days } from "@/utils/staticData";
import { calculateTime } from "@/utils/calculations";

const defaultAvatar = require("../../../public/defaultAvatar.jpg");

interface Props {
  doctors: DoctorType[];
}

const DoctorsTable = ({ doctors }: Props) => {
  const [open, setOpen] = useState<{ id: string; open: boolean }>({
    id: "",
    open: false,
  });

  return (
    <TableContainer className=" border-[0.5px] rounded" sx={{ ml: 2 }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                {" "}
                Image
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Date of Birth
              </Typography>
            </TableCell>
            <TableCell>
              {" "}
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Gender
              </Typography>
            </TableCell>
            <TableCell>
              {" "}
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Mobile Number
              </Typography>
            </TableCell>
            <TableCell>
              {" "}
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Email
              </Typography>
            </TableCell>
            <TableCell>
              {" "}
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Speciality
              </Typography>
            </TableCell>
            <TableCell>
              {" "}
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Service Fees
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {doctors?.map((doctor, index) => {
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
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() =>
                        open.id === doctor._id
                          ? setOpen({
                              id: doctor._id || "",
                              open: !open.open,
                            })
                          : setOpen({ id: doctor._id || "", open: true })
                      }
                      className={` text-whiteText dark:text-darkText`}
                    >
                      {open.open && open.id === doctor._id ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Image
                      src={doctor.avatarUrl || defaultAvatar}
                      alt=""
                      width={200}
                      height={200}
                      className="w-[50px] h-[50px] rounded"
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className=" text-whiteText dark:text-darkText"
                  >
                    <Link
                      href={`/backoffice/doctors/${doctor._id}`}
                      className=" underline underline-offset-1"
                    >
                      {doctor.name}
                    </Link>
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    {dayjs(doctor.dateOfBirth).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    {doctor.gender}
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    {doctor.mobile}
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    {doctor.email}
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    {doctor.speciality.name}
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    {doctor.doctorFee}
                  </TableCell>
                </TableRow>
                <TableRow

                //className={`${doctor.schedules?.length ? "" : "hidden"}`}
                >
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={9}
                  >
                    <Collapse
                      in={open.id == doctor._id && open.open}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ margin: 1 }}>
                        <Typography
                          variant="subtitle2"
                          gutterBottom
                          component="div"
                          className="font-semibold text-whiteText dark:text-darkText"
                        >
                          Schedules
                        </Typography>
                      </Box>
                      <Table
                        size="small"
                        aria-label="purchases"
                        className="border-[1px] border-gray-300 w-[300px] ma  mb-2"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              {" "}
                              <Typography
                                variant="subtitle2"
                                className=" font-semibold text-whiteText dark:text-darkText"
                              >
                                Start
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {" "}
                              <Typography
                                variant="subtitle2"
                                className=" font-semibold text-whiteText dark:text-darkText"
                              >
                                End
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {doctor?.schedules?.length ? (
                            doctor?.schedules?.map((schedule, index) => {
                              return (
                                <TableRow
                                  sx={{ "& > *": { borderBottom: "unset" } }}
                                  className={`${
                                    index % 2 == 0
                                      ? "bg-[#DEEFFF] dark:bg-[#292929]"
                                      : "dark:bg-transparent bg-[#FFFFFF]"
                                  }`}
                                >
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    className=" text-whiteText dark:text-darkText"
                                  >
                                    {
                                      days.find(
                                        (day) =>
                                          day._id ===
                                          Math.ceil(schedule.start / 1440 - 1)
                                      )?.name
                                    }
                                    , {calculateTime(schedule.start)}
                                  </TableCell>
                                  <TableCell className=" text-whiteText dark:text-darkText">
                                    {
                                      days.find(
                                        (day) =>
                                          day._id ===
                                          Math.ceil(schedule.end / 1440 - 1)
                                      )?.name
                                    }
                                    , {calculateTime(schedule.end)}
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          ) : (
                            <TableRow
                              sx={{ "& > *": { borderBottom: "unset" } }}
                              className={`${
                                index % 2 == 0
                                  ? "bg-[#DEEFFF] dark:bg-[#292929]"
                                  : "dark:bg-transparent bg-[#FFFFFF]"
                              }`}
                            >
                              <TableCell
                                align="center"
                                className="text-whiteText dark:text-darkText"
                              >
                                No Schedule
                              </TableCell>
                              <TableCell align="center"></TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DoctorsTable;
