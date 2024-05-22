import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    
    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        
        const userData = {
            email: email.trim(),
            password: password.trim()
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            // Handle unsuccessful login
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Unknown server error. Please try again later.');
            }

            // Handle successful login
            const json = await response.json();

            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // Update auth context
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    return { login, isLoading, error };
};
