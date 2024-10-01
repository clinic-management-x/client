"use client";
import { Box, Divider, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import SettingsSideBar from "../side-bar/page";
import {
  getCurrentMessagingSystem,
  insertCurrentMessagingSystem,
} from "@/redux/slices/settings";
import { useDispatch, useSelector } from "react-redux";
import Viber from "../display/viber/page";
import SMS from "../display/sms/page";
import Telegram from "../display/telegram/page";
import config from "@/utils/config";
import { getClinic } from "@/datafetch/clinic/clinic.api";
import useSWR from "swr";
import { IoIosArrowDropright } from "react-icons/io";

const MainSettingsPage = () => {
  const dispatch = useDispatch();
  const currentMessaging = useSelector(getCurrentMessagingSystem);

  const [clinic, setClinic] = useState<ClinicType | null>(null);

  const { data, mutate, isLoading } = useSWR(
    `${config.apiBaseUrl}/clinics`,
    getClinic
  );

  useEffect(() => {
    if (data) {
      setClinic(data);
    }
  }, [data]);

  return (
    <section className="flex flex-col overflow-y-scroll">
      <Box sx={{ mb: 40 }} className="flex mt-20 md:mt-0">
        <div
          className={`${
            currentMessaging === ""
              ? " w-[100%] lg:w-[30%]"
              : "hidden lg:block lg:w-[30%]"
          } `}
        >
          <SettingsSideBar />
        </div>
        <Divider
          orientation="vertical"
          className={` ${
            currentMessaging === "" ? "hidden lg:block" : ""
          } h-screen  dark:bg-[#000000] bg-[#D1D5DB]`}
        />
        <div
          className={`${
            currentMessaging === ""
              ? "hidden w-[0] lg:w-[70%]"
              : "w-[100%] lg:w-[75%]"
          } `}
        >
          <IconButton
            className=" lg:hidden"
            onClick={() => {
              dispatch(insertCurrentMessagingSystem(""));
            }}
          >
            <IoIosArrowDropright />
          </IconButton>
          {currentMessaging === "Telegram" ? (
            <Telegram clinic={clinic} setClinic={setClinic} />
          ) : currentMessaging == "Viber" ? (
            <Viber />
          ) : currentMessaging === "SMS" ? (
            <SMS clinic={clinic} setClinic={setClinic} />
          ) : (
            <></>
          )}
        </div>
      </Box>
    </section>
  );
};

export default MainSettingsPage;
