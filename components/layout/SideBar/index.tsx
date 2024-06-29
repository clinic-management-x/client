"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedTab, insertSelectedTab } from "@/redux/slices/layout";
import { MdAccountCircle, MdDashboard } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import { GiMedicines } from "react-icons/gi";
import { IoSettingsOutline } from "react-icons/io5";
const logo = require("../../../public/logo.jpeg");

const sidebarData: SidebarType[] = [
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
    icon: <FaUserDoctor size={28} />,
    title: "Doctors",
    link: "/backoffice/doctors",
  },
  {
    id: 4,
    icon: <HiMiniUsers size={28} />,
    title: "Staffs",
    link: "/backoffice/staffs",
  },
  {
    id: 5,
    icon: <GiMedicines size={28} />,
    title: "Medicine",
    link: "/backoffice/medicine",
  },
  {
    id: 6,
    icon: <MdAccountCircle size={28} />,
    title: "Account",
    link: "/backoffice/account",
  },
  {
    id: 7,
    icon: <IoSettingsOutline size={24} />,
    title: "Settings",
    link: "/backoffice/settings",
  },
];

const SideBar = () => {
  const dispatch = useDispatch();
  const selectedTab = useSelector(getSelectedTab);

  return (
    <div className=" max-w-[225px] lg:min-w-[275px]  border-gray-300 dark:border-black border-r-[1px] fixed h-screen pt-2 bg-white dark:bg-[#171717]">
      <div className="h-auto  border-[2px] rounded-lg text-center border-primaryBlue-200  m-2  text-black mb-2">
        <Image src={logo} alt="" width={250} height={200} />
      </div>
      {sidebarData.map((data) => {
        return (
          <div
            key={data.id}
            onClick={() => {
              dispatch(insertSelectedTab(data.title));
            }}
            className={`w-[90%] h-[50px] m-auto rounded-lg pl-6   p-2 ${
              data.title === selectedTab
                ? "bg-primaryBlue-200 dark:bg-transparent text-white border-2 border-white dark:border-primaryBlue-300 dark:text-primaryBlue-300"
                : "text-gray-500 hover:text-primaryBlue-300 hover:text-lg"
            } `}
          >
            <Link href={data.link} className="flex items-center">
              {data.icon}
              <div className="ml-4">{data.title}</div>
            </Link>
          </div>
        );
      })}
      <div className="  text-center fixed bottom-2 pl-14  w-[17%] h-[50px] text-gray-500 ">
        <Link
          href={"/login"}
          className="flex items-center hover:text-primaryBlue-300 hover:text-lg"
        >
          <CiLogout size={28} />
          <div className="ml-2">Logout</div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
