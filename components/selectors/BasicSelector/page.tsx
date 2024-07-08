import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTheme } from "next-themes";
import React from "react";

interface DataItem {
  _id?: string; // This allows _id to be either string or number
  name: string;
}
interface Props<T extends DataItem, S> {
  dataArr: T[];
  title: string;
  handleChange: (e: any, value: any) => void;
  selectedValue: S;
}
const BasicSelector = <T extends DataItem, S>({
  dataArr,
  title,
  handleChange,
  selectedValue,
}: Props<T, S>) => {
  const { theme } = useTheme();

  return (
    <div>
      <FormControl sx={{ m: "auto", minWidth: 150 }}>
        <InputLabel
          id="demo-simple-select-helper-label"
          className=" text-primaryBlue-300"
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
          size="small"
          className=""
          sx={{
            color: theme === "dark" ? "#D1D5DB" : "#6B7280",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#0F80AA",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0096c7",
            },
          }}
        >
          {dataArr?.map((data, index) => (
            <MenuItem key={index} value={data._id}>
              {data.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default BasicSelector;
