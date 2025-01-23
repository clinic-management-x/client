"use client";
import { insertHasClinic } from "@/redux/slices/user";
import { getLocalStorageItem } from "@/utils/storageItem";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Main = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const canAccess = getLocalStorageItem("access-x");
  const clinicState = getLocalStorageItem("clinic");

  useEffect(() => {
    if (!canAccess) {
      router.push("/login");
    } else if (clinicState === null || clinicState === "absent") {
      router.push("/backoffice/account");
    } else {
      router.push("/backoffice/doctors");
    }
    if (clinicState !== "absent") {
      dispatch(insertHasClinic(true));
    } else {
      dispatch(insertHasClinic(false));
    }
  }, [canAccess, clinicState]);
  return <div></div>;
};

export default Main;
