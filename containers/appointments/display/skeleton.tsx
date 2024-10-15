import {
  Checkbox,
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
        {[1, 2, 3]?.map((patient, index) => {
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
                <TableCell className=" text-whiteText dark:text-darkText">
                  <div className="flex space-x-1">
                    <Skeleton width={25} height={50} className=" rounded" />
                  </div>
                </TableCell>
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
