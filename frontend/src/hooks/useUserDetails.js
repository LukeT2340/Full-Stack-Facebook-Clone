import { useState, useEffect } from 'react'
import { useAuthContext } from './useAuthContext'
import imageCompression from 'browser-image-compression'

// Edit profile details such as cover photo, bio, date of birth, etc
export const useUserDetails = () => {
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState('')
    const { user } = useAuthContext()
    const token = user.token

    // Edit cover photo
    const updateCoverPhoto = async (file) => {
        setLoading(true)
        setError('')
        try {
            // Compress the image
            const options = {
                maxSizeMB: 50, 
                maxWidthOrHeight: 1920,
                useWebWorker: true 
            };
            const compressedFile = await imageCompression(file, options);

            const formData = new FormData()
            formData.append('coverPhoto', compressedFile)

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/update/coverPhoto`,{
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })

            // Handle bad response
            if (!response.ok) {
                const errorData = await response.json()
                throw errorData
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    }


    return { updateCoverPhoto, loading, error }
}
