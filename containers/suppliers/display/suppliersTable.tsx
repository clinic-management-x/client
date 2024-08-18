"use client";
import { contactDataArr } from "@/components/dialogs/suppliers/ContactCreate/page";
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
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const supplierDefaultImage = require("../../../public/supplier.png");

interface Props {
  suppliers: SupplierType[];
}

const SuppliersTable = ({ suppliers }: Props) => {
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
          {suppliers?.map((supplier, index) => {
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
                        open.id === supplier._id
                          ? setOpen({
                              id: supplier._id || "",
                              open: !open.open,
                            })
                          : setOpen({ id: supplier._id || "", open: true })
                      }
                      className=" text-whiteText dark:text-darkText"
                    >
                      {open.open ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )}
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Image
                      src={supplier.avatarUrl || supplierDefaultImage}
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
                      href={`/backoffice/inventory/suppliers/${supplier._id}`}
                      className=" underline underline-offset-1"
                    >
                      {supplier.name}
                    </Link>
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    {supplier.mobile}
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    {supplier.email}
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    {supplier.address}
                  </TableCell>
                  <TableCell className=" text-whiteText dark:text-darkText">
                    <div className="flex items-center space-x-1">
                      {supplier.contacts?.map((contact) => {
                        const currentContact = contactDataArr.find(
                          (data) => data.name === contact.name
                        );
                        return currentContact?.icon;
                      })}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={7}
                  >
                    <Collapse
                      in={open.id == supplier._id && open.open}
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
                          Medical Representatives
                        </Typography>
                      </Box>
                      <Table
                        size="small"
                        aria-label="purchases"
                        className="border-[1px] border-gray-300 rounded-full mb-2"
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
                                Mobile Number
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {" "}
                              <Typography
                                variant="subtitle2"
                                className=" font-semibold text-whiteText dark:text-darkText"
                              >
                                Email
                              </Typography>
                            </TableCell>
                            <TableCell>
                              {" "}
                              <Typography
                                variant="subtitle2"
                                className=" font-semibold text-whiteText dark:text-darkText"
                              >
                                Contacts
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {supplier?.medRepresentatives?.map((mr, index) => {
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
                                  {mr.name}
                                </TableCell>
                                <TableCell className=" text-whiteText dark:text-darkText">
                                  {mr.mobile}
                                </TableCell>
                                <TableCell className=" text-whiteText dark:text-darkText">
                                  {mr.email}
                                </TableCell>

                                <TableCell>
                                  <div className="flex items-center space-x-1">
                                    {mr.contacts?.map((contact) => {
                                      const currentContact =
                                        contactDataArr.find(
                                          (data) => data.name === contact.name
                                        );
                                      return currentContact?.icon;
                                    })}
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })}
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

export default SuppliersTable;
