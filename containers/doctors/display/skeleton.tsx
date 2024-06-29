import { Divider } from "@mui/material";
import React from "react";
import { Skeleton } from "@mui/material";

const SkeletonFrame = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <div
          className=" w-full h-auto bg-gray-100 relative dark:bg-[#3C3C3C]  rounded-lg flex flex-col "
          key={num}
        >
          <div className="h-[130px] w-full">
            <Skeleton
              variant="circular"
              width={100}
              height={100}
              className="m-auto mt-2"
            />
          </div>
          <Divider />
          <div className="flex flex-col mx-2 text-gray-600 space-y-3 my-3">
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonFrame;
