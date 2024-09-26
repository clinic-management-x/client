"use client";
import NotificationButton from "@/components/buttons/NotificationButton/page";
import ThemeSwitcherButton from "@/components/buttons/ThemeSwitcherButton";
import React from "react";

const NavBar = () => {
  return (
    <div className="w-full border-b border-gray-300 z-[999] dark:border-black h-[80px] fixed bg-white dark:bg-black">
      <div className="mt-4 flex space-x-4 fixed right-4 ">
        <NotificationButton />
        <ThemeSwitcherButton />
      </div>
    </div>
  );
};

export default NavBar;
