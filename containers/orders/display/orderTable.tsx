"use state";
import PlainSelector from "@/components/selectors/PlainSelector/page";

import {
  Box,
  Checkbox,
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
import Link from "next/link";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useDispatch } from "react-redux";
import ItemTable from "./ItemTable";

interface Props {
  orders: OrderType[];
}
const orderStatus = [
  { _id: "1", name: "PENDING" },
  { _id: "2", name: "PAID" },
];
const OrdersTable = ({ orders }: Props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<{ id: string; open: boolean }>({
    id: "",
    open: false,
  });

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
        {orders?.map((order, index) => {
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
                      open.id === order._id
                        ? setOpen({
                            id: order._id || "",
                            open: !open.open,
                          })
                        : setOpen({ id: order._id || "", open: true })
                    }
                    className={` text-whiteText dark:text-darkText`}
                  >
                    {open.open && open.id === order._id ? (
                      <MdKeyboardArrowUp />
                    ) : (
                      <MdKeyboardArrowDown />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell className=" text-whiteText dark:text-darkText">
                  <Link
                    href={`/backoffice/inventory/orders/${order._id}`}
                    className=" underline underline-offset-1"
                  >
                    {order.batchId}
                  </Link>
                </TableCell>
                <TableCell className=" text-whiteText dark:text-darkText">
                  {(order.supplier as SupplierCompanyType).name}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  className=" text-whiteText dark:text-darkText"
                >
                  {dayjs(order.estimateDate).format("DD-MM-YYYY")}
                </TableCell>
                <TableCell
                  className=" text-whiteText dark:text-darkText"
                  sx={{ ml: 4 }}
                >
                  {order.paymentMethod}
                </TableCell>
                <TableCell
                  className=" text-whiteText dark:text-darkText"
                  align="center"
                >
                  {order.orderStatus}
                </TableCell>
                <TableCell className=" text-whiteText dark:text-darkText">
                  {order.hasAlreadyArrived ? "YES" : "NO"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={9}
                >
                  <Collapse
                    in={open.id == order._id && open.open}
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
                        Order Items
                      </Typography>
                    </Box>
                    <ItemTable orderItems={order.orderItems} />
                  </Collapse>
                </TableCell>
              </TableRow>
            </>
          );
        })}
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
