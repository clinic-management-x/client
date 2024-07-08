import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useTheme } from "next-themes";
import React from "react";
import { FiSearch } from "react-icons/fi";

interface Props {
  selectedValue: string;
  handleClick: (e: any) => void;
  handleChange: (e: any) => void;
}
const SearchBar = ({ selectedValue, handleClick, handleChange }: Props) => {
  const { theme } = useTheme();

  return (
    <TextField
      value={selectedValue}
      onChange={(e) => handleChange(e)}
      id="standard-start-adornment"
      sx={{
        m: 1,
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "#0096c7",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#0096c7",
        },
      }}
      className="w-[300px] md:w-[240px] lg:w-[350px] "
      //className="rounded-lg"
      InputProps={{
        style: {
          color: theme === "dark" ? "#D1D5DB" : "black",
        },
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => handleClick(selectedValue)}>
              <FiSearch size={24} className="text-primaryBlue-300" />
            </IconButton>
          </InputAdornment>
        ),
      }}
      size="small"
    />
  );
};

export default SearchBar;
