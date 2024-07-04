import CloseButton from "@/components/buttons/CloseButton/page";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface Props {
  open: boolean;
  handleClose: () => void;

  handleDelete: () => void;
  loading: boolean;
}

const DeleteDoctorDialog = ({
  open,
  handleClose,
  handleDelete,
  loading,
}: Props) => {
  const [confirmText, setConfirmText] = useState("");
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Box className="px-10 mt-6">
        <CloseButton handleClose={handleClose} />
        <Typography className=" dark:text-darkText text-[30px]">
          Delete Account?
        </Typography>
        <Typography variant="body2" className="text-[16px] my-4">
          Deleting the account will remove all of the doctor's information from
          our databse.This cannot be undone.
        </Typography>
        <Typography variant="caption" className="my-4">
          To confirm this, type "DELETE".
        </Typography>
        <Box className="my-4 flex flex-col md:flex-row space-y-2 justify-start items-start  md:items-center md:justify-between">
          <TextField
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
          <Button
            sx={{
              minWidth: 160,
              height: 40,
              bgcolor: "#e63946",
              color: "white",
              ":hover": {
                bgcolor: "#e63946",
                color: "white",
              },
            }}
            disabled={confirmText !== "DELETE"}
            onClick={handleDelete}
          >
            {loading ? (
              <CircularProgress color="inherit" size={30} />
            ) : (
              "Delete Doctor"
            )}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DeleteDoctorDialog;
