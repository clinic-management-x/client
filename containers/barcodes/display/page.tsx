"use client";
import CreateButton from "@/components/buttons/CreateButton/page";
import CreateBarcodeDialog from "@/components/dialogs/barcodes/CreateBarcodeDialog/page";
import SearchBar from "@/components/input/SearchBar/page";
import {
  getShowMobileSearchBar,
  insertShowMobileSearchBar,
} from "@/redux/slices/layout";
import { getPageNumber } from "@/redux/slices/workers";
import { Box, IconButton } from "@mui/material";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

const BarcodesDisplay = () => {
  const page = useSelector(getPageNumber);
  const theme = useTheme();
  const dispatch = useDispatch();
  const showMobileSearchBar = useSelector(getShowMobileSearchBar);

  const [open, setOpen] = useState(false);
  const [skip, setSkip] = useState((page - 1) * 8);
  const [search, setSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");

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
      </Box>
      <CreateBarcodeDialog
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
    </section>
  );
};

export default BarcodesDisplay;
