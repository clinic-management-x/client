import { updateClinic } from "@/datafetch/clinic/clinic.api";
import config from "@/utils/config";
import { FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import { LiaSmsSolid } from "react-icons/lia";
import useSWRMutation from "swr/mutation";

interface Props {
  clinic: ClinicType | null;
  setClinic: (data: ClinicType | null) => void;
}

const SMS = ({ clinic, setClinic }: Props) => {
  const { trigger: enableTrigger } = useSWRMutation(
    `${config.apiBaseUrl}/clinics`,
    updateClinic
  );
  return (
    <div className="mx-4 md:ml-10 mt-4">
      <div className="flex items-center justify-between">
        <div className=" flex items-center space-x-2">
          <LiaSmsSolid size={24} className="text-[#3AABE1]" />
          <Typography
            variant="h6"
            className="font-bold text-whiteText dark:text-darkText"
          >
            SMS
          </Typography>
        </div>
      </div>
      <FormGroup className="mt-4">
        <FormControlLabel
          control={
            <Switch
              checked={clinic ? clinic.enableSMS : false}
              onChange={async (e) => {
                try {
                  const data = await enableTrigger({
                    enableSMS: e.target.checked,
                  });
                  if (data) {
                    setClinic(data);
                    toast.success("Successfully updated");
                  }
                } catch (error) {
                  toast.error("Something went wrong.");
                }
              }}
            />
          }
          label={
            <Typography className="text-whiteText dark:text-darkText">
              Enable SMS Messaging
            </Typography>
          }
        />
        <Typography variant="caption" className="text-primaryBlue-300">
          If you want to send SMS messages to the supplier when an order is
          made, please enable this.
        </Typography>
      </FormGroup>
    </div>
  );
};

export default SMS;
