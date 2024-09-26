"use client";

import CrossCheckButtonsGroup from "@/components/buttons/CrossCheckButtons/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import {
  createAlert,
  getAlerts,
  updateAlert,
} from "@/datafetch/alert/alert.api";
import config from "@/utils/config";
import { alertEndPoint } from "@/utils/endpoints";
import { defaultAlertData } from "@/utils/staticData";
import {
  Box,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const AlertDataPage = () => {
  const [alertDataArray, setAlertDataArray] =
    useState<DefaultAlertData[]>(defaultAlertData);
  const [editId, setEditId] = useState("");

  const { data } = useSWR(`${config.apiBaseUrl}/${alertEndPoint}`, getAlerts);

  const { trigger: create } = useSWRMutation(
    `${config.apiBaseUrl}/${alertEndPoint}`,
    createAlert
  );
  const { trigger: update, isMutating } = useSWRMutation(
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
                enable: editId ? dataToUpdate.enable : !dataToUpdate.enable,
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
          setEditId("");
        }
      } catch (error) {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <section className="flex flex-col overflow-y-scroll w-full">
      <Box sx={{ mb: 20 }}>
        <div className="flex flex-col w-full mt-28  md:mt-8  justify-center pl-4 md:pl-14">
          {alertDataArray.map((dataitem) => (
            <div key={dataitem._id} className="mb-8 flex flex-col ">
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
              {dataitem.enable ? (
                <div className="flex flex-col">
                  <Typography
                    variant="caption"
                    className="text-whiteText dark:text-darkText"
                  >
                    {dataitem.description}
                  </Typography>
                  <div className="mt-2 flex ">
                    <CustomTextField
                      className="w-[100px] mr-4"
                      type="number"
                      value={dataitem.days}
                      handleChange={(e) => {
                        setEditId(dataitem._id);
                        setAlertDataArray(
                          alertDataArray.map((datainside) => {
                            if (datainside._id === dataitem._id) {
                              return { ...datainside, days: +e.target.value };
                            } else {
                              return datainside;
                            }
                          })
                        );
                      }}
                    />
                    {editId === dataitem._id ? (
                      <CrossCheckButtonsGroup
                        handleCancel={() => {
                          setEditId("");
                          setAlertDataArray(
                            alertDataArray.map((datainside) => {
                              const foundAlertData = data.find(
                                (dataalert: Alert) =>
                                  dataalert.type === datainside.type
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
                        }}
                        handleAdd={() => handleChange(editId)}
                        isLoading={isMutating}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </Box>
    </section>
  );
};

export default AlertDataPage;
