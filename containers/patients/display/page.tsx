"use client";
import CreateButton from "@/components/buttons/CreateButton/page";
import CreatePatientDialog from "@/components/dialogs/patients/CreatePatientDialog/page";
import SearchBar from "@/components/input/SearchBar/page";
import { getPatients } from "@/datafetch/patients/patients.api";
import {
  getShowMobileSearchBar,
  insertShowMobileSearchBar,
} from "@/redux/slices/layout";
import { getPageNumber, insertPageNumber } from "@/redux/slices/workers";
import config from "@/utils/config";
import { patientsEndPoint } from "@/utils/endpoints";
import { Box, IconButton, Pagination } from "@mui/material";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import PatientTable from "./patientTable";
import SkeletonFrame from "./skeleton";

const DisplayPatients = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const page = useSelector(getPageNumber);
  const showMobileSearchBar = useSelector(getShowMobileSearchBar);
  const [typeSearch, setTypeSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [skip, setSkip] = useState((page - 1) * 8);
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState<PatientType[]>([]);

  const { data, mutate, isLoading } = useSWR(
    `${
      config.apiBaseUrl
    }/${patientsEndPoint}?limit=${8}&skip=${skip}&search=${search}`,
    getPatients
  );

  useEffect(() => {
    if (data) {
      setPatients(data.data);
    }
  }, [data]);

  const hanldeSearchChange = (e: any) => {
    setTypeSearch(e.target.value);
    e.target.value === "" ? setSearch("") : "";
  };

  return (
    <section className="flex flex-col  overflow-y-scroll">
      <Box sx={{ mb: 40 }}>
        <div
          className={` ${
            showMobileSearchBar ? "hidden" : ""
          }  h-[70px] md:h-[80px] mt-16 mx-2 md:mt-0 w-full flex items-center justify-between md:justify-start `}
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
        {isLoading ? <SkeletonFrame /> : <PatientTable patients={patients} />}
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
      <CreatePatientDialog
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
        mutate={mutate}
      />
    </section>
  );
};

export default DisplayPatients;
