import { useState } from "react";

export const useGeneralSettings = () => {
    const [settingsData, setSettingsData] = useState({
        websiteName: "",
        tagline: "",
        metaDescription: "",
        metaKeywords: "",
        patientFee: "",
        doctorCommission: "",
        subscriptionDuration: "monthly",
        status: "active",
        supportEmail: "",
        supportPhone: ""
    });

    const [isPending, setIsPending] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettingsData((prev) => ({
            ...prev,
            [name]: value
        }));
        // Clear any existing messages when user makes changes
        setMessage({ type: "", text: "" });
    };

    const handleUpdateSettings = async () => {
        setIsPending(true);
        try {
            // Validate required fields
            const requiredFields = ["websiteName", "supportEmail", "supportPhone"];
            const missingFields = requiredFields.filter(
                (field) => !settingsData[field]
            );

            if (missingFields.length > 0) {
                throw new Error(
                    `Please fill in all required fields: ${missingFields.join(", ")}`
                );
            }

            // Add your API call here
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setMessage({
                type: "success",
                text: "Settings updated successfully!"
            });
        } catch (error: unknown) {
            if (error) {
                setMessage({
                    type: "error",
                    text: error.message || "Failed to update settings"
                });
            }

        } finally {
            setIsPending(false);
        }
    };

    return { handleInputChange, handleUpdateSettings, settingsData, message, isPending }
}