import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTheme } from "next-themes";
import React from "react";

interface DataItem {
  _id?: string | number; // This allows _id to be either string or number
  name: string;
}

interface Props<T extends DataItem, S> {
  dataArr: T[];
  title: string;
  handleChange: (e: any, value: any) => void;
  selectedValue: S;
}

const PlainSelector = <T extends DataItem, S>({
  dataArr,
  title,
  handleChange,
  selectedValue,
}: Props<T, S>) => {
  const { theme } = useTheme();
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel
          id="demo-simple-select-helper-label"
          className="text-gray-500 dark:text-[#D1D5DB]"
        >
          {title}
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectedValue}
          onChange={(e, value: any) => {
            handleChange(e, value?.props?.children);
          }}
          className=""
          sx={{
            color: theme === "dark" ? "#D1D5DB" : "#6B7280",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#9CA3AF",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#9CA3AF",
            },
            "&:focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#9CA3AF",
            },
            ".MuiSvgIcon-root ": {
              fill: "#9CA3AF !important",
            },
          }}
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          {dataArr.map((data, index) => (
            <MenuItem key={index} value={data._id}>
              {data.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default PlainSelector;
