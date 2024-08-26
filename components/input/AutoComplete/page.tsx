import {
  Autocomplete,
  AutocompleteChangeReason,
  IconButton,
  TextField,
} from "@mui/material";
import React from "react";
import { IoIosClose } from "react-icons/io";

interface Props<T> {
  dataArr: T[];
  dataIndex: string;
  handleChange: (e: any, newValue: string) => void;
  handleSearch: (e: any) => void;
}

const AutocompleteSearch = <T,>({
  dataArr,
  dataIndex,
  handleChange,
  handleSearch,
}: Props<T>) => {
  return (
    <>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={dataArr?.map((data: any) => data[dataIndex])}
        onChange={(e, newValue) => {
          handleChange(e, newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              type: "search",
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

export default AutocompleteSearch;
