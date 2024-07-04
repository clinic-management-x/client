import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";

interface Props {
  show: boolean;
  handleCancel: () => void;
  handleUpdate: () => void;
  loading: boolean;
}

const DetailEditCancelButton = ({
  show,
  handleCancel,
  handleUpdate,
  loading,
}: Props) => {
  return (
    <Box
      className={`m-auto mt-2 space-x-2 ${
        show ? "flex justify-center" : "hidden"
      }`}
    >
      <Button
        sx={{
          width: 100,
          height: 40,
          bgcolor: "black",
          color: "white",
          ":hover": {
            bgcolor: "black",
            color: "white",
          },
        }}
        onClick={handleCancel}
      >
        Cancel
      </Button>
      <Button
        sx={{
          width: 100,
          height: 40,
          bgcolor: "#0F80AA",
          color: "white",
          ":hover": {
            bgcolor: "#0F80AA",
            color: "white",
          },
        }}
        onClick={handleUpdate}
      >
        {loading ? <CircularProgress color="inherit" size={30} /> : "Update"}
      </Button>
    </Box>
  );
};

export default DetailEditCancelButton;
