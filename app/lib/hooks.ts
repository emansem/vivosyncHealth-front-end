import { useState } from "react"
import { TOTAL_FORM_STEPS } from "./constant";
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../lib/redux/store'

export const useMultipleStepForm = () => {
    const [currentStep, setStep] = useState(1);
    const progressBarWidth = (currentStep - 1) / (TOTAL_FORM_STEPS - 1) * 100


    const handleContinueBtn = () => {

        if (currentStep < TOTAL_FORM_STEPS) {
            setStep(prev => prev + 1)
            console.log(currentStep);
        }
    }
    const handBackButton = () => {
        if (currentStep > 1) {
            setStep(prev => prev - 1);

        }
    }
    return { currentStep, progressBarWidth, handBackButton, handleContinueBtn };

}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
