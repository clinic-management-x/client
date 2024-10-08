"use client";
import CreateButton from "@/components/buttons/CreateButton/page";
import CreatePatientDialog from "@/components/dialogs/patients/CreatePatientDialog/page";
import SearchBar from "@/components/input/SearchBar/page";
import {
  getShowMobileSearchBar,
  insertShowMobileSearchBar,
} from "@/redux/slices/layout";
import { getPageNumber } from "@/redux/slices/workers";
import { Box, IconButton, useTheme } from "@mui/material";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const DisplayPatients = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const page = useSelector(getPageNumber);
  const showMobileSearchBar = useSelector(getShowMobileSearchBar);
  const [typeSearch, setTypeSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [skip, setSkip] = useState((page - 1) * 8);
  const [search, setSearch] = useState("");

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
      </Box>
      <CreatePatientDialog
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        mutate={() => {}}
      />
    </section>
  );
};

export default DisplayPatients;
