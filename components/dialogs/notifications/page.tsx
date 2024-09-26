"use client";
import {
  getNotifications,
  updateNotification,
} from "@/datafetch/notifications/notifications.api";
import {
  getOpenNotifications,
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
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

interface Props {
  open: boolean;
  closeDialog: () => void;
}

const NotificationDialog = () => {
  const dispatch = useDispatch();
  const openNotification = useSelector(getOpenNotifications);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentGroup, setCurrentGroup] = useState("All");
  const [limit, setLimit] = useState(8);
  const { data, isLoading, isValidating } = useSWR(
    `${config.apiBaseUrl}/${notificationEndPoint}?limit=${limit}&type=${currentGroup}`,
    getNotifications
  );

  const { trigger: update, isMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${notificationEndPoint}`,
    updateNotification
  );
  console.log("isLoading", isLoading);
  console.log("isValidaing", isValidating);

  useEffect(() => {
    if (data) {
      setNotifications(data?.data);
    }
  }, [data]);

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
    >
      <DialogTitle className="flex items-center justify-between h-14">
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
        className="flex flex-col dark:bg-[#3C3C3C]"
      >
        <Box className="flex flex-col space-y-2">
          {isValidating ? (
            <CircularProgress size={40} className=" m-auto text-center" />
          ) : (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className="border-[1px] border-gray-500 rounded p-2 "
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
                  <Typography className="font-400 dark:text-darkText">
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
                        : ""
                    }`}
                    label={notification.hasRead ? "Read" : "Mark as read?"}
                  />
                </div>
              </div>
            ))
          )}
        </Box>
      </DialogContent>
      <Button
        disabled={isLoading}
        onClick={() => {
          setLimit(limit + 8);
        }}
      >
        {isLoading ? <CircularProgress size={20} /> : "Load more"}
      </Button>
      {/* <DialogActions className="dark:bg-[#3C3C3C] w-full"></DialogActions> */}
    </Dialog>
  );
};

export default NotificationDialog;
