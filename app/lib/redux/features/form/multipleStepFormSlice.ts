import { TOTAL_FORM_STEPS } from "@/app/lib/constant";
import { FormErrors } from "@/app/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface DoctorOnboardingForm {
    // Personal & Professional Info
    about: string;
    medical_license: string;
    profile_photo: string;
    years_of_experience: string;
    language: string;

    // Location/Practice Info
    hospital_name: string;
    hospital_address: string;
    country: string;
    state: string;
    city: string;
    zip_code: string;
    working_days: string;
}


interface DoctorOnboardingState {
    currentStep: number;
    formData: DoctorOnboardingForm;
    isSubmitting?: boolean;
    errors?: FormErrors;
}


const INITIAL_STATE: DoctorOnboardingState = {
    currentStep: 1,
    formData: {
        about: '',
        medical_license: '',
        profile_photo: '',
        hospital_address: '',
        years_of_experience: '',
        hospital_name: '',
        language: '',
        country: '',
        zip_code: '',
        city: '',
        state: '',
        working_days: ''
    },
    isSubmitting: false,
    errors: {}
};

const doctorSetupSlice = createSlice({
    name: "doctorOnboarding",
    initialState: INITIAL_STATE,
    reducers: {
        //the next step to move to the next form stage
        nextStep: (state) => {
            if (state.currentStep < TOTAL_FORM_STEPS) state.currentStep += 1

        },
        //Prev step to go back behind
        prevStep: (state) => {
            if (state.currentStep > 1) state.currentStep -= 1

        },
        updateFormData: (state, action: PayloadAction<{ field: keyof DoctorOnboardingForm, value: string }>) => {
            const { field, value } = action.payload;
            state.formData[field] = value;
        },
        setError: (state, action: PayloadAction<{ field: keyof DoctorOnboardingForm, errorMessage: string }>) => {
            const { field, errorMessage } = action.payload;
            if (state.errors) {
                state.errors[field] = errorMessage
            }

        }
    }
})
export const { nextStep, prevStep, updateFormData, setError } = doctorSetupSlice.actions;
export default doctorSetupSlice.reducer;

