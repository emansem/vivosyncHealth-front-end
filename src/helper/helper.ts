// Formats date to local string
export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
};

// Capitalizes the first letter of a string
export const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
    }).format(date);
};

export const formatDateIntl = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    }).format(date);
};

