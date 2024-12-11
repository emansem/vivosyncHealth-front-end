
//Collect, validate and trim all doctor onboarding multiple step form 
import { STEP_ONE_FORM_FIELDS, STEP_TWO_FORM_FIELDS } from "@/app/lib/constant";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import { DoctorOnboardingForm, nextStep, prevStep, setError, updateFormData } from "@/app/lib/redux/features/form/multipleStepFormSlice";
import { ChangeEvent } from "react";
import { useUpdateData } from "../serviceHook";
import toast from "react-hot-toast";


interface ValidateFieldType {
    name: string
    placeholder: string,
}
//A function to collect the doctor onboading inputs value
export const useOnchangeDoctorOnboarding = () => {
    const dispatch = useAppDispatch();

    const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (value.trim()) {
            dispatch(
                setError({
                    field: name as keyof DoctorOnboardingForm,
                    errorMessage: ""
                })
            );
        }
        dispatch(
            updateFormData({
                field: name as keyof DoctorOnboardingForm,
                value: value.trim()
            })
        );
    };

    return { handleFormChange }
}

//A function to validate all the doctor onboarding inputs value
export const useMultipleFormValidation = () => {
    const { currentStep, formData } = useAppSelector((state) => state.doctorStep);
    const dispatch = useAppDispatch();

    const validateField = (field: ValidateFieldType): boolean => {
        if (!formData[field.name as keyof DoctorOnboardingForm].trim()) {
            dispatch(setError({
                field: field.name as keyof DoctorOnboardingForm,
                errorMessage: `${field.placeholder} is required`
            }));
            return false;
        }
        return true;
    }

    const validateStepOneForm = (): boolean => {
        for (const field of STEP_ONE_FORM_FIELDS) {
            if (!validateField(field)) {
                return false;
            }
        }
        return true; // All fields are valid
    };
    const validateStepTwoForm = (): boolean => {
        for (const field of STEP_TWO_FORM_FIELDS) {
            if (!validateField(field)) {
                return false;
            }

        }
        return true;
    }

    const handleNext = () => {
        switch (currentStep) {
            case 1:
                const isFormOneValid = validateStepOneForm();
                if (!isFormOneValid) return;
                dispatch(nextStep());
            case 2:
                const isValid = validateStepTwoForm();
                if (!isValid) return;
                dispatch(nextStep());

            default:
                break;
        }
    };
    const handlePrevStep = () => {
        dispatch(prevStep());
    };

    return { handleNext, currentStep, handlePrevStep };
};

//Send the data to the saver
export const useUpdatedOnboardingData = (apiEndpoint: string) => {
    const { mutate, isPending } = useUpdateData<DoctorOnboardingForm, DoctorOnboardingForm>(apiEndpoint)
    const { formData } = useAppSelector((state) => state.doctorStep);

    const handleSubmitDoctorOnboardData = () => {
        if (formData) {
            const { profile_photo, about, languages } = formData;
            if (profile_photo === "" || about === "" || languages === "") {
                toast.error("Please fill all the fields");
                return;
            }
            mutate(formData, {
                onSuccess: () => {
                    window.location.href = `http://localhost:3000/onboard/success`;
                }
            })
        }



    };
    return { handleSubmitDoctorOnboardData, isPending }
}
