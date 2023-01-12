import { configureStore } from "@reduxjs/toolkit";

import personasReducer from "./slices/personasSlice";
import personasStatus from "./slices/statusSlice";

export const store = configureStore({
  reducer: {
    personas : personasReducer,
    status : personasStatus
  }
})

