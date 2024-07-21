"use client";
import { useTheme } from "next-themes";
import React from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

const ThemeSwitcherButton = ({ isAuth }: { isAuth?: boolean }) => {
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div
      className={`fixed ${isAuth ? "right-4 top-2" : "right-20 md:right-4"} `}
    >
      {currentTheme === "dark" ? (
        <div
          onClick={() => setTheme("light")}
          className=" w-[40px] h-[40px] cursor-pointer  _scale  p-[5px] top-3  ml-[10px] 490:ml-[15px] border-primaryBlue-300 border-2  rounded-full shadow-lg   "
        >
          <HiOutlineMoon className="   text-primaryBlue-300 text-[26px] hover:scale-105  " />
        </div>
      ) : (
        <div
          onClick={() => setTheme("dark")}
          className=" w-[40px] h-[40px] cursor-pointer  _scale  p-[5px]  border-primaryBlue-300 border-2  ml-[10px] 490:ml-[15px] shadow-lg rounded-full"
        >
          <HiOutlineSun className="text-primaryBlue-300 text-[26px] hover:scale-105" />
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcherButton;
