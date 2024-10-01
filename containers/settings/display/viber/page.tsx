import { Typography } from "@mui/material";
import React from "react";
import { FaViber } from "react-icons/fa";

const Viber = () => {
  return (
    <div className="ml-10 mt-4">
      <div className="flex items-center justify-between">
        <div className=" flex items-center space-x-2">
          <FaViber size={24} className="text-[#663E8B]" />
          <Typography
            variant="h6"
            className="font-bold text-whiteText dark:text-darkText"
          >
            Viber
          </Typography>
        </div>
      </div>
      <Typography
        variant="body1"
        className="text-whiteText dark:text-darkText mt-6"
      >
        We will be integrating viber messaging features sooner. 😃 😃 😃
      </Typography>
    </div>
  );
};

export default Viber;
