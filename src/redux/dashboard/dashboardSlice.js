import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDropable: false,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateDropable: (state, action) => {
      state.isDropable = action.payload;
    },
  },
});

export const { updateDropable } = dashboardSlice.actions;

export default dashboardSlice.reducer;
