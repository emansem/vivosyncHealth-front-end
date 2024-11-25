import { configureStore } from "@reduxjs/toolkit";
import doctorSetUpReducer from "../redux/features/form/multipleStepFormSlice"
import subscriptionPlanReducer from "../redux/features/subscriptionPlanSlice/subscriptionPlanSlice"
export const store = configureStore({
  reducer: {
    doctorStep: doctorSetUpReducer,
    subscriptionPlan: subscriptionPlanReducer,
  },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
