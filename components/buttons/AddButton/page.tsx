import { IconButton } from "@mui/material";
import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

interface Props {
  handleClick: () => void;
}
const AddButton = ({ handleClick }: Props) => {
  return (
    <IconButton className=" self-start" onClick={handleClick}>
      <IoIosAddCircleOutline className="dark:text-gray-400" />
    </IconButton>
  );
};

export default AddButton;
