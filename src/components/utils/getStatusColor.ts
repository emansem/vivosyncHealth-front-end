export const getStatusColor = (status: string) => {
    switch (status) {
        case "active":
            return "bg-secondary_color/10 text-primary_color";
        case "inactive":
            return "bg-red-600/10 text-red-500";

        default:
            break;
    }
};