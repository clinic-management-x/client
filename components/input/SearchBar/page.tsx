import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div>
      <TextField
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
        className="w-[300px] md:w-[240px] lg:w-[350px]"
        //className="rounded-lg"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <FiSearch size={24} className="text-primaryBlue-300" />
            </InputAdornment>
          ),
        }}
        size="small"
      />
    </div>
  );
};

export default SearchBar;
