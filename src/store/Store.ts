"use client";

import ProductReducer from "./Slice/ProductSlice/ProductSlice";
import CategorySlice from "./Slice/CategorySlice/CategorySlice";
import UserSlice from "./Slice/UserSlice/UserSlice";
import OrdersSlice from "./Slice/OrdersSlice/OrdersSlice";
import AppConfigSlice from "./Slice/AppConfig/AppConfig";
import CommonStateSlice from "./Slice/CommonStateSlice/CommonStateSlice";
import { configureStore } from "@reduxjs/toolkit";
import { logger } from 'redux-logger';



const store = configureStore({
  reducer: {
    product: ProductReducer,
    category: CategorySlice,
    user: UserSlice,
    orders: OrdersSlice,
    appconfig: AppConfigSlice,
    commonstate: CommonStateSlice,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
