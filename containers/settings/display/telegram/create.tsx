"use client";
import CrossCheckButtonsGroup from "@/components/buttons/CrossCheckButtons/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import LabelTypography from "@/components/typography/LabelTypography/page";
import {
  createTelegramInfo,
  getAllTelegramInfo,
} from "@/datafetch/messaging/messaging.api";
import { getSuppliersList } from "@/datafetch/supplier/supplier.api";
import { getClinicId, getUserData } from "@/redux/slices/user";
import config from "@/utils/config";
import { supplierEndPoint, telegramEndPoint } from "@/utils/endpoints";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

interface Props {
  setOpenCreate: (data: boolean) => void;
  mutate: any;
}

interface DefaultDataProps {
  supplierId: string;
  clinicId: string;
  groupId: string;
}
const defaultData: DefaultDataProps = {
  supplierId: "",
  clinicId: "",
  groupId: "",
};
const CreateGroup = ({ setOpenCreate, mutate }: Props) => {
  const clinicId = useSelector(getClinicId);
  const user = useSelector(getUserData);
  const [telegramData, setTelegramData] =
    useState<DefaultDataProps>(defaultData);
  const [suppliers, setSuppliers] = useState<{ _id: string; name: string }[]>(
    []
  );

  const [enableTelegramMessaging, setEnableTelegramMessaging] = useState(false);

  const { data: supplierLists } = useSWR(
    `${config.apiBaseUrl}/${supplierEndPoint}/list`,
    getSuppliersList
  );

  const { trigger } = useSWRMutation(
    `${config.apiBaseUrl}/${telegramEndPoint}`,
    createTelegramInfo
  );

  useEffect(() => {
    if (supplierEndPoint) {
      setSuppliers(supplierLists);
    }
  }, [supplierLists]);

  return (
    <div className="flex items-center space-x-3 my-4">
      <div className="flex flex-col mx-2 md:w-[250px] ">
        <LabelTypography title="Suppliers" />
        <PlainSelector
          dataArr={suppliers}
          title=""
          handleChange={(e, value) => {
            setTelegramData({
              ...telegramData,
              supplierId: e.target.value,
              clinicId: clinicId,
            });
          }}
          selectedValue={telegramData.supplierId}
        />
      </div>
      <div className="flex flex-col">
        <LabelTypography title="Group Id" />
        <CustomTextField
          value={telegramData.groupId}
          handleChange={(e) => {
            setTelegramData({
              ...telegramData,
              groupId: e.target.value,
            });
          }}
        />
      </div>
      <div className="mt-5">
        <CrossCheckButtonsGroup
          handleCancel={() => {
            setOpenCreate(false);
          }}
          handleAdd={async () => {
            try {
              const data = await trigger(telegramData);
              if (data) {
                mutate();
                setOpenCreate(false);
                toast.success("Successfully created.");
              }
            } catch (error) {
              toast.error("Something went wrong.");
            }
          }}
        />
      </div>
    </div>
  );
};

export default CreateGroup;
