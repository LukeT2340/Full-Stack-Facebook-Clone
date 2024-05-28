import { useState, useEffect } from 'react'

// Search for users
export const useSearch = (text) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const search = async () => {
            if (text.trim() === "") {
                setUsers([])
                return
            }
            setLoading(true)
            setError('')
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/search?text=${text}`, {
                    method: 'GET'
                })
    
                // Handle unsuccessful response
                if (!response.ok) {
                    throw error
                }
                
                // Handle successful response
                const json = await response.json()
                setUsers(json)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        search()
    }, [text])

    return {users, loading, error}
}