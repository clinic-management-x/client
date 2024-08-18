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

const SkeletonPage = () => {
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
          {[1, 2, 3]?.map((staff, index) => {
            return (
              <>
                <TableRow
                  className={`${
                    index % 2 == 0
                      ? "bg-[#DEEFFF] dark:bg-[#292929]"
                      : "dark:bg-transparent bg-[#FFFFFF]"
                  } max-h-[20px] `}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Skeleton width={50} height={50} className=" rounded" />
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className=" text-whiteText dark:text-darkText"
                  ></TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    <Skeleton width={100} height={50} className=" rounded" />
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    <Skeleton width={100} height={50} className=" rounded" />
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    <Skeleton width={100} height={50} className=" rounded" />
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    <Skeleton width={100} height={50} className=" rounded" />
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    <Skeleton width={100} height={50} className=" rounded" />
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

export default SkeletonPage;
