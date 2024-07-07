import { Button } from "@mui/material";
import React from "react";
import { FaCheck } from "react-icons/fa6";

interface Props {
  handleClick: () => void;
}

const CheckButton = ({ handleClick }: Props) => {
  return (
    <Button
      onClick={handleClick}
      className="w-12 h-8 rounded-md border-success hover:border-success hover:bg-success/10"
      variant="outlined"
    >
      <FaCheck className=" text-success" size={16} />
    </Button>
  );
};

export default CheckButton;
