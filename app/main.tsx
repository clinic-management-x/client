"use client";
import { getLocalStorageItem } from "@/utils/storageItem";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Main = () => {
  const router = useRouter();
  const access = getLocalStorageItem("access-x");

  useEffect(() => {
    if (!access) {
      router.push("/login");
    } else {
      router.push("/backoffice");
    }
  }, [access]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-between bg-white dark:bg-black"></div>
  );
};

export default Main;
