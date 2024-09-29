"use client";
import { Box, Divider } from "@mui/material";
import React from "react";
import SettingsSideBar from "../side-bar/page";
import { getCurrentMessagingSystem } from "@/redux/slices/settings";
import { useSelector } from "react-redux";
import Viber from "../display/viber/page";
import SMS from "../display/sms/page";
import Telegram from "../display/telegram/page";

const MainSettingsPage = () => {
  const currentMessaging = useSelector(getCurrentMessagingSystem);
  return (
    <section className="flex flex-col overflow-y-scroll">
      <Box sx={{ mb: 40 }} className="flex ">
        <div className="w-[25%]">
          <SettingsSideBar />
        </div>
        <Divider
          orientation="vertical"
          className="h-screen  dark:bg-[#000000] bg-[#D1D5DB]"
        />
        <div className="w-[75%]">
          {currentMessaging === "Telegram" ? (
            <Telegram />
          ) : currentMessaging == "Viber" ? (
            <Viber />
          ) : currentMessaging === "SMS" ? (
            <SMS />
          ) : (
            <></>
          )}
        </div>
      </Box>
    </section>
  );
};

export default MainSettingsPage;
