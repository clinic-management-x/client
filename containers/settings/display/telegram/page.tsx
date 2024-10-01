"use client";
import { FormControlLabel, FormGroup, Switch, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaTelegram } from "react-icons/fa";
import Guide from "./guide";
import AddButton from "@/components/buttons/AddButton/page";
import CreateGroup from "./create";
import useSWR from "swr";
import config from "@/utils/config";
import { telegramEndPoint } from "@/utils/endpoints";
import {
  deleteTelegramInfo,
  getAllTelegramInfo,
  updateTelegramInfo,
} from "@/datafetch/messaging/messaging.api";
import LabelTypography from "@/components/typography/LabelTypography/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import CrossCheckButtonsGroup from "@/components/buttons/CrossCheckButtons/page";
import TrashButton from "@/components/buttons/TrashButton/page";
import DeleteDialog from "@/components/dialogs/delete";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import { updateClinic } from "@/datafetch/clinic/clinic.api";

interface Props {
  clinic: ClinicType | null;
  setClinic: (data: ClinicType | null) => void;
}

const Telegram = ({ clinic, setClinic }: Props) => {
  const [openGuide, setOpenGuide] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [telegramInfos, setTelegramInfos] = useState<TelegramInfo[]>([]);
  const [telegramInfoToEdit, setTelegramInfoToEdit] = useState<{
    _id: string;
    groupId: string;
  }>({
    _id: "",
    groupId: "",
  });
  const [telegramInfoIdToDelete, setTelegramInfoIdToDelete] = useState<{
    supplier: string;
    _id: string;
    groupId: string;
  }>({
    supplier: "",
    _id: "",
    groupId: "",
  });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const { data, mutate: teleMutate } = useSWR(
    `${config.apiBaseUrl}/${telegramEndPoint}`,
    getAllTelegramInfo
  );

  const { trigger, isMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${telegramEndPoint}/${telegramInfoToEdit._id}`,
    updateTelegramInfo
  );

  const { trigger: enableTrigger } = useSWRMutation(
    `${config.apiBaseUrl}/clinics`,
    updateClinic
  );

  useEffect(() => {
    if (data) {
      setTelegramInfos(data);
    }
  }, [data]);

  return (
    <div className=" mx-4 md:ml-6 mt-4">
      <div className="flex items-center justify-between">
        <div className=" flex items-center space-x-2">
          <FaTelegram size={24} className="text-[#3AABE1]" />
          <Typography
            variant="h6"
            className="font-bold text-whiteText dark:text-darkText"
          >
            Telegram
          </Typography>
        </div>
        <Typography
          className="underline cursor-pointer mr-6 text-primaryBlue-300 "
          onClick={() => {
            setOpenGuide(true);
          }}
        >
          Setup Guide?
        </Typography>
      </div>
      <FormGroup className="mt-4">
        <FormControlLabel
          control={
            <Switch
              checked={clinic ? clinic.enableTelegram : false}
              onChange={async (e) => {
                try {
                  const data = await enableTrigger({
                    enableTelegram: e.target.checked,
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
              Enable Telegram Messaging
            </Typography>
          }
        />
        <Typography variant="caption" className="text-primaryBlue-300">
          If you want to send telegram messages to the supplier when an order is
          made, please enable this.
        </Typography>
      </FormGroup>
      <Typography className=" mt-4 font-semibold text-whiteText dark:text-darkText ">
        Groups
      </Typography>
      {telegramInfos.length ? (
        <div>
          <div className="flex items-center space-x-16 mt-2">
            <LabelTypography title="Supplier Name" />
            <LabelTypography title="Group Id" />
          </div>
          {telegramInfos.map((tinfo) => (
            <div
              key={tinfo._id}
              className={`flex items-center ${
                telegramInfoToEdit._id === tinfo._id
                  ? "flex-col  space-y-2 md:space-y-0 md:flex-row"
                  : ""
              } text-whiteText dark:text-darkText my-2 space-x-2`}
            >
              <div className="flex items-center space-x-2">
                <div className="w-[150px] h-[56px] border-[1px] border-primaryBlue-300 pl-3 pt-3 rounded-md">
                  {tinfo.supplierId.name}
                </div>
                <CustomTextField
                  value={"" + tinfo.groupId}
                  handleChange={(e) => {
                    setTelegramInfos(
                      telegramInfos.map((info) => {
                        if (info._id === tinfo._id) {
                          return { ...info, groupId: e.target.value };
                        } else {
                          return info;
                        }
                      })
                    );
                    setTelegramInfoToEdit({
                      _id: tinfo._id as string,
                      groupId: e.target.value,
                    });
                  }}
                  className="w-[150px]"
                />
              </div>
              {telegramInfoToEdit._id === tinfo._id ? (
                <div>
                  <CrossCheckButtonsGroup
                    handleCancel={() => {
                      setTelegramInfos(data);
                      setTelegramInfoToEdit({ _id: "", groupId: "" });
                    }}
                    handleAdd={async () => {
                      try {
                        const updatedData = await trigger({
                          groupId: telegramInfoToEdit.groupId,
                        });
                        if (updatedData) {
                          teleMutate();
                          setTelegramInfoToEdit({
                            _id: "",
                            groupId: "",
                          });
                          toast.success("Successfully updated.");
                        }
                      } catch (error) {
                        toast.error("Something went wrong");
                      }
                    }}
                    isLoading={isMutating}
                  />
                </div>
              ) : (
                <TrashButton
                  handleClick={() => {
                    setTelegramInfoIdToDelete({
                      supplier: tinfo.supplierId.name,
                      _id: tinfo._id as string,
                      groupId: "" + tinfo.groupId,
                    });
                  }}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
      {openCreate ? (
        <CreateGroup setOpenCreate={setOpenCreate} mutate={teleMutate} />
      ) : (
        <></>
      )}
      <AddButton
        handleClick={() => {
          setOpenCreate(true);
        }}
      />
      {openGuide ? (
        <Guide
          open={openGuide}
          handleClose={() => {
            setOpenGuide(false);
          }}
        />
      ) : (
        <></>
      )}
      <DeleteDialog
        open={telegramInfoIdToDelete._id !== ""}
        handleClose={() => {
          setTelegramInfoIdToDelete({ supplier: "", _id: "", groupId: "" });
        }}
        text={`telegram group: ${telegramInfoIdToDelete.supplier} with groupId ${telegramInfoIdToDelete.groupId}`}
        handleDelete={async () => {
          try {
            setDeleteLoading(true);
            const data = await deleteTelegramInfo(
              `${config.apiBaseUrl}/${telegramEndPoint}/${telegramInfoIdToDelete._id}`
            );
            if (data) {
              teleMutate();
              setDeleteLoading(false);
              setTelegramInfoIdToDelete({ supplier: "", _id: "", groupId: "" });
              toast.success("Successfully deleted.");
            }
          } catch (error) {
            toast.error("Something was wrong.");
            setDeleteLoading(false);
          }
        }}
        loading={deleteLoading}
      />
    </div>
  );
};

export default Telegram;
