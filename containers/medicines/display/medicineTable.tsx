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
import { insertCurrentMedicineId } from "@/redux/slices/inventory";
interface Props {
  medicines: MedicineTypeStandard[];
}

const MedicineTable = ({ medicines }: Props) => {
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
            <TableCell sx={{ width: 200 }}>
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
        {medicines?.map((medicine, index) => {
          return (
            <>
              <TableRow
                key={index}
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
                      open.id === medicine._id
                        ? setOpen({
                            id: medicine._id || "",
                            open: !open.open,
                          })
                        : setOpen({ id: medicine._id || "", open: true })
                    }
                    className={` text-whiteText dark:text-darkText`}
                  >
                    {open.open && open.id === medicine._id ? (
                      <MdKeyboardArrowUp />
                    ) : (
                      <MdKeyboardArrowDown />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell className=" text-whiteText dark:text-darkText">
                  <div className="flex space-x-1">
                    {medicine.imageUrls.map((imageurl) => (
                      <Image
                        key={imageurl}
                        src={imageurl}
                        alt=""
                        width={200}
                        height={200}
                        className="w-[50px] h-[50px] rounded"
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell className=" text-whiteText dark:text-darkText">
                  <Link
                    onClick={() => {
                      dispatch(
                        insertCurrentMedicineId(medicine?._id as string)
                      );
                    }}
                    href={`/backoffice/inventory/medicines/${medicine._id}`}
                    className=" underline underline-offset-1"
                  >
                    {medicine.brandName}
                  </Link>
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  className=" text-whiteText dark:text-darkText"
                >
                  {medicine.genericDrug.genericName}
                </TableCell>
                <TableCell
                  className=" text-whiteText dark:text-darkText"
                  sx={{ ml: 4 }}
                >
                  {medicine.stockQuantity} {medicine.stockQuantityUnit}
                </TableCell>
                <TableCell
                  className=" text-whiteText dark:text-darkText"
                  align="center"
                >
                  {medicine.minimumAlertQuantity}{" "}
                  {medicine.minimumAlertQuantityUnit}
                </TableCell>
                <TableCell className=" text-whiteText dark:text-darkText">
                  <div className="flex flex-col">
                    {medicine.sellPrices.map((sellprice) => (
                      <p>
                        {sellprice.price} {" per "} {sellprice.unit}
                      </p>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={9}
                >
                  <Collapse
                    in={open.id == medicine._id && open.open}
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
                        Active Ingredients
                      </Typography>
                    </Box>
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
                              Dose
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
                        {medicine?.activeIngredients?.length ? (
                          medicine.activeIngredients.map(
                            (ingredient, index) => {
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
                                    {
                                      ingredient.activeIngredient
                                        .activeIngredientName
                                    }
                                  </TableCell>
                                  <TableCell className=" text-whiteText dark:text-darkText">
                                    {ingredient.strength}
                                  </TableCell>
                                  <TableCell className=" text-whiteText dark:text-darkText">
                                    {ingredient.unit}
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          )
                        ) : (
                          <TableRow
                            sx={{ "& > *": { borderBottom: "unset" } }}
                            className={`${
                              index % 2 == 0
                                ? "bg-[#DEEFFF] dark:bg-[#292929]"
                                : "dark:bg-transparent bg-[#FFFFFF]"
                            }`}
                          >
                            <TableCell
                              align="center"
                              className="text-whiteText dark:text-darkText"
                            >
                              No ingredient
                            </TableCell>
                            <TableCell align="center"></TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
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

export default MedicineTable;
