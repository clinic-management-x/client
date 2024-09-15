"use client";
import CreateButton from "@/components/buttons/CreateButton/page";
import CreateBarcodeDialog from "@/components/dialogs/barcodes/CreateBarcodeDialog/page";
import SearchBar from "@/components/input/SearchBar/page";
import { getBarcodes } from "@/datafetch/medicines/medicines.api";
import {
  getShowMobileSearchBar,
  insertShowMobileSearchBar,
} from "@/redux/slices/layout";
import { getPageNumber, insertPageNumber } from "@/redux/slices/workers";
import config from "@/utils/config";
import { barcodeEndPoint, medicineEndPoint } from "@/utils/endpoints";
import { Box, IconButton, Pagination } from "@mui/material";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import SkeletonFrame from "./skeletonFrame";
import BarcodeTable from "./barcodeTable";

const BarcodesDisplay = () => {
  const page = useSelector(getPageNumber);
  const theme = useTheme();
  const dispatch = useDispatch();
  const showMobileSearchBar = useSelector(getShowMobileSearchBar);

  const [open, setOpen] = useState(false);
  const [skip, setSkip] = useState((page - 1) * 8);
  const [search, setSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");
  const [barcodes, setBarcodes] = useState<BarcodeDisplay[]>([]);

  const { data, mutate, isLoading } = useSWR(
    `${
      config.apiBaseUrl
    }/${medicineEndPoint}/${barcodeEndPoint}?limit=${8}&skip=${skip}&search=${search}`,
    getBarcodes
  );

  useEffect(() => {
    if (data) {
      setBarcodes(data.data);
    }
  }, [data]);

  const hanldeSearchChange = (e: any) => {
    setTypeSearch(e.target.value);
    e.target.value === "" ? setSearch("") : "";
  };
  return (
    <section className="flex flex-col overflow-y-scroll">
      <Box sx={{ mb: 40 }}>
        <div
          className={` ${
            showMobileSearchBar ? "hidden" : ""
          }  h-[70px] md:h-[80px] mt-16 md:mt-0 w-full flex items-center justify-between md:justify-start `}
        >
          <div className={`w-[40%] pl-4`}>
            <CreateButton
              disabled={false}
              handleClick={() => {
                setOpen(true);
              }}
              showIcon={true}
            />
          </div>
          <div className="w-[60%] flex items-center justify-end mr-4  ">
            <IconButton
              className="md:hidden mr-2"
              onClick={() => {
                dispatch(insertShowMobileSearchBar(true));
              }}
            >
              <FiSearch size={28} className="text-primaryBlue-300" />
            </IconButton>

            <div className="hidden md:block ">
              <SearchBar
                selectedValue={typeSearch}
                handleClick={(value) => {
                  setSearch(value);
                }}
                handleChange={hanldeSearchChange}
              />
            </div>
          </div>
        </div>
        <div
          className={`w-full mt-16 md:hidden md:mt-0 h-[70px] text-black ${
            showMobileSearchBar ? "flex items-center justify-center" : "hidden"
          }`}
        >
          <SearchBar
            selectedValue={typeSearch}
            handleClick={(value) => {
              setSearch(value);
            }}
            handleChange={hanldeSearchChange}
          />
          <IconButton
            onClick={() => {
              setSearch("");
              setTypeSearch("");
              dispatch(insertShowMobileSearchBar(false));
            }}
          >
            <RxCross1 className="text-primaryBlue-300" />
          </IconButton>
        </div>
        {isLoading ? <SkeletonFrame /> : <BarcodeTable barcodes={barcodes} />}
        <div className="mt-8 w-full m-auto flex items-center justify-center ">
          <Pagination
            size="large"
            count={Math.ceil(data?.count / 8)}
            defaultPage={page}
            color="primary"
            sx={{
              mx: 4,
              color: "gray",
              ul: {
                "& .MuiPaginationItem-root": {
                  color: theme.theme === "dark" ? "#fff" : "dark",
                },
              },
            }}
            className="space-x-2 dark:text-darkText"
            onChange={(e, pagenumber) => {
              dispatch(insertPageNumber(pagenumber));
              setSkip((pagenumber - 1) * 8);
            }}
          />
        </div>
      </Box>
      <CreateBarcodeDialog
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        mutate={mutate}
      />
    </section>
  );
};

export default BarcodesDisplay;
