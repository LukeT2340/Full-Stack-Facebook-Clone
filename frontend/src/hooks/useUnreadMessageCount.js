import { useAuthContext } from "./useAuthContext"
import { useState, useEffect } from "react"

// Fetch the number of unread messages
export const useUnreadMessageCount = (recipientId) => {
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState("")
    const [unreadCount, setUnreadCount] = useState(0)
    const { user } =  useAuthContext()
    const token = user.token

    useEffect(() => {
         const getUnreadMessages = async () => {
            if (!recipientId){
                return
            }
            setLoading(true)
            setError("")
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/message/fetchUnreadCount?otherUserId=${recipientId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            
                // Check if the response was successful (status 200-299)
                if (!response.ok) {
                    const errorMessage = `Failed to fetch unread count. Status: ${response.status}, ${response.statusText}`;
                    throw new Error(errorMessage);
                }
            
                // Parse the response body as JSON
                const data = await response.json();
                // Set the unread count using the data from the response
                setUnreadCount(data.count);
            } catch (error) {
                console.error('Error fetching unread count:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
            
        }
        getUnreadMessages()
    }, [recipientId])

    return { loading, error, unreadCount, setUnreadCount }
}