import { FormFields } from "@/app/lib/types";

export const LOGIN_INPUTS_FIELD: FormFields[] = [
    {
        name: "email",
        type: "email",
        label: "Email ",
        placeHolder: "Enter email address"
    },
    {
        name: "password",
        type: "password",
        label: "Password",
        placeHolder: "Enter password"
    },
]