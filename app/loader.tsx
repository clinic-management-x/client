"use client";
import BottomBar from "@/components/layout/BottomBar";
import NavBar from "@/components/layout/NavBar";
import SideBar from "@/components/layout/SideBar";
import TopBar from "@/components/layout/TopBar";
import { CircularProgress } from "@mui/material";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

const Loader = () => {
  const pathname = usePathname();

  return (
    <div className="w-full h-screen overflow-y-scroll bg-white dark:bg-[#212121] ">
      {pathname.includes("backoffice") ? (
        <>
          <div className="w-full  hidden md:flex">
            <SideBar />
            <div className=" w-full h-full flex flex-col">
              <NavBar />
              <div className="mt-[400px]  m-auto flex items-center justify-center">
                {" "}
                <CircularProgress />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col md:hidden">
            <TopBar />
            <div className="mt-[300px] m-auto flex items-center justify-center">
              {" "}
              <CircularProgress />
            </div>

            <BottomBar />
          </div>
        </>
      ) : (
        <div className="mt-[400px]  m-auto flex items-center justify-center">
          {" "}
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Loader;
