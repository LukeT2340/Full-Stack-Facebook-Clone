import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext';

// Fetch contacts. To start with, I won't put the ability to add friends in. So I'll just load other people on the app
export const useContacts = (limit) => {
    const [contacts, setContacts] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuthContext();

    useEffect(()=>{
        const fetchContacts = async () => {
            setIsLoading(true)
            try {
                
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/getMany?limit=${limit}&user_id=${user.user_id}`, {
                    method: 'GET'
                }
                )

                // Unsuccessful
                if (!response.ok) {
                    const error = await response.json();
                    throw error
                }

                // Successful
                const json = await response.json()
                setContacts(json)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }   

        fetchContacts()
    }, [])

    return { contacts, isLoading }
}