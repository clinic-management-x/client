import { Skeleton } from "@mui/material";
import React from "react";

const SkeletonFrame = () => {
  return (
    <div className="flex flex-col md:w-[300px] ml-4 space-y-4 md:ml-14 w-full">
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={50}
        sx={{ borderRadius: 2 }}
      />
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={50}
        sx={{ borderRadius: 2 }}
      />
      <Skeleton
        variant="rectangular"
        width={"100%"}
        height={50}
        sx={{ borderRadius: 2 }}
      />
    </div>
  );
};

export default SkeletonFrame;
