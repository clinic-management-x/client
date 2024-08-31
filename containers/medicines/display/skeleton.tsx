import React from "react";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const SkeletonFrame = () => {
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
                Images
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Brand Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Generic Name
              </Typography>
            </TableCell>

            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Stock Quantity
              </Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Minimum Alert Quantity
              </Typography>
            </TableCell>
            <TableCell>
              {" "}
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Sell Prices
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
                    <Skeleton width={50} height={50} className=" rounded" />
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
