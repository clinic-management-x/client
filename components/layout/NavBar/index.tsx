"use client";
import ThemeSwitcherButton from "@/components/buttons/ThemeSwitcherButton";
import React from "react";

const NavBar = () => {
  return (
    <div className="w-full border-b border-gray-300 z-[999] dark:border-black h-[80px] fixed bg-white dark:bg-black">
      <div className="mt-4">
        {" "}
        <ThemeSwitcherButton />
      </div>
    </div>
  );
};

export default NavBar;
