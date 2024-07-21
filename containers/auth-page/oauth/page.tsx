import { Box, Typography } from "@mui/material";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleAuth = () => {
  return (
    <Box className="flex items-center justify-center space-x-2  w-[300px] border-[1px]  border-[#9CA3AF] h-[60px] rounded ">
      <FcGoogle size={28} />
      <Typography variant="body1" className="font-semibold">
        Sign in with google
      </Typography>
    </Box>
  );
};

export default GoogleAuth;
