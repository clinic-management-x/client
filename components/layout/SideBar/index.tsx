"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectedSubcategoryTab,
  getSelectedTab,
  insertAppointmentView,
  insertSelectedSubcategoryTab,
  insertSelectedTab,
} from "@/redux/slices/layout";
import {
  MdAccountCircle,
  MdAddAlert,
  MdBusiness,
  MdDashboard,
  MdKeyboardArrowDown,
  MdOutlineInventory2,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import {
  FaBarcode,
  FaCartPlus,
  FaPeopleArrows,
  FaUserDoctor,
} from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import { GiMedicines } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { getHasClinic } from "@/redux/slices/user";
import baseApi from "@/datafetch/base.api";
import config from "@/utils/config";
import { useTheme } from "next-themes";
import { insertPageNumber } from "@/redux/slices/workers";
import { Box } from "@mui/material";
const logo = require("../../../public/logo1.jpeg");
const darkLogo = require("../../../public/logo2.jpeg");

const sidebarData = [
  {
    id: 1,
    title: "Dashboard",
    icon: <MdDashboard size={28} />,
    link: "/backoffice/dashboard",
  },
  {
    id: 2,
    icon: <RiCalendarScheduleLine size={28} />,
    title: "Appointments",
    link: "/backoffice/appointments",
  },
  {
    id: 3,
    icon: <FaPeopleArrows size={28} />,
    title: "Patients",
    link: "/backoffice/patients",
  },
  {
    id: 4,
    icon: <FaUserDoctor size={28} />,
    title: "Doctors",
    link: "/backoffice/doctors",
  },
  {
    id: 5,
    icon: <HiMiniUsers size={28} />,
    title: "Staffs",
    link: "/backoffice/staffs",
  },
  {
    id: 6,
    icon: <MdOutlineInventory2 size={28} />,
    title: "Inventory",
    subCategories: [
      {
        id: 60,
        icon: <MdBusiness size={26} />,
        title: "Suppliers",
        link: "/backoffice/inventory/suppliers",
      },
      {
        id: 61,
        icon: <GiMedicines size={26} />,
        title: "Medicines",
        link: "/backoffice/inventory/medicines",
      },
      {
        id: 62,
        icon: <FaCartPlus size={26} />,
        title: "Orders",
        link: "/backoffice/inventory/orders",
      },
      {
        id: 63,
        icon: <FaBarcode size={24} />,
        title: "Barcodes",
        link: "/backoffice/inventory/barcodes",
      },
      {
        id: 64,
        icon: <MdAddAlert size={26} />,
        title: "Alert",
        link: "/backoffice/inventory/alert",
      },
    ],
  },
  {
    id: 7,
    icon: <MdAccountCircle size={28} />,
    title: "Account",
    link: "/backoffice/account",
  },
  {
    id: 8,
    icon: <IoSettingsOutline size={24} />,
    title: "Settings",
    link: "/backoffice/settings",
  },
];

const SideBar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const selectedTab = useSelector(getSelectedTab);
  const selectedSubcategoryTab = useSelector(getSelectedSubcategoryTab);
  const pathname = usePathname();
  const hasClinic = useSelector(getHasClinic);
  const [showSubCategories, setShowSubCategories] = useState(false);

  useEffect(() => {
    dispatch(insertSelectedTab(pathname.split("/")[2]));
  }, [pathname]);

  return (
    <div className="flex flex-col sticky top-0 z-[999] h-screen max-w-[225px] lg:min-w-[275px]  border-gray-300 dark:border-black border-r-[1px] bg-white dark:bg-[#171717]">
      <div className="h-auto border-[0.5px] rounded text-center border-primaryBlue-400 m-2 text-black mb-2">
        <Image
          src={theme.theme === "dark" ? darkLogo : logo}
          alt=""
          width={250}
          height={200}
        />
      </div>

      <Box className="flex-1 overflow-y-auto">
        {sidebarData.map((data) => {
          return (
            <div key={data.id}>
              <div
                onClick={() => {
                  if (!hasClinic) {
                    return;
                  }
                  if (data.link) {
                    dispatch(insertPageNumber(1));
                    dispatch(insertSelectedTab(data.title.toLowerCase()));
                    dispatch(insertSelectedSubcategoryTab(""));
                    dispatch(insertAppointmentView("row"));
                  } else {
                    setShowSubCategories(!showSubCategories);
                  }
                }}
                className={`w-[90%] h-[50px] m-auto rounded-lg pl-6 p-2 ${
                  data.title.toLowerCase() === selectedTab
                    ? "bg-primaryBlue-300 dark:bg-primaryBlue-400 text-white border-2 border-white dark:border-primaryBlue-400 dark:text-gray-300"
                    : "text-gray-500 hover:text-primaryBlue-300 hover:text-lg"
                } `}
              >
                {data.link ? (
                  <Link
                    href={
                      !hasClinic
                        ? "/backoffice/settings"
                        : data.link
                        ? data.link
                        : ""
                    }
                    className="flex items-center"
                  >
                    {data.icon}
                    <div className="ml-4">{data.title}</div>
                  </Link>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {data.icon}
                      <div className="ml-4">{data.title}</div>
                    </div>
                    <div className={`${data.link ? "hidden" : "flex"}`}>
                      {showSubCategories ? (
                        <MdOutlineKeyboardArrowUp size={28} />
                      ) : (
                        <MdKeyboardArrowDown size={28} />
                      )}
                    </div>
                  </div>
                )}
              </div>
              {showSubCategories
                ? data.subCategories?.map((subcategory) => (
                    <div
                      key={subcategory.id}
                      onClick={(e) => {
                        if (!hasClinic) {
                          return;
                        }
                        dispatch(insertPageNumber(1));
                        dispatch(
                          insertSelectedSubcategoryTab(
                            subcategory.title.toLowerCase()
                          )
                        );
                      }}
                      className={`w-[80%] h-[45px] rounded-lg text-center pl-6 mx-auto mt-2 mb-3 p-2 ${
                        subcategory.title.toLowerCase() ===
                        selectedSubcategoryTab
                          ? "dark:bg-transparent text-primaryBlue-300 dark:text-primaryBlue-400 border-2 border-primaryBlue-300 dark:border-primaryBlue-400"
                          : "text-gray-500 hover:text-primaryBlue-300 hover:text-lg"
                      } `}
                    >
                      <Link
                        href={subcategory.link}
                        className="flex items-center"
                      >
                        {subcategory.icon}
                        <div className="ml-4">{subcategory.title}</div>
                      </Link>
                    </div>
                  ))
                : null}
            </div>
          );
        })}
      </Box>

      <div className="flex justify-center p-4  bg-white dark:bg-[#171717]">
        <Link
          href={"/login"}
          onClick={async () => {
            await baseApi.post(`${config.apiBaseUrl}/auth/logout`);
            localStorage.removeItem("access-x");
            localStorage.removeItem("refresh-x");
          }}
          className="flex items-center hover:text-primaryBlue-300 hover:text-lg text-center text-gray-500"
        >
          <CiLogout size={28} />
          <div className="ml-2">Logout</div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
