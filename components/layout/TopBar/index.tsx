"use client";
import React from "react";
import Image from "next/image";
import ThemeSwitcherButton from "@/components/buttons/ThemeSwitcherButton";
import { IconButton } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { getOpenDrawer, insertOpenDrawer } from "@/redux/slices/layout";

const logo = require("../../../public/logo.jpeg");

const TopBar = () => {
  const dispatch = useDispatch();
  const openDrawer = useSelector(getOpenDrawer);
  return (
    <div className="absolute top-0 border-gray-300 dark:border-black bg-white dark:bg-black border-b-2 grid-rows-3 flex justify-between items-center  w-full h-[70px]">
      <Image src={logo} alt="" width={150} height={70} />
      <ThemeSwitcherButton />
      <IconButton
        className="text-primaryBlue-300 mr-2"
        onClick={() => {
          dispatch(insertOpenDrawer(!openDrawer));
        }}
      >
        <GiHamburgerMenu size={32} />
      </IconButton>
    </div>
  );
};

export default TopBar;
