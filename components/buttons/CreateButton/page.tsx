import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { FaPlus } from "react-icons/fa6";

interface Props {
  handleClick: () => void;
  disabled: boolean;
  isLoading?: boolean;
  showIcon: boolean;
}

const CreateButton = ({
  handleClick,
  disabled,
  isLoading,
  showIcon,
}: Props) => {
  return (
    <Button
      variant="contained"
      className={`bg-primaryBlue-400 w-[120px] ${
        disabled ? "bg-yellow-500" : ""
      }`}
      startIcon={isLoading || !showIcon ? <></> : <FaPlus size={14} />}
      onClick={handleClick}
      disabled={disabled}
    >
      {isLoading ? <CircularProgress color="inherit" size={30} /> : "Create"}
    </Button>
  );
};

export default CreateButton;
