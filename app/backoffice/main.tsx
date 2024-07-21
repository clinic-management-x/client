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
    } else {
      router.push("/backoffice/doctors");
    }
    if (clinicState !== "absent") {
      dispatch(insertHasClinic(true));
    } else {
      dispatch(insertHasClinic(false));
    }
  }, [canAccess]);
  return <div></div>;
};

export default Main;
