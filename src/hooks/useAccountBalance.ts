import { ChangeEvent, useState } from "react"
import toast from "react-hot-toast";
import { useApiPost } from "./serviceHook";
import { PATIENT_API_ENDPOINTS } from "@/app/lib/constant";

const INITIAL_STATE = {

    phone_number: "",
    amount: ""
}
export const useAddAccountBalance = (payment_method: string) => {
    const [formData, setFormData] = useState(INITIAL_STATE);

    const { mutate, isPending } = useApiPost(PATIENT_API_ENDPOINTS.PAYMENT.addAccountBalance, 'user')

    const handelOnChangeFormData = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        const intValue = value.replace(/[^0-9]/g, "");

        setFormData((prev) => ({ ...prev, [name]: intValue }))


    }
    const paymentDetails = {
        phone_number: Number(formData.phone_number),
        payment_method,
        amount: Number(formData.amount),
    }

    const handleAddBalance = () => {
        if (paymentDetails.phone_number.toLocaleString().length < 9) {
            return toast.error("Payment number must be 9 digit")
        } else if (paymentDetails.amount.toLocaleString().length <= 0) {
            return toast.error("Amount must be greater than 0");
        } else if (!paymentDetails.payment_method) {
            return toast.error("Please select a payment method");

        }
        mutate(paymentDetails)

    }

    return { formData, isPending, handleAddBalance, handelOnChangeFormData }
}