import { IconButton } from "@mui/material";
import React from "react";
import { MdEdit } from "react-icons/md";

interface Props {
  handleClick: () => void;
}
const EditButton = ({ handleClick }: Props) => {
  return (
    <IconButton onClick={handleClick}>
      <MdEdit className="text-primaryBlue-300" size={22} />
    </IconButton>
  );
};

export default EditButton;
