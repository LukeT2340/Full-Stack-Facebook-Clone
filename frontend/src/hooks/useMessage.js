import { useState, useEffect, useRef } from 'react';
import { useAuthContext } from './useAuthContext';
import io from 'socket.io-client';

export const useMessage = (recipientId) => {
    const [messages, setMessages] = useState([]);
    const [isSending, setIsSending] = useState(false);
    const [errorSending, setErrorSending] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [errorFetching, setErrorFetching] = useState(null);
    const { user } = useAuthContext();
    const socket = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Initialize Socket.io connection
        socket.current = io(process.env.REACT_APP_BACKEND_URL);

        // Listen for incoming messages
        socket.current.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
            scrollToBottom();
        });

        return () => {
            // Clean up the connection on unmount
            socket.current.disconnect();
        };
    }, []);

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
                scrollToBottom();
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

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return { 
        messages, 
        isSending, 
        errorSending, 
        sendMessage, 
        setMessages, 
        isFetching, 
        errorFetching, 
        messagesEndRef 
    };
};

