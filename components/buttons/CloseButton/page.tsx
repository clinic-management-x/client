import { IconButton } from "@mui/material";
import React from "react";
import { RxCross1 } from "react-icons/rx";

interface Props {
  handleClose: () => void;
}

const CloseButton = ({ handleClose }: Props) => {
  return (
    <IconButton onClick={handleClose} className="absolute top-0 right-0">
      <RxCross1 className="text-[#9CA3AF] dark:text-gray-400" />
    </IconButton>
  );
};

export default CloseButton;
