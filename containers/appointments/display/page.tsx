"use client";
import CreateButton from "@/components/buttons/CreateButton/page";
import SearchBar from "@/components/input/SearchBar/page";
import {
  getAppointmentView,
  getShowMobileSearchBar,
  insertAppointmentView,
  insertShowMobileSearchBar,
} from "@/redux/slices/layout";
import { getPageNumber, insertPageNumber } from "@/redux/slices/workers";
import { Box, IconButton, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { PiSquaresFour } from "react-icons/pi";
import { IoListSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import AppointmentTable from "./appointmentTable";
import CalendarTable from "./calenderTable";
import useSWR from "swr";
import config from "@/utils/config";
import { appointmentEndPoint } from "@/utils/endpoints";
import {
  deleteAppointment,
  getAppointments,
} from "@/datafetch/appointments/appointment.api";
import SkeletonFrame from "./skeleton";
import { useTheme } from "next-themes";
import DeleteDialog from "@/components/dialogs/delete";
import toast from "react-hot-toast";
import AppointmentDialog from "@/components/dialogs/appointments/AppointmentDialog/page";
import { defaultAppointmentData } from "@/utils/staticData";

const DisplayAppointments = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const page = useSelector(getPageNumber);
  const showMobileSearchBar = useSelector(getShowMobileSearchBar);
  const view = useSelector(getAppointmentView);
  const [typeSearch, setTypeSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [idToEdit, setIdToEdit] = useState("");
  const [skip, setSkip] = useState((page - 1) * 8);
  const [search, setSearch] = useState("");
  const [appointments, setAppointments] = useState<AppointmentType[]>([]);
  const [idToDelete, setIdToDelete] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [appointment, setAppointment] = useState<CrudAppointmentType>(
    defaultAppointmentData
  );

  const hanldeSearchChange = (e: any) => {
    setTypeSearch(e.target.value);
    e.target.value === "" ? setSearch("") : "";
  };

  const { data, isLoading, mutate } = useSWR(
    `${
      config.apiBaseUrl
    }/${appointmentEndPoint}?limit=${8}&skip=${skip}&search=${search}`,
    getAppointments
  );

  useEffect(() => {
    if (data) {
      setAppointments(data.data);
    }
  }, [data]);

  console.log("data", appointment);

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
        {isLoading ? (
          <SkeletonFrame />
        ) : view === "row" ? (
          <AppointmentTable
            appointments={appointments}
            setIdToDelete={setIdToDelete}
          />
        ) : (
          <CalendarTable />
        )}
        {view === "row" ? (
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
        ) : (
          <></>
        )}
      </Box>
      <AppointmentDialog
        open={open || idToEdit !== ""}
        handleClose={() => {
          setIdToEdit("");
          setOpen(false);
        }}
        mutate={mutate}
        appointment={appointment}
        setAppointment={setAppointment}
        edit={idToEdit}
      />
      <DeleteDialog
        open={idToDelete !== ""}
        handleClose={() => {
          setIdToDelete("");
        }}
        text={"this appointment"}
        handleDelete={async () => {
          try {
            setDeleteLoading(true);
            const data = await deleteAppointment(
              `${config.apiBaseUrl}/${appointmentEndPoint}/${idToDelete}`
            );
            if (data) {
              toast.success("Successfully deleted.");
              setIdToDelete("");
              mutate();
            }
          } catch (error) {
            toast.error("Something went wrong.");
          }
        }}
        loading={deleteLoading}
      />
    </section>
  );
};

export default DisplayAppointments;
