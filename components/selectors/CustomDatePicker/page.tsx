import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { useTheme } from "next-themes";
import React from "react";

interface Props {
  value: Dayjs | null;
  handleChange: (newValue: Dayjs | null) => void;
  disabledPast?: boolean;
}

const CustomDatePicker = ({ value, handleChange, disabledPast }: Props) => {
  const { theme } = useTheme();
  return (
    <DatePicker
      value={value}
      onChange={(newValue) => handleChange(newValue)}
      views={["year", "month", "day"]}
      disablePast={disabledPast}
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

export default CustomDatePicker;
