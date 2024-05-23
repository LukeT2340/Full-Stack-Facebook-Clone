import { useState, useEffect } from 'react';
import { useAuthContext } from './useAuthContext';

export const useFetchStatuses = (limit, page) => {
    const [statuses, setStatuses] = useState([]);
    const [areStatusesLoading, setAreStatusesLoading] = useState(true);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const token = user.token;

                // Try to fetch posts from API
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/status/getMany?limit=${limit}?page=${page}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                });

                // Handle unsuccessful fetch
                if (!response.ok) {
                    const error = await response.json();
                    throw error;
                }

                // Handle successful fetch
                const json = await response.json();
                setStatuses(json.statuses);
            } catch (error) {
                console.log(error);
            } finally {
                setAreStatusesLoading(false);
            }
        };

        fetchStatuses();
    }, [user.token]); // Ensure useEffect runs when user token changes

    return { statuses, areStatusesLoading };
};
