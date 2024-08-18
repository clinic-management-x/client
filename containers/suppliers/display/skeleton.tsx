import React from "react";
import {
  Box,
  Collapse,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { MdKeyboardArrowDown } from "react-icons/md";

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
            <TableCell>
              {" "}
              <Typography
                variant="body1"
                className=" font-semibold text-whiteText dark:text-darkText"
              >
                Contacts
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[0, 1, 2]?.map((supplier, index) => {
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
                      className=" text-whiteText dark:text-darkText"
                    >
                      <MdKeyboardArrowDown />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Skeleton width={50} height={50} className=" rounded" />
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className=" text-whiteText dark:text-darkText"
                  >
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
                    <div className="flex items-center space-x-1">
                      <Skeleton width={100} height={50} className=" rounded" />
                    </div>
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
