import CloseButton from "@/components/buttons/CloseButton/page";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Typography,
} from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
  text: string;
  handleDelete: () => void;
  loading: boolean;
}
const DeleteDialog = ({
  open,
  handleClose,
  text,
  handleDelete,
  loading,
}: Props) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <Box className="flex flex-col  mt-8 px-4">
        <Typography variant="h6">{`Are you sure to delete ${text}?`}</Typography>
        <CloseButton handleClose={handleClose} />
        <Box
          className={`m-auto my-4 space-x-2
        "flex justify-center" `}
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
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{
              width: 100,
              height: 40,
              bgcolor: "#e63946",
              color: "white",
              ":hover": {
                bgcolor: "#e63946",
                color: "white",
              },
            }}
            onClick={handleDelete}
          >
            {loading ? (
              <CircularProgress color="inherit" size={30} />
            ) : (
              "Delete"
            )}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DeleteDialog;
