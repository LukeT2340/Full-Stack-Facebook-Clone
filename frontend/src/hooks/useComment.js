import { useState } from "react";

export const useComment = (statusId) => {
    const [isLoading, setIsLoading] = useState(false);

    // Publish comment
    const publishComment = async (text) => {
        setIsLoading(true);
        const userJson = localStorage.getItem('user');
        const user = JSON.parse(userJson);
        const token = user.token;

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/status/${statusId}/comment`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json', // Set content type to JSON
                },
                body: JSON.stringify({ text }), // Send text as JSON string
            });

            // Handle unsuccessful comment
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to publish comment');
            }

            // Handle succesful comment
            const json = await response.json();
            return json

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { publishComment, isLoading };
};

