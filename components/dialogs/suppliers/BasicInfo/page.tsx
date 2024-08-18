import CustomTextField from "@/components/input/CustomTextField/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { Box } from "@mui/material";
import React from "react";

interface Props {
  basicSupplierInfo: SupplierType;
  setBasicSupplierInfo: (data: SupplierType) => void;
  setShowEditBox?: (data: boolean) => void;
  edit?: boolean;
}

const BasicSupplierInfo = ({
  basicSupplierInfo,
  setBasicSupplierInfo,
  setShowEditBox,
  edit,
}: Props) => {
  return (
    <Box
      className={`w-full  ${
        edit ? "md:w-[100%] md:mt-0 lg:mt-2 lg:w-[70%] mt-0" : "md:w-[70%] mt-4"
      } mr-2`}
    >
      {" "}
      <Box className="  flex flex-col   md:grid md:grid-cols-2 gap-2 mt-2">
        <div className="flex flex-col mx-2">
          <LabelTypography title=" Name" />
          <CustomTextField
            value={basicSupplierInfo.name}
            handleChange={(e) => {
              setBasicSupplierInfo({
                ...basicSupplierInfo,
                name: e.target.value,
              });
              setShowEditBox && setShowEditBox(true);
            }}
          />
        </div>
        <div className="flex flex-col mx-2">
          <LabelTypography title="Address" />
          <CustomTextField
            value={basicSupplierInfo.address || ""}
            handleChange={(e) => {
              setBasicSupplierInfo({
                ...basicSupplierInfo,
                address: e.target.value,
              });
              setShowEditBox && setShowEditBox(true);
            }}
          />
        </div>
      </Box>
      <Box className="  flex flex-col   md:grid md:grid-cols-2 gap-2 mt-2 md:mt-8">
        <div className="flex flex-col mx-2">
          <LabelTypography title=" Phone Number" />
          <CustomTextField
            value={basicSupplierInfo.mobile}
            type="mobile"
            handleChange={(e) => {
              if (isNaN(e.target.value)) return;
              setBasicSupplierInfo({
                ...basicSupplierInfo,
                mobile: e.target.value,
              });
              setShowEditBox && setShowEditBox(true);
            }}
          />
        </div>
        <div className="flex flex-col mx-2 ">
          <LabelTypography title="Email" />
          <CustomTextField
            value={basicSupplierInfo.email}
            handleChange={(e) => {
              setBasicSupplierInfo({
                ...basicSupplierInfo,
                email: e.target.value,
              });
              setShowEditBox && setShowEditBox(true);
            }}
          />
        </div>
      </Box>
    </Box>
  );
};

export default BasicSupplierInfo;
