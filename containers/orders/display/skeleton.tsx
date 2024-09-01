import {
  Skeleton,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const SkeletonFrame = () => {
  return (
    <TableContainer className=" border-[0.5px] rounded" sx={{ ml: 2 }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />{" "}
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Batch Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Supplier Company
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Estimate Date of Arrival
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Payment Method
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Order Status
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Has Arrived?
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        {[1, 2, 3]?.map((doctor, index) => {
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
                    <Skeleton width={100} height={50} className=" rounded" />
                  </div>
                </TableCell>
                <TableCell className=" text-whiteText dark:text-darkText">
                  <Skeleton width={100} height={50} className=" rounded" />
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  className=" text-whiteText dark:text-darkText"
                >
                  <Skeleton width={100} height={50} className=" rounded" />
                </TableCell>
                <TableCell
                  className=" text-whiteText dark:text-darkText"
                  sx={{ ml: 4 }}
                >
                  <Skeleton width={100} height={50} className=" rounded" />
                </TableCell>
                <TableCell className=" text-whiteText dark:text-darkText">
                  <Skeleton width={100} height={50} className=" rounded" />
                </TableCell>
                <TableCell className=" text-whiteText dark:text-darkText">
                  <div className="flex flex-col">
                    <Skeleton width={100} height={50} className=" rounded" />
                  </div>
                </TableCell>
              </TableRow>
            </>
          );
        })}
      </Table>
    </TableContainer>
  );
};

export default SkeletonFrame;
