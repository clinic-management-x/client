import config from "@/utils/config";
import axios from "axios";

const createAccApi = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 5000, // Timeout if necessary
  withCredentials: true,
  headers: {
    ContentType: "Application/json",
  },
});

export default createAccApi;
