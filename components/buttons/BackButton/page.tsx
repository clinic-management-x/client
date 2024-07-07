import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <Box className="flex items-center justify-start ml-2 mt-20 md:mt-2">
      <IconButton onClick={handleClick}>
        <IoMdArrowRoundBack className="dark:text-darkText text-whiteText" />
      </IconButton>
      <Typography className="dark:text-darkText text-whiteText font-semibold">
        Back
      </Typography>
    </Box>
  );
};

export default BackButton;
