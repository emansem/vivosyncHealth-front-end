// Formats date to local string
export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
};

// Capitalizes the first letter of a string
export const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};
