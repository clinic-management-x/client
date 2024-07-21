"use client";

import CustomTextField from "@/components/input/CustomTextField/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import { createClinic } from "@/datafetch/clinic/clinic.api";
import { insertHasClinic } from "@/redux/slices/user";
import config from "@/utils/config";
import { clinicEndPoint } from "@/utils/endpoints";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import useSWRMutation from "swr/mutation";

const ClinicDataPage = () => {
  const dispatch = useDispatch();
  const [clinicName, setClinicName] = useState("");

  const { trigger, isMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${clinicEndPoint}`,
    createClinic
  );

  return (
    <section className="flex flex-col overflow-y-scroll">
      <Box
        sx={{
          mb: 40,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="flex flex-col items-start justify-start mt-20 md:mt-6">
          <Typography
            variant="h5"
            className="text-whiteText dark:text-darkText mb-4"
          >
            Clinic
          </Typography>
          <LabelTypography title="Name" />
          <div className="w-[300px]">
            <CustomTextField
              value={clinicName}
              handleChange={(e) => {
                setClinicName(e.target.value);
              }}
              type=""
              className="w-full"
            />
          </div>
          <Button
            className="w-[300px] mt-8 h-[50px]"
            variant="contained"
            onClick={async () => {
              try {
                const data = await trigger({ name: clinicName });
                if (data) {
                  dispatch(insertHasClinic(true));
                  localStorage.setItem("clinic", "present");
                  toast.success("Successfully created.");
                }
              } catch (error) {
                console.log("error", error);
                toast.error("Something went wrong.");
              }
            }}
          >
            {isMutating ? (
              <CircularProgress color="inherit" size={30} />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </Box>
    </section>
  );
};

export default ClinicDataPage;
