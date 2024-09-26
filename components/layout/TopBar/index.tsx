"use client";
import React from "react";
import Image from "next/image";
import ThemeSwitcherButton from "@/components/buttons/ThemeSwitcherButton";
import { IconButton } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { getOpenDrawer, insertOpenDrawer } from "@/redux/slices/layout";
import { useTheme } from "next-themes";
import NotificationButton from "@/components/buttons/NotificationButton/page";

const logo = require("../../../public/logo1.jpeg");
const darkLogo = require("../../../public/logo2.jpeg");
const TopBar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const openDrawer = useSelector(getOpenDrawer);
  return (
    <div className="fixed z-[999] top-0 border-gray-300 dark:border-black bg-white dark:bg-black border-b-2 grid-rows-3 flex justify-between items-center  w-full h-[70px]">
      <Image
        src={theme.theme === "dark" ? darkLogo : logo}
        alt=""
        width={150}
        height={70}
      />

      <div className=" flex items-center space-x-2">
        <NotificationButton />
        <ThemeSwitcherButton />

        <IconButton
          className="text-primaryBlue-300 mr-2 "
          onClick={() => {
            dispatch(insertOpenDrawer(!openDrawer));
          }}
        >
          <GiHamburgerMenu size={32} />
        </IconButton>
      </div>
    </div>
  );
};

export default TopBar;
