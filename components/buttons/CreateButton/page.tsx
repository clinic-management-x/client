import { Button } from "@mui/material";
import React from "react";
import { FaPlus } from "react-icons/fa6";

interface Props {
  handleClick: () => void;
  disabled: boolean;
}

const CreateButton = ({ handleClick, disabled }: Props) => {
  return (
    <Button
      variant="contained"
      className="bg-primaryBlue-400"
      startIcon={<FaPlus size={14} />}
      onClick={handleClick}
      disabled={disabled}
    >
      Create
    </Button>
  );
};

export default CreateButton;
