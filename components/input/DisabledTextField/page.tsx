import { TextField } from "@mui/material";
import { useTheme } from "next-themes";
import React from "react";

interface Props {
  value: string;
  label: string;
}
const DisabledTextField = ({ value, label }: Props) => {
  const { theme } = useTheme();

  return (
    <TextField
      id="outlined-controlled"
      label={<p className="text-whiteText dark:text-darkText">{label}</p>}
      value={value}
      InputProps={{
        style: {
          color: theme === "dark" ? "#4b556" : "#6B7280",
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#9CA3AF",
            backgroundColor: "#C7C7C7F",
          },
          "&:hover fieldset": {
            borderColor: "#9CA3AF",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#9CA3AF",
          },
        },
      }}
    />
  );
};

export default DisabledTextField;
