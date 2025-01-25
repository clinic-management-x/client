import TrashButton from "@/components/buttons/TrashButton/page";
import {
  deleteOrderItem,
  updateOrderItem,
} from "@/datafetch/orders/orders.api";
import config from "@/utils/config";
import { orderEndPoint } from "@/utils/endpoints";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import useSWRMutation from "swr/mutation";
import DeleteDialog from "../../delete/index";
import toast from "react-hot-toast";
import EditButton from "@/components/buttons/EditButton/page";
import { RxCross2 } from "react-icons/rx";
import { MdCheck } from "react-icons/md";
import CustomTextField from "@/components/input/CustomTextField/page";
import PlainSelector from "@/components/selectors/PlainSelector/page";
import { buySellUnits } from "@/utils/staticData";

interface Props {
  orderInfo: OrderType;
  setOrderInfo: (data: OrderType) => void;
  edit?: boolean;
  id?: string;
}

const OrderItemsDisplay = ({ orderInfo, setOrderInfo, edit, id }: Props) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [orderItemIdToDelete, setOrderItemIdToDelete] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [orderItemToUpdate, setOrderItemToUpdate] =
    useState<OrderItemType | null>(null);
  const { trigger } = useSWRMutation(
    `${config.apiBaseUrl}/${orderEndPoint}/order-item/${orderItemIdToDelete}?id=${id}`,
    deleteOrderItem
  );

  const { trigger: updateTrigger, isMutating } = useSWRMutation(
    `${config.apiBaseUrl}/${orderEndPoint}/order-item/${id}`,
    updateOrderItem
  );

  return (
    <div>
      {orderInfo?.orderItems?.map((orderitem: OrderItemType, i) => {
        return (
          <div className="flex items-center mb-2">
            {orderItemToUpdate ? (
              <div className="flex items-center space-x-2">
                <Box className="w-[150px] border-[1px] h-[57px] text-center pt-4 rounded-md border-[#9CA3AF] text-whiteText dark:text-darkText">
                  {
                    (
                      orderItemToUpdate.itemName as {
                        _id: string;
                        brandName: string;
                      }
                    ).brandName
                  }
                </Box>
                <div className="w-[150px]">
                  <CustomTextField
                    value={orderItemToUpdate?.quantity as number}
                    handleChange={(e) => {
                      if (orderInfo.hasAlreadyArrived) {
                        return toast.error(
                          "Quantity cannot be changed after arrival."
                        );
                      }
                      setOrderItemToUpdate({
                        ...orderItemToUpdate,
                        quantity: +e.target.value,
                      });
                    }}
                    type="number"
                  />
                </div>
                <div className="w-[100px]">
                  <PlainSelector
                    dataArr={buySellUnits}
                    title=""
                    handleChange={(e, value) => {
                      const selectedUnit = buySellUnits.find(
                        (unit) => unit._id === e.target.value
                      );
                      setOrderItemToUpdate({
                        ...orderItemToUpdate,
                        unit: selectedUnit?.name as string,
                      });
                    }}
                    selectedValue={
                      buySellUnits.find(
                        (selldata) => selldata.name === orderItemToUpdate?.unit
                      )?._id
                    }
                  />
                </div>
              </div>
            ) : (
              <div
                key={i}
                className="flex items-center px-2 w-[240px] md:w-[300px] h-[50px] border-[1px] rounded border-[#9CA3AF] space-x-2"
              >
                <Typography
                  variant="body1"
                  className="dark:text-darkText text-whiteText"
                >
                  {(orderitem.itemName as ItemNameType).brandName}
                  {", "}
                  {orderitem.quantity} {orderitem.unit}
                </Typography>
              </div>
            )}

            {orderItemToUpdate && orderItemToUpdate._id === orderitem._id ? (
              <div className="flex items-center ml-2 space-x-1">
                <IconButton
                  onClick={() => {
                    setOrderItemToUpdate(null);
                  }}
                >
                  <RxCross2 />
                </IconButton>

                <IconButton>
                  <MdCheck
                    className="text-green-500"
                    onClick={async () => {
                      try {
                        const data = await updateTrigger({
                          itemId: orderItemToUpdate._id as string,
                          quantity: orderItemToUpdate.quantity,
                          unit: orderItemToUpdate.unit,
                        });
                        if (data) {
                          toast.success("Successfully updated.");
                          setOrderInfo({
                            ...orderInfo,
                            orderItems: data.orderItems,
                          });
                          setOrderItemToUpdate(null);
                        }
                      } catch (error) {
                        toast.error("Something went wrong.");
                      }
                    }}
                  />
                </IconButton>
              </div>
            ) : (
              <div className="flex items-center ml-2 space-x-1">
                {edit ? (
                  <EditButton
                    handleClick={() => {
                      setOrderItemToUpdate(orderitem);
                    }}
                  />
                ) : (
                  <></>
                )}
                <TrashButton
                  handleClick={() => {
                    if (edit) {
                      setOrderItemIdToDelete(orderitem._id as string);
                      setOpenDeleteDialog(true);
                    } else {
                      setOrderInfo({
                        ...orderInfo,
                        orderItems: orderInfo.orderItems.filter(
                          (itemdata: OrderItemType) =>
                            (itemdata.itemName as ItemNameType)._id !==
                            (orderitem.itemName as ItemNameType)._id
                        ),
                      });
                    }
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
      <DeleteDialog
        open={openDeleteDialog}
        handleClose={() => {
          setOrderItemIdToDelete("");
          setOpenDeleteDialog(false);
        }}
        text={"this order item from order list"}
        handleDelete={async () => {
          try {
            setDeleteLoading(true);
            const data = await trigger();
            if (data) {
              setDeleteLoading(false);
              setOrderInfo({ ...orderInfo, orderItems: data.orderItems });
              setOpenDeleteDialog(false);
            }
          } catch (error) {
            setDeleteLoading(false);
            toast.error("Something went wrong.");
          }
        }}
        loading={deleteLoading}
      />
    </div>
  );
};

export default OrderItemsDisplay;
