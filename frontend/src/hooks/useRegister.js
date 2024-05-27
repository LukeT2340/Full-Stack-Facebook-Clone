import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import imageCompression from 'browser-image-compression'; 

// Registration hook
export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 
    const { dispatch } = useAuthContext();
    
    const register = async (file, firstName, lastName, email, password) => {
        setIsLoading(true);
        setError(null);
        
        const options = {
            maxSizeMB: 10, 
            maxWidthOrHeight: 1920,
            useWebWorker: true 
        };

        try {
            const compressedFile = await imageCompression(file, options);   // Compress the image

            const formData = new FormData();
            formData.append('profilePicture', compressedFile); 
            formData.append('firstName', firstName.trim());
            formData.append('lastName', lastName.trim());
            formData.append('email', email.trim());
            formData.append('password', password.trim());

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/signup`, {
                method: 'POST',
                body: formData 
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw errorData;
            }

            const json = await response.json();

            localStorage.setItem('user', JSON.stringify(json));
            dispatch({ type: 'LOGIN', payload: json });
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false); 
        }
    };

    return { register, isLoading, error };
};
