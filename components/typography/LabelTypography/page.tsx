import { Typography } from "@mui/material";
import React from "react";

interface Props {
  title: string;
}
const LabelTypography = ({ title }: Props) => {
  return (
    <Typography
      variant="subtitle2"
      className="font-semibold text-gray-500 dark:text-gray-400 mb-1"
    >
      {title}
    </Typography>
  );
};

export default LabelTypography;
