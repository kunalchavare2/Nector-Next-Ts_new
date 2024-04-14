"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../../lib/models/product";

export type RootState = ReturnType<typeof reportError>;

type initStateType = {
  loading: boolean;
  products: Product[];
  error: null | string | undefined;
};

const initialState: initStateType = {
  loading: false,
  products: [],
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetch", () => {
  return fetch("../../data/product.json").then((res) => {
    return res.json();
  });
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(fetchProducts.pending, (state: initStateType) => {
      state.loading = true;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (
        state: initStateType,
        action: PayloadAction<{ products: Product[] }>
      ) => {
        state.loading = false;
        state.products = action.payload.products;
        state.error = null;
      }
    );
    builder.addCase(
      fetchProducts.rejected,
      (
        state: initStateType,
        action: PayloadAction<void, string, never, Error>
      ) => {
        state.loading = false;
        state.products = [];
        state.error = action.error.message;
      }
    );
  },
});

export default productSlice.reducer;
