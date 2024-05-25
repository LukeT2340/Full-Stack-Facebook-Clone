import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

export const useMessage = (recipientId) => {
    const [messages, setMessages] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [errorSending, setErrorSending] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [errorFetching, setErrorFetching] = useState(null);
    const { user } = useAuthContext();


    // Fetch messages when useMessage is initialized
    useEffect(() => {
        const fetchMessages = async () => {
            if (!recipientId) return; // Prevent fetching if recipientId is not set
            setIsFetching(true);
            try {
                const token = user.token;
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/message/get?recipientId=${recipientId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch messages');
                }
                const data = await response.json();
                setMessages(data.messages); 
            } catch (error) {
                setErrorFetching(error.message);
            } finally {
                setIsFetching(false);
            }
        };

        fetchMessages();
    }, [recipientId, user.token]);

    const sendMessage = async (text) => {
        setIsSending(true);
        try {
            const token = user.token;
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/message/send`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ recipientId, text })
            });
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
            const data = await response.json();
            return data.message;
        } catch (error) {
            setErrorSending(error.message);
        } finally {
            setIsSending(false);
        }
    };

    return { messages, isSending, errorSending, sendMessage, setMessages, isFetching, errorFetching };
};
