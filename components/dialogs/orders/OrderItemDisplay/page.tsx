import TrashButton from "@/components/buttons/TrashButton/page";
import { Typography } from "@mui/material";
import React from "react";

interface Props {
  orderInfo: OrderType;
  setOrderInfo: (data: OrderType) => void;
}

const OrderItemsDisplay = ({ orderInfo, setOrderInfo }: Props) => {
  return (
    <div>
      {orderInfo?.orderItems?.map((orderitem: OrderItemType, i) => {
        return (
          <div className="flex items-center mb-2">
            <div
              key={i}
              className="flex items-center px-2 md:w-[300px] h-[50px] border-[1px] rounded border-[#9CA3AF] space-x-2"
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
            <TrashButton
              handleClick={() => {
                setOrderInfo({
                  ...orderInfo,
                  orderItems: orderInfo.orderItems.filter(
                    (itemdata: OrderItemType) =>
                      (itemdata.itemName as ItemNameType)._id !==
                      (orderitem.itemName as ItemNameType)._id
                  ),
                });
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default OrderItemsDisplay;
