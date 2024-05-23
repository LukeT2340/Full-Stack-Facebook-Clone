import { useState, useEffect } from 'react';

export const useProfile = (id) => {
    const [ profile, setProfile ] = useState(null)
    const [ isProfileLoading, setIsProfileLoading ] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try {         
                // Try to get user information from API
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/getOne?userId=${id}`, {
                    method: 'GET'
                })

                // Handle unsuccessful fetch
                if (!response.ok) {
                    const error = await response.json();
                    throw error
                }

                // Handle successful fetch
                const json = await response.json()
                setProfile(json)
            }
            catch (error) {
                console.log(error)
            }
            finally {
                setIsProfileLoading(false)
            }
        }

        fetchProfile()
    }, [id])


    return { profile, isProfileLoading }
}