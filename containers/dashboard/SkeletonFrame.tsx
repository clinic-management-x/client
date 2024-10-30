import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonFrame = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:ml-8">
      <Skeleton className="w-full md:w-[80%] h-[300px]"></Skeleton>
      <Skeleton className="w-full md:w-[80%] h-[300px]"></Skeleton>
      <Skeleton className="w-full md:w-[80%] h-[300px]"></Skeleton>
      <Skeleton className="w-full md:w-[80%] h-[300px]"></Skeleton>
    </div>
  );
};

export default SkeletonFrame;
