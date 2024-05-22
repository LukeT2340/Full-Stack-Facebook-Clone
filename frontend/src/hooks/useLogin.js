import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    
    const login = async(email, password) => {
        setIsLoading(true);
        setError(null);
        
        const userData = {
            email: email.trim(),
            password: password.trim()
        };

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
        });

        // Handle unsuccessful sign up
        if (!response.ok) {
            const errorData = await response.json();
            setIsLoading(false);
            setError(errorData.errorMessage || 'Unknown server error. Please try again later.');
            
        }

        // Handle successful sign up
        if (response.ok) {
            const json = await response.json();
            
            // Save the use to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // Update auth context
            dispatch({type: 'LOGIN', payload: json});
        
            setIsLoading(false);
        }
    }

    return { login, isLoading, error };
};