import { IconButton } from "@mui/material";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";

interface Props {
  handleClick: () => void;
}
const TrashButton = ({ handleClick }: Props) => {
  return (
    <IconButton onClick={handleClick}>
      <FaTrashAlt className="text-error" size={18} />
    </IconButton>
  );
};

export default TrashButton;
