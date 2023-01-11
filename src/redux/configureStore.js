import { configureStore } from "@reduxjs/toolkit";

import personasReducer from "./slices/personasSlice";

export const store = configureStore({
  reducer: {
    personas : personasReducer,
  }
})

