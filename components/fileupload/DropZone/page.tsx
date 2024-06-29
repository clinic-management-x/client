"use client";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { TbCameraUp } from "react-icons/tb";
import Dropzone from "react-dropzone";
import { CiSquareRemove } from "react-icons/ci";
import Image from "next/image";
import { Typography } from "@mui/material";

interface Props {
  previewUrl: string;
  handleFileDrop: any;
  handleRemove: () => void;
}

const DropZone = ({ previewUrl, handleFileDrop, handleRemove }: Props) => {
  return (
    <div>
      {!previewUrl ? (
        <Dropzone onDrop={handleFileDrop} minSize={0} maxSize={5242880}>
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
            <section className=" min-h-[300px] mt-2 ">
              <div
                {...getRootProps()}
                className="border-2 border-gray-300 border-dashed rounded w-[200px] h-[250px] m-auto flex flex-col items-center justify-center"
              >
                <input {...getInputProps()} />

                <TbCameraUp size={40} className=" text-gray-400 text-center " />
                <Typography
                  variant="subtitle2"
                  className="text-gray-400 mt-2 text-center"
                >
                  {!isDragActive && "Click here or drop a file to upload!"}
                  {isDragActive && !isDragReject && "Drop it like it's hot!"}
                  {isDragReject && "File type not accepted, sorry!"}
                </Typography>
              </div>
            </section>
          )}
        </Dropzone>
      ) : (
        <div className=" min-h-[300px] flex items-center justify-center">
          <Image
            src={previewUrl}
            alt=""
            height={200}
            width={200}
            className=""
          />
          <div className="" onClick={handleRemove}>
            <CiSquareRemove size={40} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DropZone;
