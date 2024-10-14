"use client";
import CreateButton from "@/components/buttons/CreateButton/page";
import SearchBar from "@/components/input/SearchBar/page";
import BasicSelector from "@/components/selectors/BasicSelector/page";
import {
  getAppointmentView,
  getShowMobileSearchBar,
  insertAppointmentView,
  insertShowMobileSearchBar,
} from "@/redux/slices/layout";
import { getPageNumber } from "@/redux/slices/workers";
import { Box, IconButton, useTheme } from "@mui/material";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { PiSquaresFour } from "react-icons/pi";
import { IoListSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import AppointmentTable from "./appointmentTable";
import CalendarTable from "./calenderTable";

const DisplayAppointments = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const page = useSelector(getPageNumber);
  const showMobileSearchBar = useSelector(getShowMobileSearchBar);
  const view = useSelector(getAppointmentView);
  const [typeSearch, setTypeSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [skip, setSkip] = useState((page - 1) * 8);
  const [search, setSearch] = useState("");

  const hanldeSearchChange = (e: any) => {
    setTypeSearch(e.target.value);
    e.target.value === "" ? setSearch("") : "";
  };
  console.log("view", view);

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
          <div className="flex items-center border-[2px] h-[38px] border-primaryBlue-300 rounded-md mr-4">
            <IconButton
              onClick={() => {
                dispatch(insertAppointmentView("row"));
              }}
              sx={{ height: 35, borderRadius: 10 }}
              className={`border-[2px] border-gray-400 rounded-sm ${
                view == "row"
                  ? "bg-primaryBlue-300 hover:bg-primaryBlue-300 text-white "
                  : "dark:text-[#6B7280]"
              }`}
            >
              <IoListSharp />
            </IconButton>
            <IconButton
              onClick={() => {
                dispatch(insertAppointmentView("calendar"));
              }}
              sx={{ height: 35, borderRadius: 10 }}
              className={`border-[2px] border-gray-800 rounded-sm ${
                view == "calendar"
                  ? "bg-primaryBlue-300 hover:bg-primaryBlue-300 text-white "
                  : "dark:text-[#6B7280]"
              }`}
            >
              <PiSquaresFour />
            </IconButton>
          </div>
        </div>
        {view === "row" ? <AppointmentTable /> : <CalendarTable />}
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
    </section>
  );
};

export default DisplayAppointments;
