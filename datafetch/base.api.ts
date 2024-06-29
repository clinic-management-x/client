import config from "@/utils/config";
import axios from "axios";

const baseApi = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 5000, // Timeout if necessary
  withCredentials: true,
  headers: {
    ContentType: "Application/json",
    Authorization: `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjdhYzNmNmFhYmQwYmIzZGViZjI0ODQiLCJ1c2VybmFtZSI6ImNoYXJsaWVAZ21haWwuY29tIiwiZW1haWwiOiJjaGFybGllQGdtYWlsLmNvbSIsIm5vbmNlIjoiNzAxZDlhYzYtNDYxYS00MTgzLWIyY2EtZTJiMmU0MjgzYTk3IiwiaWF0IjoxNzE5NTg4NzUxLCJleHAiOjE3MjczNjQ3NTF9.5ZE8SKAiFepHUAyedbfLnfd8F57nhISXbMrUruGdlRo`}`,
  },
});

export default baseApi;
