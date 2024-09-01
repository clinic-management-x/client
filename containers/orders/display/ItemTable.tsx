import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

interface Props {
  orderItems: OrderItemType[];
}
const ItemTable = ({ orderItems }: Props) => {
  return (
    <Table
      size="small"
      aria-label="purchases"
      className="border-[1px] border-gray-300 w-[500px] ma  mb-2"
    >
      <TableHead>
        <TableRow>
          <TableCell>
            {" "}
            <Typography
              variant="subtitle2"
              className=" font-semibold text-whiteText dark:text-darkText"
            >
              Name
            </Typography>
          </TableCell>
          <TableCell>
            {" "}
            <Typography
              variant="subtitle2"
              className=" font-semibold text-whiteText dark:text-darkText"
            >
              Quantity
            </Typography>
          </TableCell>
          <TableCell>
            {" "}
            <Typography
              variant="subtitle2"
              className=" font-semibold text-whiteText dark:text-darkText"
            >
              Unit
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orderItems?.length ? (
          orderItems.map((orderitem, index) => {
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
                  {(orderitem.itemName as ItemNameType).brandName}
                </TableCell>
                <TableCell className=" text-whiteText dark:text-darkText">
                  {orderitem.quantity}
                </TableCell>
                <TableCell className=" text-whiteText dark:text-darkText">
                  {orderitem.unit}
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow
            sx={{ "& > *": { borderBottom: "unset" } }}
            className={`${"bg-[#DEEFFF] dark:bg-[#292929]"}`}
          >
            <TableCell
              align="center"
              className="text-whiteText dark:text-darkText"
            >
              No Order Items
            </TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ItemTable;
