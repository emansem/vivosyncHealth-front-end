interface FormInputsTypes {
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    name: string,

}

export const formValidation = {
    email: {
        required: "Email is required",
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
        }
    },
    password: {
        required: "Password is required",
        minLength: {
            value: 6,
            message: "Password must be at least 6 characters"
        },

    },
    name: {
        required: "Name is required"
    },

    phoneNumber: {
        required: "Phone number is required",
        minLength: {
            value: 6,
            message: "Password must be at least 6 characters"
        },
    },
    checkBox: {
        required: "Please accept the terms and condition to continue"
    }

}