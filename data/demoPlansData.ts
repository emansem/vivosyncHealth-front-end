import { SubscriptionPlan } from "@/src/types/general";

//Doctor demo subscription plans
export const subscriptionPlans: SubscriptionPlan[] = [
    {
        id: 1,
        name: "Basic",
        price: 2000,
        status: "active",
        discountPercentage: 20,
        duration: "Monthly",
        plan_type: 'Basic',
        maxPatients: 50,
        features: [
            "24/7 Customer Support",
            "Up to 50 Patient Records",
            "Basic Appointment Scheduling",
            "Email Notifications",
            "Patient History Access"
        ]
    },
    {
        id: 2,
        name: "Professional",
        plan_type: "Standard",
        price: 4000,
        status: "active",
        discountPercentage: 25,
        duration: "Monthly",
        maxPatients: 100,
        features: [
            "All Basic Features",
            "Up to 100 Patient Records",
            "Advanced Scheduling",
            "SMS Notifications",
            "Video Consultations",
            "Custom Reports",
            "Priority Support"
        ]
    },
    {
        id: 3,
        name: "Premium",
        price: 6000,
        status: "active",
        discountPercentage: 30,
        plan_type: 'Premium',
        duration: "Monthly",
        maxPatients: 200,
        features: [
            "All Professional Features",
            "Unlimited Patient Records",
            "Advanced Analytics",
            "Custom Branding",
            "API Access",
            "Multi-device Support",
            "24/7 Priority Support",
            "Staff Management"
        ]
    },

];
