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
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

interface Props {
  barcodes: BarcodeDisplay[];
}

const BarcodeTable = ({ barcodes }: Props) => {
  return (
    <TableContainer className=" border-[0.5px] rounded" sx={{ ml: 2 }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              {" "}
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Image
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Barcode Number
              </Typography>
            </TableCell>
            <TableCell sx={{ width: 200 }}>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                BatchId
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Medicine
              </Typography>
            </TableCell>

            <TableCell>
              {" "}
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Quantity
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Expired Date
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        {barcodes?.map((barcode, index) => {
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
                <TableCell></TableCell>
                <TableCell className=" text-whiteText dark:text-darkText">
                  <div className="flex space-x-1">
                    <Image
                      src={barcode.barCodeUrl}
                      alt=""
                      width={200}
                      height={200}
                      className="w-[160px] h-[50px] dark:bg-gray-400 "
                    />
                  </div>
                </TableCell>
                <TableCell className=" text-whiteText dark:text-darkText">
                  {barcode.barcode}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  className=" text-whiteText dark:text-darkText"
                >
                  {barcode.batchId}
                </TableCell>
                <TableCell
                  className=" text-whiteText dark:text-darkText"
                  sx={{ ml: 4 }}
                >
                  {barcode.medicine.brandName}
                </TableCell>

                <TableCell className=" text-whiteText dark:text-darkText">
                  {barcode.quantity}
                </TableCell>
                <TableCell className=" text-whiteText dark:text-darkText">
                  {dayjs(barcode.expiredDate).format("DD-MM-YYYY")}
                </TableCell>
              </TableRow>
            </>
          );
        })}
      </Table>
    </TableContainer>
  );
};

export default BarcodeTable;
