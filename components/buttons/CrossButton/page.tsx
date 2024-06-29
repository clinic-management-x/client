import { Button } from "@mui/material";
import React from "react";
import { RxCross2 } from "react-icons/rx";

interface Props {
  handleClick: () => void;
}
const CrossButton = ({ handleClick }: Props) => {
  return (
    <Button
      className="w-12 h-8 rounded-lg border-error hover:border-error hover:bg-error/10"
      variant="outlined"
      onClick={handleClick}
    >
      <RxCross2 className=" text-error" size={16} />
    </Button>
  );
};

export default CrossButton;
