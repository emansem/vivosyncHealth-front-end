export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsign_preset');

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/dtlfa7on3/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        );
        const data = await response.json();
        console.log(data)
        return data.secure_url;
    } catch (error) {
        console.error('Upload failed:', error);
        throw error;
    }
};