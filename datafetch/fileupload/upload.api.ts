import config from "@/utils/config";
import baseApi from "../base.api";
import { fileUploadEndPoint } from "@/utils/endpoints";
import axios from "axios";

export const uploadFile = async (formdata: any) => {
  const response = await baseApi.post(
    `${config.apiBaseUrl}/${fileUploadEndPoint}`,
    formdata,
    {
      headers: {
        "Content-Type": "mutlipart-formdata",
      },
    }
  );

  return response.data;
};
