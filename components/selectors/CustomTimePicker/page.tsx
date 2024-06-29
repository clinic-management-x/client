import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import { useTheme } from "next-themes";
import React from "react";

interface Props {
  handleChange: (newValue: Dayjs | null) => void;
  selectedValue: Dayjs | null;
}

const CustomTimePicker = ({ handleChange, selectedValue }: Props) => {
  const { theme } = useTheme();
  return (
    <TimePicker
      defaultValue={dayjs("2022-04-17T15:30")}
      onChange={(newValue) => handleChange(newValue)}
      slotProps={{
        popper: {
          sx: {
            "& .MuiList-root": {
              backgroundColor: "#F3F4F6",
            },
            "& .MuiMenuItem-root": {
              "&.Mui-selected": {
                backgroundColor: "#0F80AA",
                color: "white",
              },
              color: "gray",
            },
            "& .MuiDialogActions-root": {
              backgroundColor: "#F3F4F6",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
          },
        },
      }}
      sx={{
        input: {
          color: theme === "dark" ? "#D1D5DB" : "#6B7280",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#9CA3AF",
            backgroundColor: "#C7C7C7F",
          },
          "&:hover > fieldset": { borderColor: "#9CA3AF" },
          "&:focused > fieldset": { borderColor: "#9CA3AF" },
          borderRadius: "6px",
          borderColor: "green",
        },
        "& .MuiTimePicker-root": {
          borderColor: "#9CA3AF",
        },
        ".MuiSvgIcon-root ": {
          fill: `${theme === "dark" ? "#D1D5DB" : "#6B7280"} !important`,
        },
      }}
    />
  );
};

export default CustomTimePicker;
