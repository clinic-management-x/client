"use client";
import CreateButton from "@/components/buttons/CreateButton/page";
import SearchBar from "@/components/input/SearchBar/page";
import BasicSelector from "@/components/selectors/BasicSelector/page";
import {
  getShowMobileSearchBar,
  insertShowMobileSearchBar,
} from "@/redux/slices/layout";
import { Divider, IconButton, Skeleton, Typography } from "@mui/material";
import React, { useState } from "react";
import { IconBase } from "react-icons";
import { FaTrashAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

const dummyDoctors = [
  {
    id: 1,
    name: "Kevin",
    image: "",
    speciality: "Cardiologist",
    phone: "+959959065619",
  },
  {
    id: 2,
    name: "William",
    image: "",
    speciality: "GP",
    phone: "+959959065619",
  },
  {
    id: 3,
    name: "Lucy",
    image: "",
    speciality: "Psychologist",
    phone: "+959959065619",
  },
  {
    id: 4,
    name: "Emily",
    image: "",
    speciality: "Surgeon",
    phone: "+959959065619",
  },
  {
    id: 5,
    name: "FUFU",
    image: "",
    speciality: "Physician",
    phone: "+959959065619",
  },
  {
    id: 6,
    name: "Yang",
    image: "",
    speciality: "OG",
    phone: "+959959065619",
  },
  {
    id: 7,
    name: "Yang",
    image: "",
    speciality: "OG",
    phone: "+959959065619",
  },
  {
    id: 8,
    name: "Yang",
    image: "",
    speciality: "OG",
    phone: "+959959065619",
  },
  {
    id: 9,
    name: "Yang",
    image: "",
    speciality: "OG",
    phone: "+959959065619",
  },
  {
    id: 10,
    name: "Yang",
    image: "",
    speciality: "OG",
    phone: "+959959065619",
  },
];

const DisplayDoctors = () => {
  const [selectedValue, setSelectedValue] = useState("Hi");
  const dispatch = useDispatch();
  const showMobileSearchBar = useSelector(getShowMobileSearchBar);

  return (
    <section className="flex flex-col overflow-y-scroll">
      <div
        className={` ${
          showMobileSearchBar ? "hidden" : ""
        }  h-[70px] md:h-[80px] mt-16 md:mt-0 w-full flex items-center justify-between md:justify-start `}
      >
        <div className={`w-[40%] pl-4`}>
          <CreateButton />
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
            <SearchBar />
          </div>

          <BasicSelector
            selectedValue={selectedValue}
            handleChange={() => {}}
            title="Speciality"
            dataArr={[]}
          />
        </div>
      </div>
      <div
        className={`w-full mt-16 md:hidden md:mt-0 h-[70px] text-black ${
          showMobileSearchBar ? "flex items-center justify-center" : "hidden"
        }`}
      >
        <SearchBar />
        <IconButton
          onClick={() => {
            dispatch(insertShowMobileSearchBar(false));
          }}
        >
          <RxCross1 className="text-primaryBlue-300" />
        </IconButton>
      </div>
      <div className="w-full h-full mt-4 mb-20  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 overflow-scroll">
        {dummyDoctors.map((doctor, index) => {
          return false ? (
            <div className=" w-full h-auto bg-gray-100 relative   rounded-lg flex flex-col">
              <div className="h-[130px] w-full">
                <Skeleton
                  variant="circular"
                  width={100}
                  height={100}
                  className="m-auto mt-2"
                />
              </div>
              <Divider />
              <div className="flex flex-col mx-2 text-gray-600 space-y-3 my-3">
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </div>
            </div>
          ) : (
            <div
              className=" w-full h-auto bg-gray-100 relative  rounded-lg flex flex-col"
              key={doctor.id}
            >
              <div className="h-[130px] w-full">
                <div className="w-[100px] h-[100px] m-auto mt-2 rounded-full border-2 border-gray-400"></div>
                <IconButton className="absolute bottom-0 right-0">
                  <FaTrashAlt className="text-error" size={18} />
                </IconButton>
              </div>
              <Divider />
              <div className="flex flex-col ml-2 md:ml-6 text-gray-600 space-y-3 my-3">
                <Typography>{doctor.name}</Typography>
                <Typography>{doctor.speciality}</Typography>

                <Typography>{doctor.phone}</Typography>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default DisplayDoctors;
