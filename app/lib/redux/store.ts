import { configureStore } from "@reduxjs/toolkit";
import doctorSetUpReducer from "../redux/features/form/multipleStepFormSlice"
import withdrawalAccountReducer from "./features/form/withdrawalAccountSlice"

export const store = configureStore({
  reducer: {
    doctorStep: doctorSetUpReducer,
    withdrawalAccount: withdrawalAccountReducer
  },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
