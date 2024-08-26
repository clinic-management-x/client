import { InputAdornment, TextField, styled } from "@mui/material";
import { useTheme } from "next-themes";
import React from "react";

interface Props {
  value: string | number;
  handleChange: (e: any) => void;
  type?: string;
  className?: string;
  placeholder?: string;
}

const CustomTextField = ({
  value,
  handleChange,
  type,
  className,
  placeholder,
}: Props) => {
  const { theme } = useTheme();
  return (
    <>
      {type === "fees" || type === "number" ? (
        <TextField
          value={value}
          onChange={(e) => handleChange(e)}
          InputProps={{
            inputProps: { min: 0 },
            style: {
              color: theme === "dark" ? "#D1D5DB" : "#6B7280",
            },
          }}
          type="number"
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
      ) : type === "mobile" ? (
        <TextField
          value={value}
          onChange={(e) => handleChange(e)}
          InputProps={{
            style: {
              color: theme === "dark" ? "#D1D5DB" : "#6B7280",
            },
            startAdornment: (
              <InputAdornment position="start">
                <p className="dark:text-[#D1D5DB]">+959</p>
              </InputAdornment>
            ),
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
      ) : (
        <TextField
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e)}
          InputProps={{
            style: {
              color: theme === "dark" ? "#D1D5DB" : "#6B7280",
            },
          }}
          className={className}
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
      )}
    </>
  );
};

// const CustomTextField = styled(TextField)(({}) => ({
//   //input: { color: "gray" },
//   "& .MuiOutlinedInput-root": {
//     "& fieldset": {
//       borderColor: "#9CA3AF",
//       backgroundColor: "#C7C7C7F",
//     },
//     "&:hover fieldset": {
//       borderColor: "#9CA3AF",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#9CA3AF",
//     },
//   },
// }));

export default CustomTextField;
