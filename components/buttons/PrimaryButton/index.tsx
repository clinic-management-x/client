"use client";
import Spinner from "@/components/loaders/Spinner";
import { Button, CircularProgress } from "@mui/material";
import React, { FC } from "react";

interface PrimaryButtonProps {
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  loading: boolean;
  disabled: boolean;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  text,
  className,
  type,
  onClick,
  loading,
  disabled,
}) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      variant="contained"
      disabled={disabled}
      className={` ${
        disabled ? " opacity-50" : "bg-primaryBlue-400"
      }  flex justify-center items-center w-[130px]  md:w-[170px] md:h-[45px] text-sm md:text-md text-white ${className} `}
    >
      {loading ? <CircularProgress color="inherit" size={30} /> : text}
    </Button>
  );
};

export default PrimaryButton;
