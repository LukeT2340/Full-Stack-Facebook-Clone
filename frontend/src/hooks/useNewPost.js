import { useState } from 'react'
import imageCompression from 'browser-image-compression'; 

// This hook submits new status
export const useNewPost = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const userJson = localStorage.getItem('user');
    const user = JSON.parse(userJson);
    const token = user.token;

    const options = {
        maxSizeMB: 10,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    };

    const post = async (file, text, visibility, recipientUserId) => {
        setIsLoading(true);
        setIsSubmitted(false);
        try {
            const formData = new FormData();

            // If the status includes an image
            if (file) {
                const compressedFile = await imageCompression(file, options);
                formData.append('image', compressedFile); 
            }

            // If the status is directed at someone (i.e. posting on someones wall)
            if (recipientUserId) {
                formData.append('recipientUserId', recipientUserId)
            }

            formData.append('text', text.trim());
            formData.append('visibility', visibility.toLowerCase());

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/status/post`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message);
                return;
            }

            setIsSubmitted(true);
        } catch (error) {
            console.log(error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { post, isSubmitted, isLoading, error };
};
