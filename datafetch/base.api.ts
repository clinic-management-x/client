import config from "@/utils/config";
import axios from "axios";

const baseApi = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 5000, // Timeout if necessary
  withCredentials: true,
  headers: {
    ContentType: "Application/json",
    Authorization: `Bearer ${`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjdhYzNmNmFhYmQwYmIzZGViZjI0ODQiLCJ1c2VybmFtZSI6ImNoYXJsaWVAZ21haWwuY29tIiwiZW1haWwiOiJjaGFybGllQGdtYWlsLmNvbSIsIm5vbmNlIjoiOTljZThhN2YtODEwNy00MjkwLWFlNmYtYWQ2ODBlN2E1YmQ1IiwiaWF0IjoxNzIwOTQzNzMzLCJleHAiOjE3MjA5NDczMzN9.vxf-hBUinHksbLczj9IfuoYbh_Ed55zVw0HS3JVDBkM`}`,
  },

  data: {
    clinic: {
      _id: "667acfe354f68c44290b24cc",
    },
  },
});

export default baseApi;
