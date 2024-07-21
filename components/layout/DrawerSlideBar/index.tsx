"use client";
import baseApi from "@/datafetch/base.api";
import {
  getOpenDrawer,
  getSelectedTab,
  insertOpenDrawer,
  insertSelectedTab,
} from "@/redux/slices/layout";
import config from "@/utils/config";
import { Drawer } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { CiLogout } from "react-icons/ci";
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { HiMiniUsers } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const slidebarData: SidebarType[] = [
  {
    id: 1,
    icon: <FaUserDoctor size={28} />,
    title: "Doctors",
    link: "/backoffice/doctors",
  },
  {
    id: 2,
    icon: <HiMiniUsers size={28} />,
    title: "Staffs",
    link: "/backoffice/staffs",
  },
  {
    id: 3,
    icon: <GiMedicines size={28} />,
    title: "Medicine",
    link: "/backoffice/medicine",
  },
  {
    id: 4,
    icon: <IoSettingsOutline size={24} />,
    title: "Settings",
    link: "/backoffice/settings",
  },
];

const DrawerSlideBar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const openDrawer = useSelector(getOpenDrawer);
  const selectedTab = useSelector(getSelectedTab);

  useEffect(() => {
    dispatch(insertSelectedTab(pathname.split("/")[2]));
  }, [pathname]);

  return (
    <Drawer
      anchor="right"
      open={openDrawer}
      onClose={() => {
        dispatch(insertOpenDrawer(false));
      }}
      sx={{ zIndex: 9999 }}
    >
      <div className="w-[250px]  bg-white dark:bg-[#212121] h-full">
        {slidebarData.map((data) => (
          <div
            key={data.id}
            onClick={() => {
              dispatch(insertOpenDrawer(false));
              dispatch(insertSelectedTab(data.title.toLowerCase()));
            }}
            className={`w-[90%] h-[50px] m-auto rounded-lg pl-6   p-2 ${
              data.id === 1 ? "mt-4" : ""
            } ${
              data.title.toLowerCase() === selectedTab
                ? "bg-primaryBlue-200 dark:bg-transparent text-white border-2 border-white dark:border-primaryBlue-300 dark:text-primaryBlue-300"
                : "text-gray-500 hover:text-primaryBlue-300 hover:text-lg"
            } `}
          >
            <Link href={data.link} className="flex items-center">
              {data.icon} <div className="ml-4">{data.title}</div>
            </Link>
          </div>
        ))}
      </div>
      <div className="  text-center absolute bottom-2 w-full px-16 h-[50px] text-gray-500 ">
        <Link
          href={"/login"}
          className="flex items-center hover:text-primaryBlue-300 hover:text-lg"
          onClick={async () => {
            await baseApi.post(`${config.apiBaseUrl}/auth/logout`);
            localStorage.removeItem("access-x");
            localStorage.removeItem("refresh-x");
          }}
        >
          <CiLogout size={28} />
          <div className="ml-2">Logout</div>
        </Link>
      </div>
    </Drawer>
  );
};

export default DrawerSlideBar;
