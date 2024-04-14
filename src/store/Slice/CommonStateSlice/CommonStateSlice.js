"use client"


import { createSlice } from "@reduxjs/toolkit";
import { current } from "immer";

const initialState = {
  filter: true,
};

const CommonStateSlice = createSlice({
  name: "commonstate",
  initialState: initialState,
  reducers: {
    showFilter: (state, action) => {
      state.filter = !current(state).filter;
    },
  },
});

export default CommonStateSlice.reducer;
export const { showFilter } = CommonStateSlice.actions;
