"use client";
import { getSelectedTab, insertSelectedTab } from "@/redux/slices/layout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { MdAccountCircle, MdDashboard } from "react-icons/md";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const bottomData = [
  {
    id: 1,
    title: "Dashboard",
    icon: <MdDashboard size={34} />,
    link: "/backoffice/dashboard",
  },
  {
    id: 2,
    title: "Appointments",
    icon: <RiCalendarScheduleLine size={34} />,
    link: "/backoffice/appointments",
  },
  {
    id: 2,
    icon: <MdAccountCircle size={34} />,
    title: "Account",
    link: "/backoffice/account",
  },
];
const BottomBar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const selectedTab = useSelector(getSelectedTab);
  useEffect(() => {
    dispatch(insertSelectedTab(pathname.split("/")[2]));
  }, [pathname]);
  return (
    <div className="absolute bottom-0 border-gray-300 dark:border-black bg-white dark:bg-black border-t-2 grid-rows-3 flex justify-between items-center  w-full h-[70px]">
      {bottomData.map((data) => (
        <div
          key={data.id}
          onClick={() => {
            dispatch(insertSelectedTab(data.title.toLowerCase()));
          }}
          className={`w-[33%] h-full py-4 flex justify-center ${
            selectedTab === data.title.toLowerCase()
              ? " text-primaryBlue-300 border-primaryBlue-300 border-2 rounded-lg "
              : " hover:text-primaryBlue-300 text-gray-500"
          }  `}
        >
          <Link href={data.link}>{data.icon}</Link>
        </div>
      ))}
    </div>
  );
};

export default BottomBar;
