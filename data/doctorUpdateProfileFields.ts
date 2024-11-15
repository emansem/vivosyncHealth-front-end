import { DoctorUpdateProfileFields } from "@/app/lib/types";

export const DOCTOR_UPDATE_PROFILE_FIELDS: DoctorUpdateProfileFields[] = [
    {
        name: "full_name",
        placeHolder: "Dr. John Doe",
        label: "Full Name",
        type: "text"
    },
    {
        name: "specialization",
        placeHolder: "Cardiologist",
        type: "text",
        label: "Specialization"
    },
    {
        name: "email",
        placeHolder: "Email address",
        type: "text",
        label: "Email"
    },
    {
        name: "phone_number",
        placeHolder: "Phone number",
        type: "tel",
        label: "Phone Number"
    },
    {
        name: "medical_license",
        placeHolder: "ML1278",
        type: "text",
        label: "Medical License Number"
    },
    {
        name: "languages",
        placeHolder: "English, Spanish",
        type: "text",
        label: "Languages"
    },
    {
        name: "years_of_expirence",
        placeHolder: "10 years",
        type: "text",
        label: "Years Of Expirience"
    },
    {
        name: "country",
        placeHolder: "Cameroon",
        type: "text",
        label: "Cameroon"
    },
    {
        name: "state",
        placeHolder: "Centre",
        type: "text",
        label: "State"
    },
    {
        name: "city",
        placeHolder: "Yaounde",
        type: "text",
        label: "City"
    },
    {
        name: "zip_code",
        placeHolder: "00237",
        type: "text",
        label: "Zip Code"
    },
    {
        name: "hospital_name",
        placeHolder: "Central Hospital",
        type: "text",
        label: "Hospital/Clinic Name"
    },
    {
        name: "working_days",
        placeHolder: "Monday,Friday,Wednesday",
        type: "text",
        label: "Working Days"
    },
    {
        name: "about",
        placeHolder: "Write something about you interesting",
        type: "textArea",
        label: "Write About you"
    },

]

