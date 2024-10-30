"use client";

import CustomTextField from "@/components/input/CustomTextField/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import {
  createClinic,
  getClinicData,
  updateClinic,
  updateClinicPassword,
} from "@/datafetch/clinic/clinic.api";
import { insertHasClinic } from "@/redux/slices/user";
import config from "@/utils/config";
import { clinicEndPoint } from "@/utils/endpoints";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const ClinicDataPage = () => {
  const { theme } = useTheme();
  const sx = {
    color: theme === "dark" ? "white" : "dark",

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#9CA3AF",
      backgroundColor: "#C7C7C7F",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#9CA3AF",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#9CA3AF",
    },
  };
  const dispatch = useDispatch();
  const [clinic, setClinic] = useState<ClinicType | null>(null);
  const [clinicName, setClinicName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const { data, isLoading } = useSWR(
    `${config.apiBaseUrl}/${clinicEndPoint}`,
    getClinicData
  );

  const { trigger, isMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${clinicEndPoint}`,
    createClinic
  );

  const { trigger: updateTrigger, isMutating: updateMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${clinicEndPoint}`,
    updateClinic
  );

  useEffect(() => {
    if (data) {
      setClinic(data);
      setClinicName(data.name);
    }
  }, [data]);

  return (
    <section className="flex flex-col overflow-y-scroll">
      <Box
        sx={{
          mb: 40,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="flex flex-col items-start justify-start mt-20 md:mt-6">
          <Typography
            variant="h5"
            className="text-whiteText dark:text-darkText mb-4"
          >
            Clinic
          </Typography>
          <LabelTypography title="Name" />
          <div className="w-[300px]">
            <CustomTextField
              value={clinicName}
              handleChange={(e) => {
                setClinicName(e.target.value);
              }}
              type=""
              className="w-full"
            />
          </div>
          <Button
            className="w-[300px] my-8 h-[50px] "
            variant="contained"
            onClick={async () => {
              try {
                const data = clinic
                  ? await updateTrigger({ name: clinicName })
                  : await trigger({ name: clinicName });
                if (data) {
                  dispatch(insertHasClinic(true));
                  localStorage.setItem("clinic", "present");
                  toast.success("Successfully created.");
                }
              } catch (error) {
                console.log("error", error);
                toast.error("Something went wrong.");
              }
            }}
          >
            {isMutating || updateMutating ? (
              <CircularProgress color="inherit" size={30} />
            ) : clinic ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
          <>
            {clinic ? (
              <>
                <LabelTypography title="Update Password?" />
                <div className="my-4">
                  <LabelTypography title="current password:" />
                  <FormControl className="w-[300px]" variant="filled">
                    <OutlinedInput
                      sx={sx}
                      id="outlined-adornment-password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => {
                        setCurrentPassword(e.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                            edge="end"
                            className="dark:text-white "
                          >
                            {showCurrentPassword ? (
                              <IoEyeOutline />
                            ) : (
                              <IoEyeOffOutline />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <div className="mb-4">
                  <LabelTypography title="new password:" />
                  <FormControl className="w-[300px]" variant="filled">
                    <OutlinedInput
                      sx={sx}
                      id="outlined-adornment-password"
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            edge="end"
                            className="dark:text-white "
                          >
                            {showNewPassword ? (
                              <IoEyeOutline />
                            ) : (
                              <IoEyeOffOutline />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <div>
                  <LabelTypography title="repeat password:" />
                  <FormControl className="w-[300px]" variant="filled">
                    <OutlinedInput
                      sx={sx}
                      error={repeatNewPassword !== newPassword}
                      id="outlined-adornment-password"
                      type={showRepeatPassword ? "text" : "password"}
                      value={repeatNewPassword}
                      onChange={(e) => {
                        setRepeatNewPassword(e.target.value);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              setShowRepeatPassword(!showRepeatPassword)
                            }
                            edge="end"
                            className="dark:text-white "
                          >
                            {showRepeatPassword ? (
                              <IoEyeOutline />
                            ) : (
                              <IoEyeOffOutline />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <Button
                  className="w-[300px] my-8 h-[50px] "
                  variant="contained"
                  onClick={async () => {
                    try {
                      if (repeatNewPassword !== newPassword) {
                        toast.error(
                          "Please make sure new passwords are the same."
                        );
                      }
                      setPasswordLoading(true);
                      const data = await updateClinicPassword(
                        `${config.apiBaseUrl}/${clinicEndPoint}/update-password`,
                        { password: currentPassword, newPassword: newPassword }
                      );
                      if (data) {
                        setPasswordLoading(false);
                        toast.success("Successfully updated.");
                        setCurrentPassword("");
                        setNewPassword("");
                        setRepeatNewPassword("");
                        setShowCurrentPassword(false);
                        setShowNewPassword(false);
                        setShowRepeatPassword(false);
                      }
                    } catch (error: any) {
                      setPasswordLoading(false);
                      if (error.response.data.message) {
                        toast.error(error.response.data.message);
                      } else {
                        toast.error("Something went wrong.");
                      }
                    }
                  }}
                >
                  {passwordLoading ? (
                    <CircularProgress color="inherit" size={30} />
                  ) : (
                    "Change"
                  )}
                </Button>
              </>
            ) : (
              <></>
            )}
          </>
        </div>
      </Box>
    </section>
  );
};

export default ClinicDataPage;
