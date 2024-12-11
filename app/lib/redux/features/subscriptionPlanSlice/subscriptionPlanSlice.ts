import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubscriptionContextProps {
    open: boolean;
    planId: number
}
const defaultState: SubscriptionContextProps = {
    open: false,
    planId: 0

};

const subscriptionPlanSlice = createSlice({
    name: "subscriptionPlan",
    initialState: defaultState,
    reducers: {
        openModal: (state) => {
            state.open = true
        },
        closeModal: (state) => {
            state.open = false
        },
        getPlanId: (state, action: PayloadAction<number>) => {

            state.planId = action.payload
            console.log("Plan ID in reducer:", action.payload);
        },
    }
})

export const { openModal, getPlanId, closeModal } = subscriptionPlanSlice.actions
export default subscriptionPlanSlice.reducer;