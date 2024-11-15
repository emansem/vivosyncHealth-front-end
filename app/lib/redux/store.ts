import { configureStore } from "@reduxjs/toolkit";
import doctorSetUpReducer from "../redux/features/form/multipleStepFormSlice"

export const store = configureStore({
  reducer: {
    doctorStep: doctorSetUpReducer,

  },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
