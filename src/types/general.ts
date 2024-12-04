import { SubscriptionPlanDataType } from "@/app/lib/types";
import React from "react";

export interface VerifyEmailProps {
    message: string;
    email_subject?: string;
    buttonText?: string | React.ReactNode
}

//pagination types
export interface PaginationButtonProps {
    getPageNumber: (index: number) => void;
    handleNextButton: () => void;
    pageNumber: number;
    handlePrevButton: () => void;
    pages: number[];
    result: number;
    totalResult: number;
}

//Show active filter tag
export interface ShowActiveTagProps {
    showActiveTag: (index: number) => void;
}


//Patient list data types
export interface Patient {
    id: number;
    name: string;
    patientId: string
    subDate: string;
    expireDate: string;
    status: string
}
//Patientlist body data props types
export interface TableBodyProps {
    subscriptionData: Patient[]
    startIndex?: number;
    endIndex?: number;
}
//Mobile patientlist fileds types
export interface PatientField {
    label: string;
    key: keyof Patient;
}
//Doctor subscription plan data types
export type SubscriptionPlan = {
    id: number;
    name: string;
    price: number;
    plan_type: "Basic" | "Standard" | "Premium"
    status: "active" | "inactive";
    discountPercentage: number;
    features?: string[];
    duration?: string;
    maxPatients?: number;

};
//Mobile view subscription plan data types 

export type SubscriptionPlanMobileTypes = {
    label: string;
    key: keyof SubscriptionPlanDataType
}

export type PatientReviewsTypes = {
    name: string;
    photo: string;
    rating: number;
    details: string;
    timeStamp: string | number
}

// Types
export type Message = {
    id: string;
    content: string;
    senderId: string;
    timestamp: Date;
    isRead: boolean;
};

export type User = {
    id: string;
    name: string;
    avatar: string;
    role: "doctor";
    status: "online" | "offline";
    specialty: string;
    lastSeen?: Date;
};

export type Chat = {
    id: string;
    participants: User[];
    lastMessage?: Message;
    unreadCount: number;
};






