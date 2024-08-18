import {
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
import React, { useState } from "react";
const defaultAvatar = require("../../../public/defaultAvatar.jpg");

interface Props {
  staffs: StaffType[];
}

const StaffsTable = ({ staffs }: Props) => {
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
                Address
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {staffs?.map((staff, index) => {
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
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Image
                      src={staff.avatarUrl || defaultAvatar}
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
                      href={`/backoffice/staffs/${staff._id}`}
                      className=" underline underline-offset-1"
                    >
                      {staff.name}
                    </Link>
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    {dayjs(staff.dateOfBirth).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    {staff.gender}
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    {staff.mobile}
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    {staff.email}
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    {staff.address}
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

export default StaffsTable;
