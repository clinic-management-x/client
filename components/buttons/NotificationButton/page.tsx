import {
  getNotificationCount,
  getOpenNotifications,
  insertOpenNotification,
} from "@/redux/slices/layout";
import React from "react";
import { IoMdNotifications } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const NotificationButton = () => {
  const dispatch = useDispatch();
  const openNotification = useSelector(getOpenNotifications);
  const notiCount = useSelector(getNotificationCount);
  return (
    <div
      onClick={() => {
        dispatch(insertOpenNotification(!openNotification));
      }}
      className="relative w-[40px] h-[40px] cursor-pointer  _scale  p-[5px]   ml-[10px] 490:ml-[15px] border-primaryBlue-300 border-2  rounded-full shadow-lg   "
    >
      <IoMdNotifications className="text-primaryBlue-300  text-[24px] hover:scale-105" />
      {notiCount != 0 ? (
        <div className="absolute -top-2 -right-3 rounded-full w-6 h-6 bg-error text-center">
          {notiCount}
        </div>
      ) : (
        <div className="absolute"></div>
      )}
    </div>
  );
};

export default NotificationButton;
