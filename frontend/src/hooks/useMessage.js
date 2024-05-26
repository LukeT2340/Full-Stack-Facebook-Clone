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

    // The room id is the concatenation of two users' sorted ids
    const generateRoomId = (userId1, userId2) => {
        // Concatenate user IDs and sort them alphabetically
        const sortedIds = [userId1, userId2].sort();
        // Join the sorted IDs to create the room ID
        const roomId = sortedIds.join('_');
        return roomId;
      };      

    // Sets up connection between client and room
    useEffect(() => {
        socket.current = io(process.env.REACT_APP_BACKEND_URL, {
            withCredentials: true,
            transports: ['websocket'], 
            query: { roomId: generateRoomId(user.user_id, recipientId) } 
        });
    
        socket.current.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    
        return () => {
            socket.current.disconnect();
        };

    }, [recipientId, user.user_id]);
    
    // Fetches messages
    useEffect(() => {
        const fetchMessages = async () => {
            if (!recipientId) return;
            setIsFetching(true);

            try {
                const token = user.token;
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/message/get?recipientId=${recipientId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
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

    // Send message to IO socket end-point
    const sendMessage = (text) => {
        setIsSending(true);
        try {
            const messageData = {
                senderId: user.user_id,
                recipientId,
                text,
            };
            socket.current.emit('message', messageData);
        } catch (error) {
            setErrorSending(error.message);
        } finally {
            setIsSending(false);
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
    };
};
