import { useState, ChangeEvent, useEffect } from "react"
import toast from "react-hot-toast"
import { useGetUser, useUpdateData } from "../serviceHook"
import { decordValue } from "@/src/helper/decordAndEncord"

interface ChangePassword {
    password: string,
    confirm_password: string
}
export const useResetPassword = (token: string) => {
    const [passwordToken, setPasswordToken] = useState<string | null>("")
    const passwordMinLength = 6
    const [passwordValues, setPasswordValues] = useState<ChangePassword>({
        password: "",
        confirm_password: ''
    })
    const [jwt, setJwt] = useState<string | null>(null);


    const { mutate, isPending } = useUpdateData<ChangePassword, ChangePassword>(`/auth/reset-password/`)
    // Move localStorage to useEffect to ensure client-side execution
    useEffect(() => {
        const storedJwt = localStorage.getItem("jwt");
        setJwt(storedJwt);

    }, [jwt]);

    useEffect(() => {
        const password_rest_token = localStorage.getItem('remember_token') || ""
        if (!password_rest_token) {
            window.location.href = '/forgot-password'
            return
        }

    }, [])

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setPasswordValues(prev =>
            ({ ...prev, [name]: value })
        )

    }

    const handleSubmit = () => {

        if (passwordValues.password !== passwordValues.confirm_password) {
            return toast.error("Password donot match");
        } else if (!passwordValues.password || !passwordValues.confirm_password) {
            return toast.error("Please fill all the fields");
        } else if (passwordValues.password.length < passwordMinLength || passwordValues.confirm_password.length < passwordMinLength) {
            return toast.error("Password must be more than 6 characters");
        }
        const password_rest_token = localStorage.getItem('remember_token') || ""
        console.log(password_rest_token)
        if (password_rest_token) {

            const tokenCode = decordValue(password_rest_token)
            setPasswordToken(tokenCode)
        }
        console.log(passwordToken)

        // if (!token) return
        const resetPasswordValues = {
            token: passwordToken,
            ...passwordValues
        }
        mutate(resetPasswordValues, {
            onSuccess: (data) => {
                const { jwt } = data.data
                setJwt(jwt as string)
                localStorage.removeItem('remember_token')
                localStorage.removeItem('email_verify_failed');
                setTimeout(() => {
                    window.location.href = "/login"
                }, 500);
            }
        })

    }

    return { handleOnChange, handleSubmit, isPending }
}
