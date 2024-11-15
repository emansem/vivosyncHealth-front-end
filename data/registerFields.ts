import { FormFields } from "@/app/lib/types";

export const REGISTER_FORM_FIELDS: FormFields[] = [
    {
        name: "name",
        type: "text",
        placeHolder: "Enter your full name",
        label: "Full Name"
    },
    {
        name: "phoneNumber",
        type: "tel",
        placeHolder: "Enter phone number",
        label: "Phone Number"
    },
    {
        name: "email",
        type: "email",
        placeHolder: "Enter email address",
        label: "Email",

    },
    {
        name: "password",
        type: "password",
        placeHolder: "Enter password",
        label: "Password",

    },
    {
        name: "user_type",
        type: "select",
        placeHolder: "Select User Type",
        label: "Select User Type",

    },
]

export const UserType = [
    {
        label: "Select user type",
        value: ""
    },
    {
        label: "Doctor",
        value: "doctor"
    },
    {
        label: "Patient",
        value: "patient"
    }
];

