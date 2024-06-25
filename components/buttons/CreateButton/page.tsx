import { Button } from "@mui/material";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const CreateButton = () => {
  return (
    <Button
      variant="contained"
      className="bg-primaryBlue-400"
      startIcon={<FaPlus size={14} />}
    >
      Create
    </Button>
  );
};

export default CreateButton;
