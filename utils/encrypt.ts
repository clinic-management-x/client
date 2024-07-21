import CryptoJS, { AES } from "crypto-js";
import config from "./config";

export const encryptData = (data: string): string => {
  const encryptedData = AES.encrypt(data, config.ecKey).toString();
  return encryptedData;
};

export const decryptData = (encryptedData: string): string => {
  const decryptedData = AES.decrypt(encryptedData, config.ecKey).toString(
    CryptoJS.enc.Utf8
  );

  return decryptedData;
};
