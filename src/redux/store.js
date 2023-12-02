import { configureStore } from "@reduxjs/toolkit";
import dashboardSlice from "./dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
  },
});
