"use client";
import CreateButton from "@/components/buttons/CreateButton/page";
import CreateDoctorDialog from "@/components/dialogs/doctors/CreateDoctorDialog/page";
import SearchBar from "@/components/input/SearchBar/page";
import BasicSelector from "@/components/selectors/BasicSelector/page";
import { getDoctors, getSpecialities } from "@/datafetch/doctors/doctors.api";
import {
  getPageNumber,
  insertDoctorsArrMutate,
  insertPageNumber,
} from "@/redux/slices/doctors";
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
import DoctorCard from "./doctorcard";
import Link from "next/link";
import { useTheme } from "next-themes";

const DisplayDoctors = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const page = useSelector(getPageNumber);
  const showMobileSearchBar = useSelector(getShowMobileSearchBar);
  const [doctors, setDoctors] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [typeSearch, setTypeSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [skip, setSkip] = useState((page - 1) * 8);

  const {
    data,
    isLoading,
    isValidating,
    mutate: mutateDoctors,
  } = useSWR(
    `${config.apiBaseUrl}/${doctorEndPoint}?limit=${8}&skip=${skip}`,
    getDoctors
  );

  const { data: specialities } = useSWR(
    `${config.apiBaseUrl}/${doctorEndPoint}/specialities`,
    getSpecialities
  );

  const filterBySpeciality = (value: string) => {
    return value === "All"
      ? data
      : data.filter((doctor: DoctorType) => doctor.speciality._id === value);
  };

  const handleTypeFilter = (e: any) => {
    const doctorsArr = filterBySpeciality(selectedFilter);
    e.target.value !== ""
      ? setDoctors(
          doctorsArr.filter((doctor: DoctorType) =>
            doctor.name.toLowerCase().includes(e.target.value.toLowerCase())
          )
        )
      : setDoctors(doctorsArr);
    setTypeSearch(e.target.value);
  };

  useEffect(() => {
    const doctorsArr = filterBySpeciality(selectedFilter);
    setDoctors(doctorsArr);
  }, [data]);

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
                handleChange={handleTypeFilter}
              />
            </div>

            <BasicSelector
              selectedValue={selectedFilter}
              handleChange={(e, value) => {
                const doctorArr = filterBySpeciality(e.target.value);
                setDoctors(doctorArr);
                setSelectedFilter(e.target.value);
              }}
              title="Speciality"
              dataArr={specialities}
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
            handleChange={handleTypeFilter}
          />
          <IconButton
            onClick={() => {
              dispatch(insertShowMobileSearchBar(false));
            }}
          >
            <RxCross1 className="text-primaryBlue-300" />
          </IconButton>
        </div>
        <div className="w-full h-full mt-4  grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 overflow-scroll">
          {isLoading ? (
            <SkeletonFrame />
          ) : (
            doctors?.map((doctor: DoctorType, index: number) => {
              return (
                <Link
                  key={index}
                  href={`/backoffice/doctors/${doctor._id}`}
                  onClick={() => {
                    dispatch(insertDoctorsArrMutate(mutateDoctors));
                  }}
                >
                  <DoctorCard doctor={doctor} key={index} />
                </Link>
              );
            })
          )}
        </div>
        <div className="mt-8 w-full m-auto flex items-center justify-center ">
          <Pagination
            size="large"
            count={10}
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
            onChange={(e, page) => {
              dispatch(insertPageNumber(page));
              setSkip((page - 1) * 8);
            }}
          />
        </div>
        <CreateDoctorDialog
          open={open}
          handleClose={() => {
            setOpen(false);
          }}
        />
      </Box>
    </section>
  );
};

export default DisplayDoctors;
