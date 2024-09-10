import { TextField } from "@mui/material";
import { useTheme } from "next-themes";
import React from "react";

interface Props {
  value: string | number;
  handleChange: (e: any) => void;
  alreadyExist: boolean;
  className?: string;
  placeholder?: string;
  handleBlur?: () => void;
}

const CheckTextField = ({
  value,
  handleChange,
  alreadyExist,
  className,
  placeholder,
  handleBlur,
}: Props) => {
  const { theme } = useTheme();

  return (
    <div>
      <TextField
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e)}
        InputProps={{
          style: {
            color: alreadyExist
              ? "#e63946"
              : theme === "dark"
              ? "#D1D5DB"
              : "#6B7280",
          },
        }}
        onBlur={handleBlur}
        className={className}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: alreadyExist ? "#e63946" : "#9CA3AF",
              backgroundColor: "#C7C7C7F",
            },
            "&:hover fieldset": {
              borderColor: alreadyExist ? "#e63946" : "#9CA3AF",
            },
            "&.Mui-focused fieldset": {
              borderColor: alreadyExist ? "#e63946" : "#9CA3AF",
            },
          },
        }}
      />
    </div>
  );
};

export default CheckTextField;
