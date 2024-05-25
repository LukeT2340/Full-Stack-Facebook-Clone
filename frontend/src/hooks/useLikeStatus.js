import { useState, useEffect } from 'react';

// This hook submits a like action for a status
export const useLikeStatus = (statusId) => {
    const [isLiked, setIsLiked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
  
    // Check whether user has liked status and set the initial value of isLiked
    useEffect(() => {
      const checkIfLiked = async () => {
        const userJson = localStorage.getItem('user')
        const user = JSON.parse(userJson)
        const token = user.token
  
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/status/${statusId}/isLiked`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          })
  
          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || 'Failed to fetch like status')
          }
  
          const { liked } = await response.json()
          console.log(liked)
          setIsLiked(liked)
        } catch (error) {
          console.error(error)
        } finally {
          setIsLoading(false)
        }
      };
  
      checkIfLiked();
    }, [])

    // Like status
  const likeStatus = async () => {
    setIsLoading(true)

    const userJson = localStorage.getItem('user')
    const user = JSON.parse(userJson)
    const token = user.token

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/status/${statusId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {   
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to like status')
      }

      setIsLiked(true)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  };

  // Unlike status
  const unlikeStatus = async () => {
    setIsLoading(true)

    const userJson = localStorage.getItem('user')
    const user = JSON.parse(userJson)
    const token = user.token

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/status/${statusId}/unlike`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {   
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to unlike status')
      }

      setIsLiked(false)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  };

  return { unlikeStatus, likeStatus, isLiked, isLoading };
};
