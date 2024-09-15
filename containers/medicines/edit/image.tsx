import { uploadFile } from "@/datafetch/fileupload/upload.api";
import { IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { TbCameraUp } from "react-icons/tb";
import Image from "next/image";
import { IoMdCloseCircle } from "react-icons/io";
import DetailEditCancelButton from "@/components/buttons/DetailEditCancelButton/page";
import useSWRMutation from "swr/mutation";
import config from "@/utils/config";
import { medicineEndPoint } from "@/utils/endpoints";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentMedicineId,
  getImageEditing,
  insertImageEdiging,
} from "@/redux/slices/inventory";
import { updateMedicineData } from "@/datafetch/medicines/medicines.api";
import toast from "react-hot-toast";

interface Props {
  setBasicMedicineInfo: (data: MedicineTypeCreate) => void;
  basicMedicineInfo: MedicineTypeCreate;
  imageArray: { preview: string; actual: string }[];
  edit: boolean;
}

interface URL {
  preview: string;
  actual: string;
}

const ImageEdit = ({
  basicMedicineInfo,
  setBasicMedicineInfo,
  imageArray,

  edit,
}: Props) => {
  const isImageEditing = useSelector(getImageEditing);

  const dispatch = useDispatch();
  const medicineId = useSelector(getCurrentMedicineId);

  const handleFileDrop = async (acceptedFiles: Blob[]) => {
    dispatch(insertImageEdiging(true));
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("purpose", "DRUG_AVATAR");
    const data = await uploadFile(formData);

    setBasicMedicineInfo({
      ...basicMedicineInfo,
      imageUrls: [
        ...basicMedicineInfo.imageUrls,
        { preview: data.presignedUrl, actual: data.url },
      ],
    });
  };
  const { trigger, isMutating: updateMedicineMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${medicineEndPoint}/${medicineId}`,
    updateMedicineData
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row items-center space-x-2">
        {basicMedicineInfo.imageUrls.map((url, index) => (
          <div
            key={index}
            className=" min-h-[300px] md:min-h-[200px] relative flex items-center justify-center"
          >
            <Image
              src={url.preview}
              alt=""
              height={200}
              width={200}
              className="w-[200px] h-[200px]"
            />
            <IconButton
              className="absolute top-0 right-0"
              onClick={() => {
                dispatch(insertImageEdiging(true));

                setBasicMedicineInfo({
                  ...basicMedicineInfo,
                  imageUrls: basicMedicineInfo.imageUrls.filter(
                    (urldata) => urldata.actual !== url.actual
                  ),
                });
              }}
            >
              <IoMdCloseCircle className="text-error" />
            </IconButton>
          </div>
        ))}
        {basicMedicineInfo.imageUrls.length < 4 ? (
          <Dropzone onDrop={handleFileDrop} minSize={0} maxSize={5242880}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
              <section className=" min-h-[300px] md:min-h-[200px] mt-2 ">
                <div
                  {...getRootProps()}
                  className="border-2 border-gray-300 border-dashed rounded w-[200px] h-[200px] m-auto flex flex-col items-center justify-center"
                >
                  <input {...getInputProps()} />

                  <TbCameraUp
                    size={40}
                    className=" text-gray-400 text-center "
                  />
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
          <></>
        )}
      </div>
      <div className=" w-[50%] ">
        <DetailEditCancelButton
          show={isImageEditing}
          handleCancel={() => {
            dispatch(insertImageEdiging(false));
            setBasicMedicineInfo({
              ...basicMedicineInfo,
              imageUrls: imageArray,
            });
          }}
          handleUpdate={async () => {
            try {
              const payload = {
                imageUrls: basicMedicineInfo.imageUrls,
              };
              const data = await trigger(payload as MedicineTypeUpdate);
              if (data) {
                toast.success("Successfully updated.");

                dispatch(insertImageEdiging(false));
              }
            } catch (error) {
              toast.error("Something went wrong.");
            }
          }}
          loading={updateMedicineMutating}
        />
      </div>
    </div>
  );
};

export default ImageEdit;
