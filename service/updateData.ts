interface UpdateDataProps<T> {
    data: T
}

export const updateData = async<T>(data: UpdateDataProps<T>) => {
    try {

        const response = await fetch('http://localhost:5740/api/auth/verify-email', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data.data)
        });
        const result = await response.json();
        console.log(result);
        return result;
    } catch (error) {
        console.log("Error updating data", error);
    }
}