import CloseButton from "@/components/buttons/CloseButton/page";
import CreateButton from "@/components/buttons/CreateButton/page";
import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
  //mutate: any;
}

const CreateBarcodeDialog = ({ open, handleClose }: Props) => {
  const handleCreate = async () => {};
  const closeDialog = () => {
    handleClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      scroll="paper"
      open={open}
      onClose={closeDialog}
    >
      <DialogContent
        dividers={true}
        className="flex flex-col dark:bg-[#3C3C3C]"
      >
        <Box className="flex flex-col md:flex-row">
          <CloseButton handleClose={closeDialog} />
          <Box
            className={`w-full  ${
              false
                ? "md:w-[100%] md:mt-0 lg:mt-2 lg:w-[70%] mt-0"
                : "md:w-[100%] mt-4"
            } mr-2`}
          ></Box>
        </Box>
      </DialogContent>
      <DialogActions className="dark:bg-[#3C3C3C] w-full">
        <div className="m-auto">
          <CreateButton
            handleClick={handleCreate}
            disabled={false}
            isLoading={false}
            showIcon={true}
          />
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBarcodeDialog;
