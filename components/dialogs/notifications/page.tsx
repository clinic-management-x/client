"use client";
import {
  getNotifications,
  markAllAsRead,
  updateNotification,
} from "@/datafetch/notifications/notifications.api";
import {
  getOpenNotifications,
  insertNotificationCount,
  insertOpenNotification,
} from "@/redux/slices/layout";
import config from "@/utils/config";
import { notificationEndPoint } from "@/utils/endpoints";
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import io, { Socket } from "socket.io-client";
import { getClinicId } from "@/redux/slices/user";
import { throttle } from "@/functions/throttle";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const NotificationDialog = () => {
  const clinicId = useSelector(getClinicId);
  const socketRef = useRef<Socket | null>(null);
  const dispatch = useDispatch();
  const openNotification = useSelector(getOpenNotifications);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentGroup, setCurrentGroup] = useState("All");
  const [limit, setLimit] = useState(8);

  const { data, isLoading, isValidating, mutate } = useSWR(
    `${config.apiBaseUrl}/${notificationEndPoint}?limit=${limit}&type=${currentGroup}`,
    getNotifications
  );

  const { trigger: update } = useSWRMutation(
    `${config.apiBaseUrl}/${notificationEndPoint}`,
    updateNotification
  );

  const { trigger: markAllRead, isMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${notificationEndPoint}/mark-all-read`,
    markAllAsRead
  );

  useEffect(() => {
    if (data) {
      setNotifications(data?.data);
      dispatch(insertNotificationCount(data?.count));
    }
  }, [data]);

  useEffect(() => {
    socketRef.current = io(config.apiBaseUrl, { query: { clinicId } });
  }, [clinicId]);

  const throttleMutate = throttle(mutate, 3000);

  socketRef.current?.on("notification", (data: any) => {
    throttleMutate();
  });

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      scroll="paper"
      open={openNotification}
      onClose={() => {
        setLimit(8);
        dispatch(insertOpenNotification(false));
      }}
      sx={{
        "& .MuiDialog-container": {
          alignItems: "flex-start",
          justifyContent: "end",
          mt: 4,
        },
      }}
      className="min-h-[600px]"
    >
      <DialogTitle className="flex items-center justify-between h-14  dark:bg-[#3C3C3C]">
        <Typography variant="h6" className="font-bold dark:text-darkText">
          Notifications
        </Typography>
        <ButtonGroup
          disableElevation
          aria-label="Disabled button group"
          className="my-2"
        >
          <Button
            onClick={() => {
              setCurrentGroup("All");
            }}
            sx={{
              bgcolor: currentGroup === "All" ? "#0F80AA" : "",
              color: currentGroup === "All" ? "white" : "",
              ":hover": {
                bgcolor: currentGroup === "All" ? "#0F80AA" : "",
              },
            }}
          >
            All
          </Button>
          <Button
            onClick={() => {
              setCurrentGroup("Unread");
            }}
            sx={{
              bgcolor: currentGroup === "Unread" ? "#0F80AA" : "",
              color: currentGroup === "Unread" ? "white" : "",
              ":hover": {
                bgcolor: currentGroup === "Unread" ? "#0F80AA" : "",
              },
            }}
          >
            Unread
          </Button>
        </ButtonGroup>
      </DialogTitle>
      <DialogContent
        dividers={true}
        className="flex flex-col dark:bg-[#3C3C3C] h-screen"
      >
        <Box className="flex flex-col space-y-2">
          {isValidating || isLoading || isMutating ? (
            <CircularProgress
              size={40}
              className=" m-auto text-center text-primaryBlue-400  mt-[300px]"
            />
          ) : (
            <div>
              {currentGroup === "Unread" ? (
                <div
                  className="cursor-pointer flex items-center justify-end space-x-1 mb-2 text-primaryBlue-400"
                  onClick={async () => {
                    try {
                      const data = await markAllRead();
                      if (data) {
                        setCurrentGroup("All");
                        toast.success("Successfully updated.");
                      }
                    } catch (error) {
                      toast.error("Something went wrong");
                    }
                  }}
                >
                  <IoCheckmarkDoneSharp size={22} />
                  <Typography>Mark All as Read?</Typography>
                </div>
              ) : (
                <></>
              )}

              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`border-b-[1px] ${
                    notification.hasRead
                      ? ""
                      : notification.type === "ORDER"
                      ? "bg-[#DEEFFF]"
                      : "bg-[#ECF8FE]"
                  }  rounded p-2 mb-1`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <Chip
                      label={notification.type}
                      className="rounded-md font-bold text-whiteText dark:text-darkText"
                    />

                    <Typography className=" text-whiteText dark:text-darkText">
                      {dayjs(notification.createdAt).format("DD MMM,YYYY")}
                    </Typography>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <Typography
                      variant="subtitle1"
                      className={` ${
                        notification.hasRead
                          ? " dark:text-darkText "
                          : "text-primaryBlue-400 font-semibold"
                      }`}
                    >
                      {notification.message}
                    </Typography>
                    <Chip
                      onClick={async () => {
                        try {
                          const data = await update({
                            _id: notification._id as string,
                            hasRead: true,
                          });

                          if (data) {
                            toast.success("Successfully marked as read.");
                            setNotifications(
                              notifications.map((noti) => {
                                if (noti._id === notification._id) {
                                  return { ...noti, hasRead: data.hasRead };
                                } else {
                                  return noti;
                                }
                              })
                            );
                          }
                        } catch (error) {
                          toast.error("Something went wrong.");
                        }
                      }}
                      size="small"
                      className={`cursor-pointer ${
                        notification.hasRead
                          ? "bg-primaryBlue-300 text-white hover:bg-primaryBlue-300"
                          : " dark:text-primaryBlue-300 "
                      }`}
                      label={notification.hasRead ? "Read" : "Mark as read?"}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Box>
      </DialogContent>
      <div className=" dark:bg-[#3C3C3C] w-full text-center">
        {notifications.length < limit ? (
          <Typography className="text-center py-2 text-whiteText dark:text-darkText">
            No more data to load
          </Typography>
        ) : (
          <Button
            disabled={isLoading}
            onClick={() => {
              setLimit(limit + 8);
            }}
          >
            {isLoading ? <CircularProgress size={20} /> : "Load more"}
          </Button>
        )}
      </div>
    </Dialog>
  );
};

export default NotificationDialog;
