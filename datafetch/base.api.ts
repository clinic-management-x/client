"use client";
import config from "@/utils/config";
import axios, { AxiosHeaders } from "axios";
import createAccApi from "./createacc.api";
import { getLocalStorageItem } from "@/utils/storageItem";
import { decryptData, encryptData } from "@/utils/encrypt";

let sameApiCallInProgress = false;

const handleRefreshToken = async () => {
  sameApiCallInProgress = true;
  const refresh = getLocalStorageItem("refresh-x") as string;
  const token = decryptData(refresh);
  const data = await createAccApi.post("/auth/refresh-token", {
    refreshToken: token,
  });
  if (data) {
    sameApiCallInProgress = false;
    return data.data;
  }
};

const baseApi = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 5000,
  withCredentials: true,
  headers: {
    ContentType: "Application/json",
  },
});

baseApi.interceptors.request.use(
  async (config) => {
    const access = getLocalStorageItem("access-x") as string;
    const token = decryptData(access);

    config.headers = new AxiosHeaders({
      Authorization: `Bearer ${token}`,
    });
    return config;
  },
  (error) => Promise.reject(error)
);

baseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401 && !sameApiCallInProgress) {
      try {
        const { accessToken, refreshToken } = await handleRefreshToken();

        const ac = encryptData(accessToken);
        const rf = encryptData(refreshToken);
        localStorage.setItem("access-x", ac);
        localStorage.setItem("refresh-x", rf);
        const originalRequest = error.config;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default baseApi;
