"use client";

import {
  createAlert,
  getAlerts,
  updateAlert,
} from "@/datafetch/alert/alert.api";
import config from "@/utils/config";
import { alertEndPoint } from "@/utils/endpoints";
import { defaultAlertData } from "@/utils/staticData";
import { Box, FormControlLabel, FormGroup, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const AlertDataPage = () => {
  const [alertDataArray, setAlertDataArray] =
    useState<DefaultAlertData[]>(defaultAlertData);

  const { data, isLoading, mutate } = useSWR(
    `${config.apiBaseUrl}/${alertEndPoint}`,
    getAlerts
  );

  const { trigger: create } = useSWRMutation(
    `${config.apiBaseUrl}/${alertEndPoint}`,
    createAlert
  );
  const { trigger: update } = useSWRMutation(
    `${config.apiBaseUrl}/${alertEndPoint}`,
    updateAlert
  );

  useEffect(() => {
    if (data) {
      setAlertDataArray(
        alertDataArray.map((datainside) => {
          const foundAlertData = data.find(
            (dataalert: Alert) => dataalert.type === datainside.type
          );
          if (foundAlertData) {
            return {
              ...datainside,
              _id: foundAlertData._id,
              enable: foundAlertData.enable,
              days: foundAlertData.days,
            };
          } else {
            return datainside;
          }
        })
      );
    }
  }, [data]);

  const handleChange = async (_id: string) => {
    const dataToUpdate = alertDataArray.find((dataa) => dataa._id === _id);

    if (dataToUpdate) {
      try {
        const data =
          _id.length > 1
            ? await update({
                _id: dataToUpdate._id,
                enable: !dataToUpdate.enable,
                days: dataToUpdate.days,
                type: dataToUpdate.type,
              })
            : await create({
                _id: dataToUpdate._id,
                enable: !dataToUpdate.enable,
                days: dataToUpdate.days,
                type: dataToUpdate.type,
              });
        if (data) {
          toast.success("Successfully updated.");
          setAlertDataArray(
            alertDataArray.map((datainside) => {
              if (datainside._id === data._id) {
                return {
                  ...datainside,
                  _id: data._id,
                  days: data.days,
                  enable: data.enable,
                };
              } else {
                return datainside;
              }
            })
          );
        }
      } catch (error) {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <section className="flex flex-col overflow-y-scroll w-full">
      <Box sx={{ mb: 40 }}>
        <div className="flex flex-col w-full   mt-8 pl-14">
          {alertDataArray.map((dataitem) => (
            <div key={dataitem._id} className="mb-8">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={dataitem.enable}
                      onChange={() => handleChange(dataitem._id)}
                    />
                  }
                  label={dataitem.name}
                  className="dark:text-darkText text-whiteText"
                />
              </FormGroup>
            </div>
          ))}
        </div>
      </Box>
    </section>
  );
};

export default AlertDataPage;
