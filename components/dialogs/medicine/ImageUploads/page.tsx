import { uploadFile } from "@/datafetch/fileupload/upload.api";
import { IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { TbCameraUp } from "react-icons/tb";
import Image from "next/image";
import { IoMdCloseCircle } from "react-icons/io";
import DetailEditCancelButton from "@/components/buttons/DetailEditCancelButton/page";
import { useDispatch } from "react-redux";
import {
  insertImageEdiging,
  insertImageUploading,
} from "@/redux/slices/inventory";

interface Props {
  setBasicMedicineInfo: (data: MedicineTypeCreate) => void;
  basicMedicineInfo: MedicineTypeCreate;

  edit: boolean;
}

interface URL {
  preview: string;
  actual: string;
}
const ImageUploads = ({
  basicMedicineInfo,
  setBasicMedicineInfo,
  edit,
}: Props) => {
  const dispatch = useDispatch();
  const [urls, setUrls] = useState<URL[]>([]);

  const handleFileDrop = async (acceptedFiles: Blob[]) => {
    dispatch(insertImageUploading(true));
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("purpose", "DRUG_AVATAR");
    const data = await uploadFile(formData);
    if (data) dispatch(insertImageUploading(false));
    setUrls([...urls, { preview: data.presignedUrl, actual: data.url }]);
    setBasicMedicineInfo({
      ...basicMedicineInfo,
      imageUrls: [...basicMedicineInfo.imageUrls, data.url],
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-2">
        {urls.map((url, index) => (
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
                setUrls(urls.filter((urldata, i) => i !== index));
                setBasicMedicineInfo({
                  ...basicMedicineInfo,
                  imageUrls: basicMedicineInfo.imageUrls.filter(
                    (imageurl) => imageurl !== url.actual
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
    </div>
  );
};

export default ImageUploads;
