import { getNotifications } from "@/datafetch/notifications/notifications.api";
import {
  getOpenNotifications,
  insertOpenNotification,
} from "@/redux/slices/layout";
import config from "@/utils/config";
import { notificationEndPoint } from "@/utils/endpoints";
import React from "react";
import { IoMdNotifications } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

const NotificationButton = () => {
  const dispatch = useDispatch();
  const openNotification = useSelector(getOpenNotifications);
  const { data } = useSWR(
    `${config.apiBaseUrl}/${notificationEndPoint}`,
    getNotifications
  );
  return (
    <div
      onClick={() => {
        dispatch(insertOpenNotification(!openNotification));
      }}
      className="relative w-[40px] h-[40px] cursor-pointer  _scale  p-[5px]   ml-[10px] 490:ml-[15px] border-primaryBlue-300 border-2  rounded-full shadow-lg   "
    >
      <IoMdNotifications className="text-primaryBlue-300  text-[24px] hover:scale-105" />
      <div className="absolute -top-2 -right-3 rounded-full w-6 h-6 bg-error text-center">
        {data?.count}
      </div>
    </div>
  );
};

export default NotificationButton;
