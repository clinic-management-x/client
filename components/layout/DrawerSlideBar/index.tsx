"use client";
import baseApi from "@/datafetch/base.api";
import {
  getOpenDrawer,
  getSelectedSubcategoryTab,
  getSelectedTab,
  insertOpenDrawer,
  insertSelectedSubcategoryTab,
  insertSelectedTab,
} from "@/redux/slices/layout";
import { getHasClinic } from "@/redux/slices/user";
import config from "@/utils/config";
import { Drawer } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { FaCartPlus, FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { HiMiniUsers } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import {
  MdAddAlert,
  MdBusiness,
  MdKeyboardArrowDown,
  MdOutlineInventory2,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
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
    icon: <MdOutlineInventory2 size={28} />,
    title: "Inventory",
    subCategories: [
      {
        id: 30,
        icon: <MdBusiness size={26} />,
        title: "Supplier",
        link: "/backoffice/inventory/suppliers",
      },
      {
        id: 31,
        icon: <GiMedicines size={26} />,
        title: "Medicine",
        link: "/backoffice/inventory/medicine",
      },
      {
        id: 32,
        icon: <FaCartPlus size={26} />,
        title: "Order",
        link: "/backoffice/inventory/order",
      },
      {
        id: 34,
        icon: <MdAddAlert size={26} />,
        title: "Alert",
        link: "/backoffice/inventory/alert",
      },
    ],
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
  const hasClinic = useSelector(getHasClinic);
  const selectedSubcategoryTab = useSelector(getSelectedSubcategoryTab);
  const [showSubCategories, setShowSubCategories] = useState(false);
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
          <div key={data.id}>
            <div
              onClick={() => {
                if (!hasClinic) {
                  return;
                }
                if (data.link) {
                  dispatch(insertOpenDrawer(false));
                  dispatch(insertSelectedTab(data.title.toLowerCase()));
                  dispatch(insertSelectedSubcategoryTab(""));
                } else {
                  setShowSubCategories(!showSubCategories);
                }
                dispatch(insertSelectedTab(data.title.toLowerCase()));
              }}
              className={`w-[90%] h-[50px] m-auto rounded-lg pl-6   p-2 ${
                data.id === 1 ? "mt-4" : ""
              } ${
                data.title.toLowerCase() === selectedTab
                  ? "bg-primaryBlue-200 dark:bg-primaryBlue-400 text-white border-2 border-white dark:border-primaryBlue-300 dark:text-gray-300"
                  : "text-gray-500 hover:text-primaryBlue-300 hover:text-lg"
              } `}
            >
              {data.link ? (
                <Link href={data.link} className="flex items-center">
                  {data.icon} <div className="ml-4">{data.title}</div>
                </Link>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {data.icon}
                    <div className="ml-4">{data.title}</div>
                  </div>
                  <div className={`${data.link ? "hidden" : "flex"}`}>
                    {" "}
                    {showSubCategories ? (
                      <MdOutlineKeyboardArrowUp size={28} />
                    ) : (
                      <MdKeyboardArrowDown size={28} />
                    )}{" "}
                  </div>
                </div>
              )}
            </div>
            {showSubCategories ? (
              data.subCategories?.map((subcategory) => (
                <div
                  key={subcategory.id}
                  onClick={() => {
                    if (!hasClinic) {
                      return;
                    }

                    dispatch(
                      insertSelectedSubcategoryTab(
                        subcategory.title.toLowerCase()
                      )
                    );
                  }}
                  className={`w-[80%] h-[45px]  rounded-lg text-center pl-6 mx-auto mt-2 mb-3 p-2 ${
                    subcategory.title.toLowerCase() === selectedSubcategoryTab
                      ? " text-primaryBlue-300 border-2 dark:text-primaryBlue-400 dark:border-primaryBlue-400  border-primaryBlue-300 "
                      : "text-gray-500 hover:text-primaryBlue-300 hover:text-lg"
                  } `}
                >
                  <Link href={subcategory.link} className="flex items-center">
                    {subcategory.icon}
                    <div className="ml-4">{subcategory.title}</div>
                  </Link>
                </div>
              ))
            ) : (
              <></>
            )}
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
