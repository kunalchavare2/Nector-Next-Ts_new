"use client";

import React from "react";
import { currencyConverter } from "../../utils/utility";
import InfoTypes from "../../components/Organisams/InfoTypes/InfoTypes";
import {
  OrdersPageStyle,
  OrderedItem,
  OrderedList,
  OrderContainer,
} from "./OrdersPage.styled";
import Text from "../../components/Atoms/Text/Text";
import { useAppSelector } from "@/hooks/reduxHooks";
import Order from "@/lib/models/Order";

const OrdersPage = () => {
  const orders: Order[] = useAppSelector((state) => state.orders.orders);
  const appConfig = useAppSelector((state) => state.appconfig);

  const formatDate = (date: Date) => {
    const presentDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return presentDate;
  };
  console.log(orders);
  return (
    <OrdersPageStyle>
      {orders.length === 0 && <InfoTypes type="emptyCart" />}

      {orders.map((item) => {
        const date = new Date(item.createdOn);
        return (
          <OrderContainer key={item.id}>
            <OrderedList>
              <OrderedItem>
                <Text label="Order Placed" type="medium" />
                <Text label={formatDate(date)} type="small" />
              </OrderedItem>
              <OrderedItem>
                <Text label={"TotalPrice"} type="medium" />
                <Text
                  label={currencyConverter(
                    item["finalAmount"],
                    appConfig.currentCurrency
                  )}
                  tcolor="#53B175"
                  type="small"
                />
              </OrderedItem>

              <OrderedItem>
                <Text label="Ship To" type="medium" />
                <Text label="Ram" type="small" />
              </OrderedItem>
            </OrderedList>
            <OrderedItem>
              <Text label="Order ID" type="medium" />
              <Text label={item.id} type="small" />
            </OrderedItem>
          </OrderContainer>
        );
      })}
    </OrdersPageStyle>
  );
};

export default OrdersPage;
