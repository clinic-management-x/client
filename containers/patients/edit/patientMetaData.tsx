import { Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

interface Props {
  patient: PatientType;
}
const PatientMetaData = ({ patient }: Props) => {
  console.log("qr", patient.qrCodeUrl);
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };
  return (
    <div className="flex flex-col items-center mb-4">
      <Typography
        variant="h5"
        className="font-bold text-whiteText dark:text-darkText"
      >
        Scan QR Code
      </Typography>
      <Image
        src={"" + patient.qrCodeUrl}
        width={320}
        height={320}
        alt="patient"
        className="w-[150px] h-[150px]"
      />
      <div className="mt-4 flex border-[1px] p-2 border-whiteText dark:border-darkText rounded w-[300px] items-center justify-between">
        <Typography className="text-whiteText dark:text-darkText">
          {patient.patientId}
        </Typography>
        <div className="w-[1px] dark:bg-darkText bg-whiteText h-8"></div>
        <div className="relative">
          <div
            className={`${
              isCopied ? "absolute" : "hidden"
            }  p-1 -right-4 -top-12 rounded text-center text-white bg-success`}
          >
            Copied!
          </div>
          <Tooltip
            title={isCopied ? "" : "Copy to clipboard"}
            placement="top"
            arrow
          >
            <button
              onClick={() => {
                handleCopy("" + patient.patientId);
              }}
              style={{}}
              className=" p-1 text-whiteText dark:text-darkText rounded-md"
            >
              <IoCopyOutline size={20} />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default PatientMetaData;
