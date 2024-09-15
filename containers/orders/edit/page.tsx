"use client";
import BackButton from "@/components/buttons/BackButton/page";
import {
  checkOverlapBatchId,
  deleteOrder,
  getOrder,
  updateOrder,
} from "@/datafetch/orders/orders.api";
import config from "@/utils/config";
import { orderEndPoint } from "@/utils/endpoints";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import SkeletonFrame from "./skeleton";
import {
  defaultOrderData,
  orderStatus,
  paymentMethods,
} from "@/utils/staticData";
import LabelTypography from "@/components/typography/LabelTypography/page";
import CustomTextField from "@/components/input/CustomTextField/page";
import CheckTextField from "@/components/input/CheckTextField/page";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";
import dayjs from "dayjs";
import RadioGroupSelector from "@/components/input/RadioGroup/page";
import DeleteMajorInfo from "@/components/dialogs/delete/DeleteMajorInfo";
import OrderItemsDisplay from "@/components/dialogs/orders/OrderItemDisplay/page";
import OrderItemCreate from "@/components/dialogs/orders/OrderItem/page";
import AddButton from "@/components/buttons/AddButton/page";
import DetailEditCancelButton from "@/components/buttons/DetailEditCancelButton/page";
import OrderTradeInfo from "./orderTradeInfo";

const EditOrder = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [orderInfo, setOrderInfo] = useState<OrderType>(defaultOrderData);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [batchIdLoading, setBatchIdLoading] = useState(false);
  const [showOrderItemCreate, setShowOrderitemCreate] = useState(false);
  const [openDeleteOrderDialog, setOpenDeleteOrderDialog] = useState(false);
  const [showEditBatchId, setShowEditBatchId] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { data, mutate, isLoading } = useSWR(
    `${config.apiBaseUrl}/${orderEndPoint}/${id}`,
    getOrder
  );

  const { trigger: batchIdTrigger } = useSWRMutation(
    `${config.apiBaseUrl}/${orderEndPoint}/search`,
    checkOverlapBatchId
  );
  const { trigger, isMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${orderEndPoint}/${id}`,
    updateOrder
  );

  useEffect(() => {
    if (data) {
      setOrderInfo(data);
    }
  }, [data]);

  const updateOrderInfo = async (keyname: string) => {
    try {
      const payload = {
        [keyname]: orderInfo[keyname as keyof OrderUpdateType],
      };
      const data = await trigger(payload);
      if (data) {
        toast.success("Successfully updated");
        setOrderInfo({
          ...orderInfo,
          [keyname]: orderInfo[keyname as keyof OrderUpdateType],
        });
        setShowEditBatchId(false);
      }
    } catch (error) {
      if (keyname !== "batchId") toast.error("Something went wrong.");
    }
  };

  return (
    <section className="flex flex-col  ">
      <Box sx={{ mb: 50 }}>
        <BackButton
          handleClick={() => {
            router.push("/backoffice/inventory/orders");
          }}
        />
        {isLoading ? (
          <SkeletonFrame />
        ) : (
          <div className="flex flex-col  md:ml-14  ">
            <div className="flex flex-col mx-2  md:w-[300px]  mb-2">
              <LabelTypography title="BatchId" />

              <div className="relative">
                <CheckTextField
                  value={orderInfo.batchId}
                  handleChange={(e) => {
                    setShowEditBatchId(true);
                    setOrderInfo({ ...orderInfo, batchId: e.target.value });
                  }}
                  className="w-full md:w-[300px]"
                  alreadyExist={alreadyExist}
                  handleBlur={async () => {
                    try {
                      setBatchIdLoading(true);
                      const isAlreadyExist = await batchIdTrigger({
                        batchId: orderInfo.batchId,
                        isEdit: true,
                        _id: id,
                      });

                      if (isAlreadyExist) {
                        setAlreadyExist(isAlreadyExist);
                        toast.error("Batch Id must be unique.");
                      } else {
                        setAlreadyExist(false);
                      }
                      setBatchIdLoading(false);
                    } catch (error) {
                      setBatchIdLoading(false);
                      toast.error("Something went wrong");
                    }
                  }}
                />
                {batchIdLoading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "10%",
                      marginTop: "-12px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </div>
              <DetailEditCancelButton
                show={showEditBatchId}
                handleCancel={() => {
                  setAlreadyExist(false);
                  setOrderInfo({ ...orderInfo, batchId: data?.batchId });
                  setShowEditBatchId(false);
                }}
                handleUpdate={() => {
                  updateOrderInfo("batchId");
                }}
                loading={isLoading}
              />
            </div>
            <div className="flex flex-col mx-2 md:w-[300px] mb-2">
              <LabelTypography title="Suppliers" />
              <CustomTextField
                value={(orderInfo.supplier as SupplierCompanyType).name}
                handleChange={() => {
                  toast.error(
                    "Supplier name can't be changed once it is created."
                  );
                }}
              />
            </div>
            <div className="flex flex-col mx-2 md:w-[300px]  mb-2">
              <LabelTypography title="Estimate Date of Arrival" />
              <CustomTextField
                value={dayjs(orderInfo.estimateDate).format("DD-MM-YYYY")}
                handleChange={() => {
                  toast.error(
                    "Estimate date can't be changed once it is created."
                  );
                }}
              />
            </div>
            <div className="flex flex-col mx-2 mb-2">
              <LabelTypography title="Order Items" />
              <OrderItemsDisplay
                orderInfo={orderInfo}
                setOrderInfo={setOrderInfo}
                edit={true}
                id={id}
              />
              {showOrderItemCreate ? (
                <OrderItemCreate
                  setShowOrderitemCreate={setShowOrderitemCreate}
                  orderInfo={orderInfo}
                  setOrderInfo={setOrderInfo}
                  edit={true}
                  id={id}
                />
              ) : (
                <></>
              )}

              <div
                className={`${
                  showOrderItemCreate || orderInfo.hasAlreadyArrived
                    ? "hidden"
                    : "ml-2"
                }`}
              >
                <AddButton
                  handleClick={() => {
                    setShowOrderitemCreate(true);
                  }}
                />
              </div>
            </div>
            <OrderTradeInfo
              orderInfo={orderInfo}
              setOrderInfo={setOrderInfo}
              data={data}
              trigger={trigger}
              isLoading={isMutating}
            />

            <Typography
              className="text-slate-500 dark:text-darkText underline ml-2  mt-10"
              onClick={() => {
                setOpenDeleteOrderDialog(true);
              }}
            >
              Delete Order
            </Typography>
          </div>
        )}
        <DeleteMajorInfo
          open={openDeleteOrderDialog}
          handleClose={() => {
            setOpenDeleteOrderDialog(false);
          }}
          handleDelete={async () => {
            try {
              setDeleteLoading(true);
              const data = await deleteOrder(
                `${config.apiBaseUrl}/${orderEndPoint}/${id}`
              );
              if (data) {
                setDeleteLoading(false);
                setOpenDeleteOrderDialog(false);
                toast.success("Successfully deleted.");
                router.push("/backoffice/inventory/orders");
              }
            } catch (error) {
              setDeleteLoading(false);
              toast.error("Something went wrong");
            }
          }}
          loading={deleteLoading}
          text1="order"
          text2="Deleting the order will remove all of the order's information from
          our databse.This cannot be undone."
        />
      </Box>
    </section>
  );
};

export default EditOrder;
