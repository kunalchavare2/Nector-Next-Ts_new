"use client"

import { createSlice, current } from "@reduxjs/toolkit";
import { LocalStorageKeys } from "@/utils/constant/global-const";
import { getFromLocalStorage, saveToLocalStorage, } from "@/utils/utility";
import Order from "@/lib/models/Order";

const emptyOrders : {orders:Order[]} = {orders:[]};

const savedLocalData = getFromLocalStorage(LocalStorageKeys.orders);
const initialState = savedLocalData
  ? savedLocalData
  : emptyOrders;

const OrdersSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {
    // To add new cart item into existing cart items
    addToOrders: (state, action) => {
      state.orders.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.startsWith("orders/"),
      (state) => {
        saveToLocalStorage(current(state), LocalStorageKeys.orders);
      }
    );
  },
});

export default OrdersSlice.reducer;
export const { addToOrders } = OrdersSlice.actions;
