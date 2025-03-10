import {
  Autocomplete,
  AutocompleteChangeReason,
  IconButton,
  TextField,
} from "@mui/material";
import { useTheme } from "next-themes";
import React from "react";
import { IoIosClose } from "react-icons/io";

interface Props<T> {
  dataArr: T[];
  dataIndex: string;
  handleChange: (e: any, newValue: string) => void;
  handleSearch: (e: any) => void;
  value?: any;
}

const TestAutocomplete = <T,>({
  dataArr,
  dataIndex,
  handleChange,
  handleSearch,
  value,
}: Props<T>) => {
  const { theme } = useTheme();

  return (
    <>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        value={value}
        options={dataArr}
        getOptionLabel={(option: any) => option.name || ""}
        onChange={(e, newValue) => {
          handleChange(e, newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              type: "search",
              style: {
                color: theme === "dark" ? "#D1D5DB" : "#6B7280",
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
            onChange={(e) => {
              handleSearch(e);
            }}
          />
        )}
      />
    </>
  );
};

export default TestAutocomplete;
