import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

interface Props<T, S> {
  dataArr: T[];
  title: string;
  handleChange: () => void;
  selectedValue: S;
}
const BasicSelector = <T, S>({
  dataArr,
  title,
  handleChange,
  selectedValue,
}: Props<T, S>) => {
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
          onChange={handleChange}
          size="small"
          className=""
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#0096c7",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0096c7",
            },
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {dataArr.map((data, index) => (
            <MenuItem key={index}>{}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default BasicSelector;
