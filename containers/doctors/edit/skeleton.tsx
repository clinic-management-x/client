import { Box, Skeleton } from "@mui/material";
import React from "react";

const SkeletonPage = () => {
  return (
    <Box className="flex flex-col w-full  md:flex-col lg:flex-row md:items-center md:justify-center lg:justify-start lg:items-start">
      <Box className="relative w-full md:w-[30%] flex items-center justify-center mb-4 lg:mt-8">
        <Skeleton variant="rectangular" width={300} height={100} />
      </Box>

      <Box
        className={`w-full  md:w-[100%] md:mt-0 lg:mt-2 lg:w-[70%] mt-0 mx-2`}
      >
        <Box className="  flex flex-col   md:grid md:grid-cols-3 gap-2">
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
        </Box>
        <Box className="  flex flex-col   md:grid md:grid-cols-2 gap-2 mt-2">
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
        </Box>
        <Box className="  flex flex-col   md:grid md:grid-cols-2 gap-2 mt-2">
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
        </Box>
      </Box>
    </Box>
  );
};

export default SkeletonPage;
