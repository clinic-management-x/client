"use client";
import CreateButton from "@/components/buttons/CreateButton/page";
import SearchBar from "@/components/input/SearchBar/page";
import SkeletonFrame from "@/containers/doctors/display/skeleton";
import { getStaffs } from "@/datafetch/staffs/staffs.api";
import {
  getShowMobileSearchBar,
  insertMutateStaff,
  insertShowMobileSearchBar,
} from "@/redux/slices/layout";
import { getPageNumber, insertPageNumber } from "@/redux/slices/workers";
import config from "@/utils/config";
import { staffEndPoint } from "@/utils/endpoints";
import { Box, IconButton, Pagination } from "@mui/material";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import StaffCard from "./staffcard";
import CreateStaffDialog from "@/components/dialogs/staffs/CreateStaffDialog/page";

const DisplayStaffs = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const page = useSelector(getPageNumber);
  const showMobileSearchBar = useSelector(getShowMobileSearchBar);
  const [skip, setSkip] = useState((page - 1) * 8);
  const [staffs, setStaffs] = useState<StaffType[]>([]);
  const [open, setOpen] = useState(false);
  const [typeSearch, setTypeSearch] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading, mutate } = useSWR(
    `${
      config.apiBaseUrl
    }/${staffEndPoint}?limit=${8}&skip=${skip}&search=${search}`,
    getStaffs
  );

  useEffect(() => {
    if (data) {
      setStaffs(data);
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
        <div className="w-full h-full mt-4  grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 overflow-scroll">
          {isLoading ? (
            <SkeletonFrame />
          ) : (
            staffs?.map((staff: StaffType, index: number) => {
              return (
                <Link
                  key={index}
                  href={`/backoffice/staffs/${staff._id}`}
                  onClick={() => {
                    dispatch(insertMutateStaff(mutate));
                  }}
                >
                  <StaffCard staff={staff} key={index} />
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
            onChange={(e, pagenumber) => {
              dispatch(insertPageNumber(pagenumber));
              setSkip((pagenumber - 1) * 8);
            }}
          />
        </div>
        <CreateStaffDialog
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

export default DisplayStaffs;
