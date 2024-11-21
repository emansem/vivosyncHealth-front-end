import { useState, ChangeEvent } from "react"
import toast from "react-hot-toast"
import { useUpdateData } from "../serviceHook"

interface ChangePassword {
    password: string,
    confirm_password: string
}
export const useResetPassword = (token: string) => {
    const passwordMinLength = 6
    const [passwordValues, setPasswordValues] = useState<ChangePassword>({
        password: "",
        confirm_password: ''
    })
    const { mutate, isPending } = useUpdateData<ChangePassword, ChangePassword>(`/auth//reset-password/?token=${token}`)


    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setPasswordValues(prev =>
            ({ ...prev, [name]: value })
        )

    }
    console.log(passwordValues)
    const handleSubmit = () => {
        console.log(passwordValues)
        if (passwordValues.password !== passwordValues.confirm_password) {
            return toast.error("Password donot match");
        } else if (!passwordValues.password || !passwordValues.confirm_password) {
            return toast.error("Please fill all the fields");
        } else if (passwordValues.password.length < passwordMinLength || passwordValues.confirm_password.length < passwordMinLength) {
            return toast.error("Password must be more than 6 characters");
        }
        // if (!token) return
        mutate(passwordValues, {
            onSuccess: () => {
                setTimeout(() => {
                    window.location.href = "http://localhost:3000/auth/login"
                }, 500);
            }
        })

    }

    return { handleOnChange, handleSubmit, isPending }
}
