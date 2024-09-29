"use client";
import {
  getCurrentMessagingSystem,
  insertCurrentMessagingSystem,
} from "@/redux/slices/settings";
import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import { FaSms, FaTelegram, FaViber } from "react-icons/fa";
import { LiaSmsSolid } from "react-icons/lia";
import { TbMessageUp } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

const SettingsSideBar = () => {
  const dispatch = useDispatch();
  const currentMessaging = useSelector(getCurrentMessagingSystem);
  const sideBarArr = [
    {
      id: 1,
      name: "Messaging",
      icon: <TbMessageUp size={24} className="font-bold" />,
      children: [
        {
          id: 111,
          name: "SMS",
          icon: (
            <LiaSmsSolid
              size={24}
              className={`${
                currentMessaging === "SMS" ? "text-white" : "text-[#3090DD]"
              } `}
            />
          ),
        },
        {
          id: 112,
          name: "Telegram",
          icon: <FaTelegram size={22} className="text-[#3AABE1]" />,
        },
        {
          id: 113,
          name: "Viber",
          icon: <FaViber size={22} className="text-[#663E8B]" />,
        },
      ],
    },
  ];

  return (
    <div className="w-full mx-auto mt-8">
      {sideBarArr.map((arritem) => (
        <div key={arritem.id} className=" w-[200px]   mx-auto">
          <div className="h-12 w-[200px]  p-4 rounded-md flex items-center justify-center  text-center text-whiteText dark:text-darkText">
            {arritem.icon}
            <div className=" text-[20px] font-bold ml-1">{arritem.name}</div>
          </div>
          {arritem.children.length ? (
            <ButtonGroup orientation="vertical" className="w-[200px] mt-4">
              {arritem.children.map((childitem) => (
                <Button
                  onClick={() => {
                    dispatch(insertCurrentMessagingSystem(childitem.name));
                  }}
                  key={childitem.id}
                  className={`${
                    childitem.name === currentMessaging
                      ? "bg-primaryBlue-300 text-white hover:bg-primaryBlue-300"
                      : "bg-white dark:bg-[#383838]  text-whiteText dark:text-darkText"
                  } flex items-center justify-start space-x-2`}
                >
                  {childitem.icon}
                  <div>{childitem.name}</div>
                </Button>
              ))}
            </ButtonGroup>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

export default SettingsSideBar;
