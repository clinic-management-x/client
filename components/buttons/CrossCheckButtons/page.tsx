import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { MdCheck } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

interface Props {
  handleCancel: () => void;
  handleAdd: () => void;
  isLoading?: boolean;
}
const CrossCheckButtonsGroup = ({
  handleCancel,
  handleAdd,
  isLoading,
}: Props) => {
  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="contained"
        color="error"
        sx={{ w: 40, height: 36 }}
        onClick={handleCancel}
      >
        <RxCross2 size={28} />
      </Button>
      <Button
        variant="contained"
        sx={{ w: 40, height: 36 }}
        onClick={handleAdd}
      >
        {isLoading === true ? (
          <CircularProgress color="inherit" size={26} />
        ) : (
          <MdCheck size={28} />
        )}
      </Button>
    </div>
  );
};

export default CrossCheckButtonsGroup;
