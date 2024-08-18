"use client";
import CreateButton from "@/components/buttons/CreateButton/page";
import CreateDoctorDialog from "@/components/dialogs/doctors/CreateDoctorDialog/page";
import SearchBar from "@/components/input/SearchBar/page";
import BasicSelector from "@/components/selectors/BasicSelector/page";
import { getDoctors, getSpecialities } from "@/datafetch/doctors/doctors.api";
import { getPageNumber, insertPageNumber } from "@/redux/slices/workers";
import {
  getShowMobileSearchBar,
  insertShowMobileSearchBar,
} from "@/redux/slices/layout";
import config from "@/utils/config";
import { doctorEndPoint } from "@/utils/endpoints";
import { Box, IconButton, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import SkeletonFrame from "./skeleton";
import { useTheme } from "next-themes";
import DoctorsTable from "./doctorsTable";

const DisplayDoctors = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const page = useSelector(getPageNumber);
  const [selectedSpecialityName, setSelectedSpecialityName] = useState("all");
  const showMobileSearchBar = useSelector(getShowMobileSearchBar);
  const [doctors, setDoctors] = useState([]);
  const [typeSearch, setTypeSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [skip, setSkip] = useState((page - 1) * 8);
  const [search, setSearch] = useState("");
  const [specialityId, setSpecialityId] = useState("");

  const searchQuery = specialityId
    ? `${
        config.apiBaseUrl
      }/${doctorEndPoint}?limit=${8}&skip=${skip}&search=${search}&speciality=${specialityId}`
    : `${
        config.apiBaseUrl
      }/${doctorEndPoint}?limit=${8}&skip=${skip}&search=${search}`;

  const { data, isLoading, mutate } = useSWR(searchQuery, getDoctors);

  const { data: specialities } = useSWR(
    `${config.apiBaseUrl}/${doctorEndPoint}/specialities`,
    getSpecialities
  );

  useEffect(() => {
    setDoctors(data);
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

            <BasicSelector
              selectedValue={selectedSpecialityName}
              handleChange={(e, value) => {
                e.target.value === "all"
                  ? setSpecialityId("")
                  : setSpecialityId(e.target.value);
                setSelectedSpecialityName(e.target.value);
              }}
              title="Speciality"
              dataArr={
                specialities
                  ? [{ _id: "all", name: "All" }, ...specialities]
                  : []
              }
            />
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
        <div className="w-full h-full mt-4   px-2 overflow-scroll">
          {isLoading ? <SkeletonFrame /> : <DoctorsTable doctors={doctors} />}
        </div>
        <div className="mt-8 w-full m-auto flex items-center justify-center ">
          <Pagination
            size="large"
            count={Math.ceil(doctors?.length / 8)}
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
        <CreateDoctorDialog
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
          mutate={mutate}
        />
      </Box>
    </section>
  );
};

export default DisplayDoctors;
