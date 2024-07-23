import React from "react";
import Image from "next/image";
import { Divider, Typography } from "@mui/material";

const defaultAvatar = require("../../../public/defaultAvatar.jpg");

interface Props {
  staff: StaffType;
}

const StaffCard = ({ staff }: Props) => {
  return (
    <div className=" w-full h-auto bg-gray-100 relative dark:bg-[#3C3C3C] rounded-lg flex flex-col">
      <div className="h-[130px] w-full">
        <div className="w-[100px] h-[100px] object-scale-down m-auto mt-2 rounded-full">
          <Image
            src={staff.avatarUrl ? staff.avatarUrl : defaultAvatar}
            alt=""
            width={150}
            height={150}
            className="w-[100px] h-[100px] rounded-full"
          />
        </div>
      </div>
      <Divider />
      <div className="flex flex-col ml-2 md:ml-6 text-gray-600 dark:text-gray-300 space-y-3 my-3">
        <Typography>{staff.name}</Typography>

        <Typography>{staff.mobile}</Typography>
      </div>
    </div>
  );
};

export default StaffCard;
